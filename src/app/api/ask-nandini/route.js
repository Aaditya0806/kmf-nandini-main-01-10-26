import { CFG, ALLOWED_EVAL_MODELS } from '@/lib/ask-nandini/config';
import { runChat } from '@/lib/ask-nandini/chat';
import { takeMessage, visitorId } from '@/lib/ask-nandini/store';
import { detectLang } from '@/lib/ask-nandini/text';
import { logQuestion, newLogId } from '@/lib/ask-nandini/log';
import { storedReply } from '@/lib/ask-nandini/stored';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

// English only for now.
const FALLBACK = {
  rate_limited: "You've sent a lot of questions in a short time. Please try again in a few minutes, or call toll-free **1800 425 8030**.",
  daily_cap: "Ask Nandini has reached today's limit. Please call toll-free **1800 425 8030**, WhatsApp **7899683696**, or use the [contact page](/en/contact).",
  error: "Sorry, I can't answer right now. Please call toll-free **1800 425 8030**, WhatsApp **7899683696**, or use the [contact page](/en/contact).",
};

function badRequest(msg) {
  return new Response(JSON.stringify({ error: msg }), { status: 400, headers: { 'content-type': 'application/json' } });
}

// Keep the last 8 turns, starting with a visitor message; validate every entry.
function cleanHistory(raw) {
  if (!Array.isArray(raw) || !raw.length || raw.length > 60) return null;
  const msgs = [];
  for (const m of raw) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string') return null;
    const content = m.content.trim();
    if (!content) continue;
    msgs.push({ role: m.role, content: m.role === 'assistant' ? content.slice(0, 4000) : content });
  }
  if (!msgs.length || msgs[msgs.length - 1].role !== 'user') return null;
  let recent = msgs.slice(-CFG.maxHistoryMessages);
  while (recent.length && recent[0].role !== 'user') recent = recent.slice(1);
  return recent;
}

export async function POST(req) {
  if (!CFG.enabled) return new Response('Not found', { status: 404 });

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return badRequest('invalid JSON');
  }
  const history = cleanHistory(body?.messages);
  if (!history) return badRequest('invalid messages');
  const question = history[history.length - 1].content;
  if (question.length > CFG.maxInputChars) return badRequest(`message longer than ${CFG.maxInputChars} characters`);

    const page = typeof body?.page === 'string' ? body.page.slice(0, 200) : '/en';
  const intent = typeof body?.intent === 'string' ? body.intent.replace(/[^\w-]/g, '').slice(0, 40) : '';
  const qLang = detectLang(question);

  // Evaluation mode (scripts/eval-ask-nandini.mjs): no limits, model choice, debug output.
  const evalMode = !!CFG.evalToken && req.headers.get('x-ask-nandini-eval') === CFG.evalToken;
  const evalModel = req.headers.get('x-ask-nandini-model');
  const model = evalMode && ALLOWED_EVAL_MODELS.includes(evalModel) ? evalModel : CFG.model;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj) => controller.enqueue(encoder.encode(JSON.stringify(obj) + '\n'));
      const started = Date.now();
      const logId = evalMode ? null : newLogId();
      let result = null;
      let fallback = null;

      try {
        if (!evalMode) {
          const limit = await takeMessage(visitorId(req));
          if (!limit.ok) fallback = limit.reason;
        }

        // Common first questions: stored reply, no Claude call (evals always use Claude).
        const stored = !fallback && !evalMode ? await storedReply(history) : null;
        if (stored) {
          send({ type: 'tool', name: 'stored_reply' }); // GA4: chat_tool_used tool=stored_reply
          send({ type: 'text', text: stored.text });
          result = { text: stored.text, toolsUsed: [`stored:${stored.id}`], toolResults: [], unanswered: null, stop: 'stored', usage: null, model: 'stored' };
        } else if (!fallback) {
          const timeout = AbortSignal.timeout(CFG.timeoutMs);
          const signal = typeof AbortSignal.any === 'function' ? AbortSignal.any([timeout, req.signal]) : timeout;
          result = await runChat({
            history,
            page,
            intent,
            model,
            signal,
            onText: (text) => send({ type: 'text', text }),
            onReset: () => send({ type: 'reset' }),
            onTool: (name) => name !== 'flag_unanswered' && send({ type: 'tool', name }),
          });
          if (!result.text.trim()) fallback = 'error';
        }
      } catch (e) {
        fallback = 'error';
        // Server log only: error class/status, never the visitor's text.
        console.error('[ask-nandini]', e?.name || 'Error', e?.status || '', String(e?.message || '').slice(0, 300));
      }

      if (fallback) send({ type: 'fallback', reason: fallback, text: FALLBACK[fallback] });
      send({
        type: 'done',
        answered: !fallback && !result?.unanswered,
        lang: qLang,
        logId,
        tools: result ? [...new Set(result.toolsUsed.filter((t) => t !== 'flag_unanswered'))] : [],
        ...(evalMode ? { debug: { model, usage: result?.usage, toolResults: result?.toolResults, stop: result?.stop, unanswered: result?.unanswered, ms: Date.now() - started } } : {}),
      });

      // Log before closing: work after the response ends may be cut off on Vercel.
      // The visitor already has the full answer at this point.
      if (!evalMode) {
        await Promise.race([
          logQuestion({
            id: logId,
            question,
            answer: fallback ? null : result?.text,
            lang: qLang,
            page,
            tools: result?.toolsUsed || [],
            answered: !fallback && !result?.unanswered,
            missing: result?.unanswered || null,
            fallback,
            usage: result?.usage,
            model: result?.model === 'stored' ? 'stored' : model,
          }).catch(() => {}),
          new Promise((r) => setTimeout(r, 1500)),
        ]);
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'content-type': 'application/x-ndjson; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  });
}
