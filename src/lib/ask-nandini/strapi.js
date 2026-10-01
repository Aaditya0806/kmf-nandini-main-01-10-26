// Read-only GETs to the public Strapi API with a short in-memory cache, so
// answers stay current (at most 5 minutes old) without hammering the CMS.

const TTL_MS = 5 * 60 * 1000;
const cache = new Map();

function base() {
  return (process.env.NEXT_PUBLIC_BASE_URL || '').replace(/\/$/, '');
}

export async function strapiGet(path, params = {}) {
  const url = new URL(`${base()}/api/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const key = url.toString();

  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.data;

  const res = await fetch(key, { signal: AbortSignal.timeout(6000), cache: 'no-store' });
  if (!res.ok) throw new Error(`CMS ${res.status} for ${path}`);
  const json = await res.json();
  const data = Array.isArray(json?.data) ? json.data : json?.data ? [json.data] : [];
  cache.set(key, { at: Date.now(), data });
  return data;
}

// Strapi "blocks" rich text -> plain text.
export function blocksToText(blocks) {
  if (!Array.isArray(blocks)) return typeof blocks === 'string' ? blocks : '';
  const walk = (node) =>
    node?.text ?? (Array.isArray(node?.children) ? node.children.map(walk).join('') : '');
  return blocks.map(walk).filter(Boolean).join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

export const mediaUrl = (m) => m?.data?.attributes?.url || (Array.isArray(m?.data) ? m.data[0]?.attributes?.url : '') || '';
