import { createHash } from 'crypto';
import { CFG } from './config';
import { todayIST } from '@/lib/careers';
import { rpc, supabaseConfigured } from './supabase';

// Rate limits and the daily message cap. The in-memory backend counts per
// server instance (fine for local development); production uses Supabase
// (see ./supabase.js), which is shared across all instances.

const SALT = process.env.ASK_NANDINI_HASH_SALT || 'ask-nandini';

// Visitors are identified only by a salted hash of their IP address.
export function visitorId(req) {
  const ip =
    req.headers.get('x-real-ip') ||
    (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    'unknown';
  return createHash('sha256').update(`${SALT}:${ip}`).digest('hex').slice(0, 32);
}

const mem = { hits: new Map(), day: '', total: 0 };

const memoryBackend = {
  async take(visitor) {
    const now = Date.now();
    const today = todayIST();
    if (mem.day !== today) {
      mem.day = today;
      mem.total = 0;
      mem.hits.clear();
    }
    if (mem.total >= CFG.dailyMsgCap) return { ok: false, reason: 'daily_cap' };

    const list = (mem.hits.get(visitor) || []).filter((t) => now - t < 24 * 3600e3);
    const inWindow = list.filter((t) => now - t < CFG.rateWindowMin * 60e3).length;
    if (inWindow >= CFG.ratePerWindow || list.length >= CFG.ratePerDay) return { ok: false, reason: 'rate_limited' };

    list.push(now);
    mem.hits.set(visitor, list);
    mem.total += 1;
    return { ok: true };
  },
};

// Shared across all server instances; used whenever Supabase is configured.
const supabaseBackend = {
  async take(visitor) {
    const result = await rpc('ask_nandini_take', {
      p_visitor: visitor,
      p_window_min: CFG.rateWindowMin,
      p_per_window: CFG.ratePerWindow,
      p_per_day: CFG.ratePerDay,
      p_daily_cap: CFG.dailyMsgCap,
      p_today: todayIST(),
    });
    return result === 'ok' ? { ok: true } : { ok: false, reason: result || 'rate_limited' };
  },
};

const backend = supabaseConfigured() ? supabaseBackend : memoryBackend;

// Counts one visitor message; returns { ok } or { ok: false, reason }.
export async function takeMessage(visitor) {
  try {
    return await backend.take(visitor);
  } catch (e) {
    // If the limit store is down, fall back to per-instance limits rather than
    // either blocking everyone or removing all limits.
    return memoryBackend.take(visitor);
  }
}
