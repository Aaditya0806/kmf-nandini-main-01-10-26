import { sb, supabaseConfigured } from '@/lib/ask-nandini/supabase';

// Thin table helpers over the Supabase REST API (PostgREST). Without Supabase
// (local development) rows are kept in memory per server instance.

const mem = { dealer_applications: [], demand_requests: [], demand_reports: [], complaints: [] };
let seq = 0;
const memId = () => `mem-${Date.now()}-${++seq}`;

export const dbConfigured = supabaseConfigured;

export async function insertRow(table, row) {
  if (!supabaseConfigured()) {
    const r = { id: memId(), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), ...row };
    mem[table].unshift(r);
    return r;
  }
  const out = await sb(table, { method: 'POST', body: row, prefer: 'return=representation', timeoutMs: 8000 });
  return Array.isArray(out) ? out[0] : out;
}

// Inserts with a fresh ticket; retries if the ticket already exists.
export async function insertWithTicket(table, row, makeTicket) {
  for (let i = 0; i < 5; i++) {
    const ticket = makeTicket();
    try {
      return await insertRow(table, { ...row, ticket });
    } catch (e) {
      if (!/409/.test(String(e?.message))) throw e;
    }
  }
  throw new Error('could not allocate a ticket');
}

// PostgREST filter string, e.g. 'status=eq.open&created_at=gt.2026-01-01'.
export async function listRows(table, { filter = '', order = 'created_at.desc', limit = 200, offset = 0, select = '*' } = {}) {
  if (!supabaseConfigured()) {
    const rows = mem[table].filter((r) => memFilter(r, filter));
    return rows.slice(offset, offset + limit);
  }
  const q = `${table}?select=${select}${filter ? `&${filter}` : ''}&order=${order}&limit=${limit}&offset=${offset}`;
  return (await sb(q, { timeoutMs: 10000 })) || [];
}

export async function countRows(table, filter = '') {
  if (!supabaseConfigured()) return mem[table].filter((r) => memFilter(r, filter)).length;
  const { total } = await sb(`${table}?select=id${filter ? `&${filter}` : ''}&limit=1`, { timeoutMs: 8000, withCount: true });
  return total;
}

export async function getRow(table, col, value) {
  if (!supabaseConfigured()) return mem[table].find((r) => r[col] === value) || null;
  const rows = await sb(`${table}?select=*&${col}=eq.${encodeURIComponent(value)}&limit=1`, { timeoutMs: 8000 });
  return rows?.[0] || null;
}

export async function updateRow(table, id, patch) {
  if (!supabaseConfigured()) {
    const r = mem[table].find((x) => x.id === id);
    if (r) Object.assign(r, patch, { updated_at: new Date().toISOString() });
    return !!r;
  }
  await sb(`${table}?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', body: { ...patch, updated_at: new Date().toISOString() }, prefer: 'return=minimal', timeoutMs: 8000 });
  return true;
}

// Only the handful of filters the admin page uses: col=eq.v and col=gt.v.
function memFilter(row, filter) {
  if (!filter) return true;
  return filter.split('&').every((part) => {
    const [col, expr] = part.split('=');
    const [op, ...rest] = decodeURIComponent(expr || '').split('.');
    const v = rest.join('.');
    if (op === 'eq') return String(row[col]) === v;
    if (op === 'gt') return String(row[col]) > v;
    if (op === 'is') return v === 'null' ? row[col] == null : row[col] != null;
    return true;
  });
}

// ---- Complaint photos: private Supabase Storage bucket -------------------
const BUCKET = 'complaint-photos';
const memFiles = new Map();

function storageHeaders(extra = {}) {
  const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return { apikey: KEY, Authorization: `Bearer ${KEY}`, ...extra };
}
const storageUrl = (path) => `${(process.env.SUPABASE_URL || '').replace(/\/$/, '')}/storage/v1/object/${BUCKET}/${path}`;

export async function putPhoto(path, bytes, contentType) {
  if (!supabaseConfigured()) {
    memFiles.set(path, { bytes, contentType });
    return path;
  }
  const res = await fetch(storageUrl(path), {
    method: 'POST',
    headers: storageHeaders({ 'Content-Type': contentType, 'x-upsert': 'false' }),
    body: bytes,
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Storage ${res.status}`);
  return path;
}

// Returns { bytes, contentType } or null.
export async function getPhoto(path) {
  if (!supabaseConfigured()) return memFiles.get(path) || null;
  const res = await fetch(storageUrl(path), { headers: storageHeaders(), signal: AbortSignal.timeout(15000), cache: 'no-store' });
  if (!res.ok) return null;
  return { bytes: Buffer.from(await res.arrayBuffer()), contentType: res.headers.get('content-type') || 'application/octet-stream' };
}
