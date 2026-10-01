import index from '@/data/chat-index.json';
import { PAGES } from '@/lib/seo';

// Keyword (BM25) search over the site index built by scripts/build-chat-index.mjs
// (page text, CMS text, notification PDFs). Page titles/descriptions from
// lib/seo.js are always included, so search works even before the index is built.

export const tokenize = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFKC')
    .split(/[^\p{L}\p{M}\p{N}]+/u)
    .filter((w) => w.length > 1);

function seoDocs() {
  const docs = [];
  for (const [route, page] of Object.entries(PAGES)) {
    if (page.noindex) continue;
    for (const lang of ['en', 'kn']) {
      const t = page[lang];
      if (!t) continue;
      docs.push({ id: `seo:${lang}${route}`, url: `/${lang}${route}`, title: t.title, lang, source: 'page', text: t.description || '' });
    }
  }
  return docs;
}

const DOCS = [...(index.docs || []), ...seoDocs()];
const K1 = 1.2;
const B = 0.75;

const prepared = DOCS.map((d) => {
  const toks = tokenize(`${d.title} ${d.title} ${d.text}`); // title weighted x2
  const tf = new Map();
  for (const t of toks) tf.set(t, (tf.get(t) || 0) + 1);
  return { d, tf, len: toks.length };
});
const avgLen = prepared.reduce((n, p) => n + p.len, 0) / Math.max(prepared.length, 1);
const df = new Map();
for (const p of prepared) for (const t of p.tf.keys()) df.set(t, (df.get(t) || 0) + 1);
const N = prepared.length;

export function searchIndex(query, lang = 'en', limit = 5) {
  const q = [...new Set(tokenize(query))];
  if (!q.length) return [];
  const scored = prepared
    .map((p) => {
      let s = 0;
      for (const t of q) {
        const f = p.tf.get(t);
        if (!f) continue;
        const idf = Math.log(1 + (N - df.get(t) + 0.5) / (df.get(t) + 0.5));
        s += idf * ((f * (K1 + 1)) / (f + K1 * (1 - B + (B * p.len) / avgLen)));
      }
      // Prefer the visitor's language when both versions match.
      if (s > 0 && p.d.lang === lang) s *= 1.15;
      return { p, s };
    })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);

  // One result per URL.
  const seen = new Set();
  const out = [];
  for (const { p } of scored) {
    if (seen.has(p.d.url)) continue;
    seen.add(p.d.url);
    out.push({
      title: p.d.title,
      url: p.d.url,
      source: p.d.source,
      date: p.d.date || undefined,
      excerpt: excerpt(p.d.text, q),
    });
    if (out.length >= limit) break;
  }
  return out;
}

// ~600 characters around the first matching keyword.
function excerpt(text = '', terms) {
  const lower = text.toLowerCase();
  let at = -1;
  for (const t of terms) {
    at = lower.indexOf(t);
    if (at >= 0) break;
  }
  const start = Math.max(0, at - 150);
  const s = text.slice(start, start + 600).replace(/\s+/g, ' ').trim();
  return (start > 0 ? '…' : '') + s + (start + 600 < text.length ? '…' : '');
}
