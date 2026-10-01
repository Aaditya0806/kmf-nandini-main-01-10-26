'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { IoSend, IoMic, IoMicOff, IoTrashOutline, IoChevronDown, IoSparkles, IoShieldCheckmarkOutline } from 'react-icons/io5';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import Markdown from './Markdown';
import { createVoiceInput, voiceSupported } from './voice';
import { ASK_TEXT as T, chipsFor } from '@/configtext/askNandini';
import { trackCreditClick } from '@/lib/analytics';

const MAX_CHARS = 1000;
const STORE_KEY = 'kmf_ask_nandini_chat';
const MIN_KEY = 'kmf_ask_nandini_min';
const INTRO_KEY = 'kmf_ask_nandini_intro';
const LOGO = '/brand/kmf-nandini-logo.png';
const FOCUSABLE = 'button:not([disabled]), [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';

const store = {
  get(k, fallback) {
    try {
      const v = sessionStorage.getItem(k);
      return v === null ? fallback : JSON.parse(v);
    } catch (e) {
      return fallback;
    }
  },
  set(k, v) {
    try {
      sessionStorage.setItem(k, JSON.stringify(v));
    } catch (e) {
      // storage blocked: works for this page view only
    }
  },
};
const popupIntent = () => {
  try {
    const v = JSON.parse(localStorage.getItem('kmf_intent_popup') || 'null')?.value;
    return v && v !== 'dismissed' ? v : '';
  } catch (e) {
    return '';
  }
};

let nextId = 1;
const newId = () => `${Date.now()}-${nextId++}`;

// Animations used only by this widget (respect reduced-motion settings).
const STYLES = `
@keyframes kmfChatIn { from { opacity: 0; transform: translateY(16px) scale(.97); } to { opacity: 1; transform: none; } }
@keyframes kmfChatGlow { 0%,100% { box-shadow: 0 20px 60px -15px rgba(7,73,137,.45), 0 0 0 0 rgba(10,111,209,.45); } 50% { box-shadow: 0 20px 60px -15px rgba(7,73,137,.45), 0 0 0 10px rgba(10,111,209,0); } }
@keyframes kmfBlink { 0%,100% { opacity: 1; } 50% { opacity: .25; } }
@keyframes kmfDot { 0%,80%,100% { transform: translateY(0); opacity: .45; } 40% { transform: translateY(-4px); opacity: 1; } }
.kmf-chat-in { animation: kmfChatIn .35s ease-out both; }
.kmf-chat-glow { animation: kmfChatIn .35s ease-out both, kmfChatGlow 1.6s ease-in-out .4s 4; }
.kmf-blink { animation: kmfBlink 1.4s ease-in-out infinite; }
.kmf-dot { animation: kmfDot 1.2s ease-in-out infinite; }
@keyframes kmfIntro { 0% { opacity: 0; transform: scale(.9); } 20% { opacity: 1; transform: scale(1); } 80% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(1.03); } }
@keyframes kmfIntroBg { 0%,100% { opacity: 0; } 20%,80% { opacity: 1; } }
@keyframes kmfSpark { 0% { transform: rotate(-20deg) scale(.7); } 50% { transform: rotate(10deg) scale(1.1); } 100% { transform: rotate(0) scale(1); } }
.kmf-intro { animation: kmfIntro 1s ease-in-out both; }
.kmf-intro-bg { animation: kmfIntroBg 1s ease-in-out both; }
.kmf-spark { animation: kmfSpark .6s ease-out both; }
@media (prefers-reduced-motion: reduce) { .kmf-chat-in, .kmf-chat-glow, .kmf-blink, .kmf-dot, .kmf-ping, .kmf-spark { animation: none !important; } }
`;

function Avatar({ size = 40, ring = true }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ${ring ? 'ring-2 ring-white/60' : 'ring-1 ring-black/5'}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={LOGO} alt="" width={size} height={size} className="h-[78%] w-[78%] object-contain" />
    </span>
  );
}

