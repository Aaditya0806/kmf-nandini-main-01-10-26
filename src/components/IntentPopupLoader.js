'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import {
  INTENT_DELAY_MS,
  INTENT_PAGES,
  INTENT_REMEMBER_DAYS,
  INTENT_SCROLL_RATIO,
} from '@/configtext/intentPopup';

// Kill switch: set NEXT_PUBLIC_INTENT_POPUP=on to enable (then redeploy).
const ENABLED = process.env.NEXT_PUBLIC_INTENT_POPUP === 'on';
const STORAGE_KEY = 'kmf_intent_popup';

// The modal's code is only downloaded when it is about to be shown.
const IntentPopup = dynamic(() => import('./IntentPopup'), { ssr: false });

// Survives client-side navigation: at most one popup per page session, even
// when localStorage is blocked.
let shownThisSession = false;

function rememberedRecently() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
    return !!saved && Date.now() - saved.at < INTENT_REMEMBER_DAYS * 86400000;
  } catch (e) {
    return false; // storage unavailable: shownThisSession limits it to once
  }
}

export function rememberIntent(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, at: Date.now() }));
  } catch (e) {
    // ignored: shownThisSession already stops a repeat in this session
  }
}

function isBot() {
  const ua = navigator.userAgent || '';
  return navigator.webdriver || /bot|crawl|spider|slurp|lighthouse|headless|preview|facebookexternalhit/i.test(ua);
}

function routeOf(pathname) {
  const m = pathname.match(/^\/(en|kn)(\/.*)?$/);
  if (pathname === '/') return { lang: 'en', route: '' };
  if (!m) return null;
  return { lang: m[1], route: (m[2] || '').replace(/\/$/, '') };
}

export default function IntentPopupLoader() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(null); // null or { lang }

  useEffect(() => {
    if (!ENABLED || shownThisSession || open) return;
    const r = routeOf(pathname);
    if (!r || !INTENT_PAGES.includes(r.route)) return;
    if (isBot() || rememberedRecently()) return;

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      cleanup();
      // Never open over the Ask Nandini chat.
      if (document.body.dataset.askNandiniOpen) return;
      shownThisSession = true;
      setOpen({ lang: r.lang });
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= INTENT_SCROLL_RATIO) show();
    };
    const timer = window.setTimeout(show, INTENT_DELAY_MS);
    window.addEventListener('scroll', onScroll, { passive: true });
    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    }
    // Leaving the page before the trigger cancels it.
    return cleanup;
  }, [pathname, open]);

  if (!open) return null;
  return <IntentPopup lang={open.lang} onClose={() => setOpen(null)} remember={rememberIntent} />;
}
