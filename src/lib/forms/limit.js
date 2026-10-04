import { visitorId } from '@/lib/ask-nandini/store';
import { rpc, supabaseConfigured } from '@/lib/ask-nandini/supabase';
import { todayIST } from '@/lib/careers';

// Per-visitor limits for the public forms: 5 submissions per hour, 10 per day,
// shared across server instances through the Ask Nandini limit counters (the
// "forms-" day key keeps them separate from the chat's daily cap).
const PER_HOUR = 5;
const PER_DAY = 10;
const mem = new Map();

export async function takeFormSlot(req) {
  const visitor = `form:${visitorId(req)}`;
  try {
    if (supabaseConfigured()) {
      const r = await rpc('ask_nandini_take', { p_visitor: visitor, p_window_min: 60, p_per_window: PER_HOUR, p_per_day: PER_DAY, p_daily_cap: 1e9, p_today: `forms-${todayIST()}` }, { timeoutMs: 5000 });
      return r === 'ok';
    }
  } catch (e) {
    // limit store down: fall through to the per-instance counter
  }
  const now = Date.now();
  const list = (mem.get(visitor) || []).filter((t) => now - t < 86400e3);
  if (list.filter((t) => now - t < 3600e3).length >= PER_HOUR || list.length >= PER_DAY) return false;
  list.push(now);
  mem.set(visitor, list);
  return true;
}
