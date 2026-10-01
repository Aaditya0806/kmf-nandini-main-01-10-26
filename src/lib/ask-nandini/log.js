import { randomUUID } from 'crypto';
import { scrubPII } from './text';
import { rpc, sb, supabaseConfigured } from './supabase';
import { costUSD } from './config';

// Anonymised question log for the admin page (/admin/ask-nandini).
// Stored in Supabase (Mumbai) when configured, kept 90 days. Without Supabase
// (local development) the last 500 entries are kept in memory only.
// Never stored: IP address, visitor id, names/phones/emails/ID numbers (scrubbed).

const RETENTION_DAYS = 90;
const mem = [];

export const newLogId = () => randomUUID();

export async function logQuestion(entry) {
  const row = {
    id: entry.id || newLogId(),
    created_at: new Date().toISOString(),
    question: scrubPII(entry.question).slice(0, 1000),
    answer: entry.answer ? scrubPII(entry.answer).slice(0, 2000) : null,
    lang: entry.lang || null,
    page: entry.page ? String(entry.page).slice(0, 200) : null,
    tools: [...new Set((entry.tools || []).filter((t) => t !== 'flag_unanswered'))],
    answered: !!entry.answered,
    missing: entry.missing ? scrubPII(entry.missing).slice(0, 200) : null,
    fallback: entry.fallback || null,
    model: entry.model || null,
    tokens_in: entry.usage ? entry.usage.input + entry.usage.cacheRead + entry.usage.cacheWrite : null,
    tokens_out: entry.usage?.output ?? null,
    cost_usd: costUSD(entry.usage, entry.model),
    feedback: null,
  };

  if (!supabaseConfigured()) {
    mem.unshift(row);
    mem.length = Math.min(mem.length, 500);
    return row.id;
  }
  await sb('ask_nandini_log', { method: 'POST', body: row, prefer: 'return=minimal' });
  if (Math.random() < 1 / 200) rpc('ask_nandini_cleanup', {}).catch(() => {});
  return row.id;
}

// Thumbs up/down: set once per logged answer.
export async function setFeedback(id, value) {
  if (!/^[0-9a-f-]{36}$/i.test(id || '') || !['up', 'down'].includes(value)) return false;
  if (!supabaseConfigured()) {
    const row = mem.find((r) => r.id === id);
    if (row && !row.feedback) row.feedback = value;
    return !!row;
  }
  await sb(`ask_nandini_log?id=eq.${id}&feedback=is.null`, { method: 'PATCH', body: { feedback: value }, prefer: 'return=minimal' });
  return true;
}

// Everything the admin page shows for the last `days` days.
export async function adminData(days = 30) {
  const d = Math.min(Math.max(parseInt(days, 10) || 30, 1), RETENTION_DAYS);
  if (!supabaseConfigured()) return memAdmin(d);

  const since = new Date(Date.now() - d * 86400e3).toISOString();
  const cols = 'created_at,question,answer,lang,page,missing,feedback';
  const [summary, top, unanswered, down] = await Promise.all([
    rpc('ask_nandini_summary', { p_days: d }, { timeoutMs: 8000 }),
    rpc('ask_nandini_top_questions', { p_days: d, p_limit: 25 }, { timeoutMs: 8000 }),
    sb(`ask_nandini_log?select=${cols}&created_at=gt.${since}&answered=is.false&fallback=is.null&order=created_at.desc&limit=100`, { timeoutMs: 8000 }),
    sb(`ask_nandini_log?select=${cols}&created_at=gt.${since}&feedback=eq.down&order=created_at.desc&limit=100`, { timeoutMs: 8000 }),
  ]);
  return { days: d, source: 'supabase', summary, top, unanswered, down };
}

function memAdmin(d) {
  const since = Date.now() - d * 86400e3;
  const rows = mem.filter((r) => Date.parse(r.created_at) > since);
  const count = (f) => rows.filter(f).length;
  const langs = {};
  for (const r of rows) langs[r.lang || 'unknown'] = (langs[r.lang || 'unknown'] || 0) + 1;
  const tally = new Map();
  for (const r of rows.filter((x) => !x.fallback)) {
    const q = r.question.trim().toLowerCase().replace(/\s+/g, ' ');
    tally.set(q, (tally.get(q) || 0) + 1);
  }
  return {
    days: d,
    source: 'memory (local development: Supabase not configured)',
    summary: {
      total: rows.length,
      answered: count((r) => r.answered && !r.fallback),
      unanswered: count((r) => !r.answered && !r.fallback),
      fallbacks: {
        rate_limited: count((r) => r.fallback === 'rate_limited'),
        daily_cap: count((r) => r.fallback === 'daily_cap'),
        error: count((r) => r.fallback === 'error'),
      },
      stored: count((r) => r.model === 'stored'),
      up: count((r) => r.feedback === 'up'),
      down: count((r) => r.feedback === 'down'),
      tokens_in: rows.reduce((n, r) => n + (r.tokens_in || 0), 0),
      tokens_out: rows.reduce((n, r) => n + (r.tokens_out || 0), 0),
      cost_usd: rows.reduce((n, r) => n + (r.cost_usd || 0), 0),
      langs,
    },
    top: [...tally].sort((a, b) => b[1] - a[1]).slice(0, 25).map(([question, n]) => ({ question, n })),
    unanswered: rows.filter((r) => !r.answered && !r.fallback).slice(0, 100),
    down: rows.filter((r) => r.feedback === 'down').slice(0, 100),
  };
}
