// Minimal Supabase REST client for Ask Nandini (server only; no extra package).
// SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are secret server env vars: never
// prefix them with NEXT_PUBLIC_.

const URL_ = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabaseConfigured = () => !!(URL_ && KEY);

export async function sb(path, { method = 'GET', body, prefer, timeoutMs = 3000, withCount = false } = {}) {
  const res = await fetch(`${URL_}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
      ...(withCount ? { Prefer: [prefer, 'count=exact'].filter(Boolean).join(',') } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(timeoutMs),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Supabase ${res.status} on ${path.split('?')[0]}`);
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!withCount) return data;
  // "0-49/1141" -> 1141
  const total = parseInt((res.headers.get('content-range') || '').split('/')[1], 10);
  return { data, total: Number.isFinite(total) ? total : (data || []).length };
}

export const rpc = (fn, args, opts) => sb(`rpc/${fn}`, { method: 'POST', body: args, ...opts });