// One-second "Ask Nandini · Powered by Velozity Global" intro in the middle of
// the screen, shown when the chat first appears in a visit and when opened.
// Decorative only: it never blocks clicks.
const INTRO_MS = 1000;
function Intro() {
  return (
    <div data-kmf-intro className="pointer-events-none fixed inset-0 z-[1100] flex items-center justify-center print:hidden" aria-hidden="true">
      <div className="kmf-intro-bg absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
      <div className="kmf-intro relative flex flex-col items-center rounded-3xl bg-white/95 px-10 py-7 text-center ring-1 ring-black/5" style={{ boxShadow: '0 30px 80px -20px rgba(7,73,137,.5)' }}>
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#0a6fd1] to-[#074989] text-white shadow-lg">
          <IoSparkles size={32} className="kmf-spark" />
        </span>
        <p className="mt-3 text-xl font-bold text-gray-900">{T.introTitle}</p>
        <p className="text-sm text-gray-500">{T.introSubtitle}</p>
        <p className="mt-3 text-xs uppercase tracking-wider text-gray-400">{T.poweredBy}</p>
        <p className="bg-gradient-to-r from-[#074989] to-[#0a6fd1] bg-clip-text text-lg font-extrabold text-transparent">{T.poweredName}</p>
      </div>
    </div>
  );
}

function OnlineDot() {
  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      <span className="kmf-ping absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      <span className="kmf-blink relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
    </span>
  );
}

function Typing() {
  return (
    <div className="flex items-end gap-2" role="status" aria-label={T.thinking}>
      <Avatar size={28} ring={false} />
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
        {[0, 0.15, 0.3].map((d) => (
          <span key={d} className="kmf-dot h-2 w-2 rounded-full bg-[#0a6fd1]" style={{ animationDelay: `${d}s` }} />
        ))}
      </div>
    </div>
  );
}

