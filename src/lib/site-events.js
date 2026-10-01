import { createHash } from 'crypto';
import { INTENT_OPTIONS } from '@/configtext/intentPopup';
import { rpc, sb, supabaseConfigured } from '@/lib/ask-nandini/supabase';
import { todayIST } from '@/lib/careers';

// Click counts shown on /admin/ask-nandini: Velozity credit clicks and the
// "What brings you here today?" popup choices. Also sent to GA4 separately.
// Only these events/values are accepted, so the endpoint can't be used to
// store arbitrary data.
export const SITE_EVENTS = {
  credit_click: ['footer', 'chat'],
  intent_selected: INTENT_OPTIONS.map((o) => o.id),
  intent_dismissed: [''],
};

const SALT = process.env.ASK_NANDINI_HASH_SALT || 'ask-nandini';
const mem = new Map(); // local development without Supabase

// Changes every day: a visitor can't be followed across days.
export function dailyVisitorKey(req, day) {
  const ip =
    req.headers.get('x-real-ip') || (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  return createHash('sha256').update(`${SALT}:${ip}:${day}`).digest('hex').slice(0, 24);
}

export function validSiteEvent(event, value = '') {
  return Object.hasOwn(SITE_EVENTS, event) && SITE_EVENTS[event].includes(value);
}

// Counts once per visitor, per event/value, per day.
export async function recordSiteEvent(req, event, value = '') {
  if (!validSiteEvent(event, value)) return false;
  const day = todayIST();
  const visitor = dailyVisitorKey(req, day);
  if (!supabaseConfigured()) {
    mem.set(`${day}|${event}|${value}|${visitor}`, { day, event, value });
    return true;
  }
  await sb('site_events?on_conflict=day,event,value,visitor', {
    method: 'POST',
    body: { day, event, value, visitor },
    prefer: 'resolution=ignore-duplicates,return=minimal',
  });
  return true;
}

// [{ event, value, clicks }] for the last `days` days.
export async function siteEventCounts(days) {
  if (supabaseConfigured()) return (await rpc('site_event_counts', { p_days: days }, { timeoutMs: 8000 })) || [];
  const since = new Date(Date.now() - days * 86400e3).toISOString().slice(0, 10);
  const tally = new Map();
  for (const r of mem.values()) {
    if (r.day <= since) continue;
    const k = `${r.event}|${r.value}`;
    tally.set(k, (tally.get(k) || 0) + 1);
  }
  return [...tally].map(([k, clicks]) => {
    const [event, value] = k.split('|');
    return { event, value, clicks };
  });
}