export default function AskNandiniPanel({ onEvent }) {
  const pathname = usePathname() || '/en';
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false); // mobile full screen
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [listening, setListening] = useState(false);
  const [intent, setIntent] = useState('');
  const [firstShow, setFirstShow] = useState(true);
  const [intro, setIntro] = useState(false);
  const introTimer = useRef(null);

  const cardRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);
  const voiceRef = useRef(null);

  // Starts open (unless minimised earlier in this visit). Never steals focus.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onMq = () => setIsMobile(mq.matches);
    onMq();
    mq.addEventListener('change', onMq);
    setMessages(store.get(STORE_KEY, []));
    setIntent(popupIntent());
    const minimised = store.get(MIN_KEY, false);
    if (!minimised) {
      onEvent?.('open', { trigger: 'auto' });
      // First appearance in this visit gets the intro; later pages open directly.
      if (store.get(INTRO_KEY, false)) setOpen(true);
      else {
        store.set(INTRO_KEY, true);
        playIntro(() => setOpen(true));
      }
    }
    return () => {
      mq.removeEventListener('change', onMq);
      clearTimeout(introTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => store.set(STORE_KEY, messages.filter((m) => !m.streaming).slice(-30)), [messages]);

  const fullScreen = isMobile && expanded;
  const teaser = isMobile && open && !expanded;
  const active = open && (fullScreen || (!isMobile && messages.length > 0));

  // While the visitor is actually chatting, the intent popup stays away.
  useEffect(() => {
    if (active) document.body.dataset.askNandiniOpen = '1';
    else delete document.body.dataset.askNandiniOpen;
    return () => delete document.body.dataset.askNandiniOpen;
  }, [active]);

  // Mobile full screen is modal: lock page scroll.
  useEffect(() => {
    if (!fullScreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [fullScreen]);

  // Esc minimises (when focus is in the chat); Tab stays inside on mobile full screen.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      const inside = cardRef.current?.contains(document.activeElement);
      if (e.key === 'Escape' && (inside || fullScreen)) {
        e.preventDefault();
        minimise();
        return;
      }
      if (e.key !== 'Tab' || !fullScreen || !cardRef.current) return;
      const items = [...cardRef.current.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, thinking, open, expanded]);

  useEffect(
    () => () => {
      abortRef.current?.abort();
      voiceRef.current?.stop();
    },
    []
  );

  function minimise() {
    setOpen(false);
    setExpanded(false);
    setFirstShow(false);
    store.set(MIN_KEY, true);
  }

  function playIntro(then) {
    setIntro(true);
    clearTimeout(introTimer.current);
    introTimer.current = setTimeout(() => {
      setIntro(false);
      then();
    }, INTRO_MS);
  }

  // Mobile greeting dialog -> full-screen chat (the chat is already visible: no intro).
  function expandTeaser() {
    setExpanded(true);
    setFirstShow(false);
    onEvent?.('open', { trigger: 'user' });
    setTimeout(() => inputRef.current?.focus(), 60);
  }

  function openByUser() {
    store.set(MIN_KEY, false);
    onEvent?.('open', { trigger: 'user' });
    playIntro(() => {
      setOpen(true);
      setFirstShow(false);
      if (isMobile) setExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 60);
    });
  }

  const update = (id, patch) =>
    setMessages((ms) => ms.map((m) => (m.id === id ? { ...m, ...(typeof patch === 'function' ? patch(m) : patch) } : m)));

  const send = useCallback(
    async (raw) => {
      const text = String(raw || '').trim();
      if (!text || busy || text.length > MAX_CHARS) return;
      if (isMobile && !expanded) setExpanded(true);
      const user = { id: newId(), role: 'user', content: text };
      const bot = { id: newId(), role: 'assistant', content: '', streaming: true };
      const history = [...messages.filter((m) => m.content && !m.fallback), user].map(({ role, content }) => ({ role, content }));
      setMessages((ms) => [...ms, user, bot]);
      setInput('');
      setBusy(true);
      setThinking(true);
      const turn = history.filter((m) => m.role === 'user').length;

      const controller = new AbortController();
      abortRef.current = controller;
      let hadFallback = false;
      try {
        const res = await fetch('/api/ask-nandini', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ messages: history, locale: 'en', page: pathname, intent }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buf = '';
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          let nl;
          while ((nl = buf.indexOf('\n')) >= 0) {
            const line = buf.slice(0, nl).trim();
            buf = buf.slice(nl + 1);
            if (!line) continue;
            let e;
            try {
              e = JSON.parse(line);
            } catch (err) {
              continue;
            }
            if (e.type === 'text') {
              setThinking(false);
              update(bot.id, (m) => ({ content: m.content + e.text }));
            } else if (e.type === 'reset') {
              setThinking(true);
              update(bot.id, { content: '' });
            } else if (e.type === 'tool') {
              setThinking(true);
              onEvent?.('tool', { tool: e.name });
            } else if (e.type === 'fallback') {
              hadFallback = true;
              update(bot.id, { content: e.text, fallback: e.reason });
              onEvent?.('fallback', { reason: e.reason });
            } else if (e.type === 'done') {
              update(bot.id, { streaming: false, answered: e.answered, logId: e.logId || null });
              if (!e.answered && !hadFallback) onEvent?.('fallback', { reason: 'no_answer' });
              onEvent?.('done', { lang: e.lang, turn });
            }
          }
        }
        update(bot.id, (m) => ({ streaming: false, content: m.content || T.offline }));
      } catch (err) {
        if (err?.name !== 'AbortError') {
          update(bot.id, { streaming: false, content: T.offline, fallback: 'error' });
          onEvent?.('fallback', { reason: 'error' });
        }
      } finally {
        setBusy(false);
        setThinking(false);
        abortRef.current = null;
      }
    },
    [busy, messages, pathname, intent, onEvent, isMobile, expanded]
  );

  const feedback = (m, value) => {
    if (m.feedback) return;
    update(m.id, { feedback: value });
    onEvent?.('feedback', { value });
    if (m.logId)
      fetch('/api/ask-nandini/feedback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: m.logId, value }),
        keepalive: true,
      }).catch(() => {});
  };

  const clear = () => {
    abortRef.current?.abort();
    setMessages([]);
    setThinking(false);
    inputRef.current?.focus();
  };

  const toggleMic = () => {
    if (listening) {
      voiceRef.current?.stop();
      return;
    }
    voiceRef.current = createVoiceInput({
      lang: 'en-IN',
      onResult: (text, isFinal) => {
        setInput(text.slice(0, MAX_CHARS));
        if (isFinal) voiceRef.current?.stop();
      },
      onEnd: () => setListening(false),
      onError: () => setListening(false),
    });
    setListening(true);
    voiceRef.current.start();
  };

  const onLink = (href) => {
    onEvent?.('link', { path: href.startsWith('/') ? href.split('?')[0] : new URL(href).host });
    if (href.startsWith('/') && isMobile) setExpanded(false);
  };

  const chips = chipsFor(pathname, intent);
  const empty = messages.length === 0;
  const lastBotId = [...messages].reverse().find((m) => m.role === 'assistant')?.id;

  const powered = (
    <p className="text-center text-[11px] text-gray-400">
      {T.poweredBy}{' '}
      <a href={T.poweredUrl} target="_blank" rel="noopener" onClick={() => trackCreditClick('chat')} className="font-semibold text-gray-500 hover:text-[#074989] hover:underline">
        {T.poweredName}
      </a>
    </p>
  );

  if (intro) {
    return (
      <>
        <style>{STYLES}</style>
        <Intro />
      </>
    );
  }

  // ---------- minimised: pulsing bubble ----------
  if (!open) {
    return (
      <>
        <style>{STYLES}</style>
        <button
          type="button"
          onClick={openByUser}
          aria-label={T.launcher}
          title={T.launcher}
          className="kmf-chat-in fixed bottom-4 right-4 z-[900] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#0a6fd1] to-[#074989] text-white shadow-[0_10px_30px_-5px_rgba(7,73,137,.6)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#074989] print:hidden"
        >
          <span className="kmf-ping absolute inset-0 animate-ping rounded-full bg-[#0a6fd1] opacity-30" aria-hidden="true" />
          <IoSparkles size={26} aria-hidden="true" className="relative" />
          <span className="absolute right-0.5 top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" aria-hidden="true" />
        </button>
      </>
    );
  }

  // ---------- mobile: small greeting dialog ----------
  if (teaser) {
    return (
      <>
        <style>{STYLES}</style>
        <div
          ref={cardRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby="ask-nandini-title"
          className={`fixed bottom-4 right-4 z-[900] w-[calc(100vw-6rem)] max-w-[300px] overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 print:hidden ${firstShow ? 'kmf-chat-glow' : 'kmf-chat-in'}`}
          style={{ boxShadow: '0 20px 60px -15px rgba(7,73,137,.45)' }}
        >
          <div className="flex items-center gap-2.5 bg-gradient-to-r from-[#074989] to-[#0a6fd1] px-3 py-2.5 text-white">
            <Avatar size={34} />
            <div className="min-w-0 flex-1">
              <p id="ask-nandini-title" className="text-sm font-bold leading-tight">
                {T.title}
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-blue-100">
                <OnlineDot /> {T.subtitle}
              </p>
            </div>
            <button type="button" onClick={minimise} aria-label={T.minimize} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/15">
              <IoChevronDown size={18} aria-hidden="true" />
            </button>
          </div>
          <div className="space-y-2 px-3 pb-2 pt-3">
            <p className="text-sm text-gray-800">{T.teaser}</p>
            <div className="flex flex-wrap gap-1.5">
              {chips.slice(0, 2).map((c) => (
                <button key={c} type="button" onClick={() => send(c)} className="rounded-full border border-[#cfe2f7] bg-[#f4f8fd] px-3 py-1.5 text-left text-xs font-semibold text-[#074989]">
                  {c}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={expandTeaser}
              className="flex w-full items-center justify-between rounded-full bg-[#f1f5fb] px-4 py-2.5 text-left text-sm text-gray-500 ring-1 ring-black/5"
            >
              {T.placeholder}
              <IoSend size={16} className="text-[#0a6fd1]" aria-hidden="true" />
            </button>
            {powered}
          </div>
        </div>
      </>
    );
  }

  // ---------- chat card (desktop) / full screen (mobile) ----------
  return (
    <>
      <style>{STYLES}</style>
      <div
        ref={cardRef}
        role="dialog"
        aria-modal={fullScreen ? 'true' : 'false'}
        aria-labelledby="ask-nandini-title"
        className={`fixed z-[950] flex flex-col overflow-hidden bg-white print:hidden ${
          fullScreen ? 'inset-0' : 'bottom-4 right-4 h-[min(540px,calc(100vh-14rem))] min-h-[380px] w-[370px] rounded-2xl ring-1 ring-black/5'
        } ${firstShow && !fullScreen ? 'kmf-chat-glow' : 'kmf-chat-in'}`}
        style={fullScreen ? undefined : { boxShadow: '0 20px 60px -15px rgba(7,73,137,.45)' }}
      >
        <header className="flex items-center gap-3 bg-gradient-to-r from-[#074989] via-[#0859a8] to-[#0a6fd1] px-4 py-3 text-white">
          <Avatar size={42} />
          <div className="min-w-0 flex-1">
            <h2 id="ask-nandini-title" className="text-base font-bold leading-tight">
              {T.title}
            </h2>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-blue-100">
              <OnlineDot /> {T.subtitle}
            </p>
          </div>
          {!empty && (
            <button type="button" onClick={clear} aria-label={T.clear} title={T.clear} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
              <IoTrashOutline size={18} aria-hidden="true" />
            </button>
          )}
          <button type="button" onClick={minimise} aria-label={T.minimize} title={T.minimize} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
            <IoChevronDown size={22} aria-hidden="true" />
          </button>
        </header>

        <div ref={listRef} role="log" aria-live="polite" aria-busy={busy} className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-[#f4f8fd] to-white px-4 py-4 text-[14px] leading-relaxed text-gray-800">
          <p className="mx-auto flex max-w-[92%] items-start justify-center gap-1.5 text-center text-[11px] leading-snug text-gray-500">
            <IoShieldCheckmarkOutline size={14} className="mt-px shrink-0 text-[#0a6fd1]" aria-hidden="true" />
            {T.notice}
          </p>

          <div className="flex items-end gap-2">
            <Avatar size={28} ring={false} />
            <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 shadow-sm ring-1 ring-black/5">
              <p className="font-semibold text-gray-900">{T.greeting}</p>
              <p className="mt-0.5">{T.welcome}</p>
            </div>
          </div>

          {empty && (
            <div className="flex flex-wrap gap-2 pl-9" aria-label="Suggested questions">
              {chips.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => send(c)}
                  className="rounded-full border border-[#cfe2f7] bg-white px-3.5 py-2 text-left text-[13px] font-semibold text-[#074989] shadow-sm transition-colors hover:border-[#0a6fd1] hover:bg-[#0a6fd1] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0a6fd1]"
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {messages.map((m) =>
            m.role === 'user' ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[82%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-gradient-to-br from-[#0a6fd1] to-[#074989] px-3.5 py-2.5 text-white shadow-sm">
                  {m.content}
                </div>
              </div>
            ) : m.content ? (
              <div key={m.id}>
                <div className="flex items-end gap-2">
                  <Avatar size={28} ring={false} />
                  <div className={`max-w-[85%] break-words rounded-2xl rounded-bl-md px-3.5 py-2.5 shadow-sm ring-1 ${m.fallback ? 'bg-amber-50 ring-amber-200' : 'bg-white ring-black/5'}`}>
                    <Markdown text={m.content} onLink={onLink} />
                  </div>
                </div>
                {m.id === lastBotId && !m.streaming && (
                  <div className="mt-1.5 flex flex-wrap items-center gap-1 pl-9 text-[11px] text-gray-400">
                    <span className="font-semibold text-[#0a6fd1]">{T.botName}</span>
                    {!m.fallback &&
                      (m.feedback ? (
                        <span className="ml-1">· {T.thanks}</span>
                      ) : (
                        <>
                          <span className="ml-1">· {T.helpful}</span>
                          <button type="button" onClick={() => feedback(m, 'up')} aria-label="Yes, helpful" className="rounded-full p-1.5 hover:bg-emerald-50 hover:text-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0a6fd1]">
                            <FiThumbsUp aria-hidden="true" />
                          </button>
                          <button type="button" onClick={() => feedback(m, 'down')} aria-label="No, not helpful" className="rounded-full p-1.5 hover:bg-red-50 hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0a6fd1]">
                            <FiThumbsDown aria-hidden="true" />
                          </button>
                        </>
                      ))}
                  </div>
                )}
              </div>
            ) : null
          )}

          {thinking && <Typing />}
        </div>

        <div className="border-t border-gray-100 bg-white px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-3">
          <form
            className="flex items-end gap-1.5 rounded-3xl bg-[#f1f5fb] py-1.5 pl-4 pr-1.5 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-[#0a6fd1]"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <label htmlFor="ask-nandini-input" className="sr-only">
              {T.placeholder}
            </label>
            <textarea
              id="ask-nandini-input"
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={MAX_CHARS}
              placeholder={listening ? T.listening : T.placeholder}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              className="max-h-28 min-h-[40px] flex-1 resize-none bg-transparent py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none md:text-sm"
            />
            {voiceSupported() && (
              <button
                type="button"
                onClick={toggleMic}
                aria-label={listening ? T.micStop : T.mic}
                aria-pressed={listening}
                title={listening ? T.micStop : T.mic}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0a6fd1] ${
                  listening ? 'bg-red-100 text-red-600' : 'text-gray-500 hover:bg-white'
                }`}
              >
                {listening ? <IoMicOff size={20} aria-hidden="true" /> : <IoMic size={20} aria-hidden="true" />}
              </button>
            )}
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label={T.send}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0a6fd1] to-[#074989] text-white shadow-sm transition-opacity disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a6fd1]"
            >
              <IoSend size={17} aria-hidden="true" />
            </button>
          </form>
          <div className="pt-2">{powered}</div>
        </div>
      </div>
    </>
  );
}
