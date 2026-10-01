#!/usr/bin/env node
// Builds src/data/chat-index.json, the text Ask Nandini's search_site tool searches:
//   1. every English page in the site's sitemap (text from the rendered HTML,
//      with header/footer/nav text that repeats on most pages removed),
//   2. the Strapi collections behind those pages (read-only GETs),
//   3. the text of notification/tender PDFs (scanned PDFs with no text layer are
//      logged, not OCR'd).
//
//   node scripts/build-chat-index.mjs [site-base-url]
//     default site: http://localhost:3000 (a running `npm start`), CMS from NEXT_PUBLIC_BASE_URL
//
// Re-run whenever content changes, then commit the JSON and redeploy.

import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const SITE = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
try {
  for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch (e) {}
const CMS = (process.env.NEXT_PUBLIC_BASE_URL || 'https://m2kcctkzlf.execute-api.ap-south-1.amazonaws.com/prod').replace(/\/$/, '');
const OUT = new URL('../src/data/chat-index.json', import.meta.url);
const CHUNK = 1200;
const OVERLAP = 150;
const MAX_PDFS = 150;
const MAX_PDF_BYTES = 20 * 1024 * 1024;

// CMS collection -> page it appears on (a function gets the entry id).
const COLLECTIONS = [
  ['about-unit-kmfs', '/about/company-profile'],
  ['our-journeys', '/about/company-profile'],
  ['projects', '/about/company-profile'],
  ['growht-processes', '/about/company-profile'],
  ['mission-vissions', '/about/mission-vision'],
  ['milestones', '/about/mile-stones'],
  ['food-safety', '/about/quality-food'],
  ['md', '/executive'],
  ['executives', '/executive'],
  ['unioncheifs', '/executive'],
  ['unitcheifs', '/executive'],
  ['chairmain', '/directors'],
  ['directors', '/directors'],
  ['animal-breedings', '/animal-husbandry/animal-breeding'],
  ['bull-mother-farms', '/animal-husbandry/animal-breeding'],
  ['health-camps', '/animal-husbandry/animal-health'],
  ['animal-healths', '/animal-husbandry/animal-health'],
  ['feed-and-fooders', '/animal-husbandry/feed-and-fodder'],
  ['procurements', '/animal-husbandry/procurement'],
  ['gois', '/animal-husbandry/scheme/goi'],
  ['goks', '/animal-husbandry/scheme/gok'],
  ['schemes', '/animal-husbandry/scheme/other-scheme'],
  ['awards', '/portfolio/awards'],
  ['kmf-achievements', '/portfolio'],
  ['sponsoreds', '/portfolio'],
  ['gheesupplies', '/portfolio/marketing'],
  ['ksheerabhagaya', '/portfolio/ksheerabhagaya'],
  ['ksheera-dhare', '/portfolio/ksheeradhare'],
  ['nandini-hostels', '/social-responsibility/nandini-hostels'],
  ['women-empowerments', '/women-empowerment'],
  ['tv-commercials', '/blog/tv-commercial'],
  ['blog-posts', (id) => `/blog/${id}`],
  ['units-of-kmfs', (id) => `/kmf-unit/${id}`],
  ['milk-unions', (id) => `/milk-union/${id}`],
  ['recipes', (id) => `/nandini-recipes/${id}`],
  ['tender-notifications', '/blog/notification'],
];

const SKIP_KEYS = new Set(['createdAt', 'updatedAt', 'publishedAt', 'locale', 'localizations', 'order', 'isLatest', 'hasNewProduct']);
const TITLE_KEYS = ['title', 'name', 'heading', 'Heading', 'designation'];

// ---------- helpers ----------
const clean = (s) =>
  String(s || '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t ]+/g, ' ')
    .trim();

function chunks(text) {
  const out = [];
  const t = text.replace(/\n{3,}/g, '\n\n').trim();
  for (let i = 0; i < t.length; i += CHUNK - OVERLAP) {
    let end = Math.min(i + CHUNK, t.length);
    if (end < t.length) {
      const cut = t.lastIndexOf('. ', end);
      if (cut > i + CHUNK / 2) end = cut + 1;
    }
    out.push(t.slice(i, end).trim());
    if (end >= t.length) break;
    i = end - (CHUNK - OVERLAP);
  }
  return out.filter((c) => c.length > 40);
}

async function pool(items, n, fn) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < items.length) {
        const k = i++;
        out[k] = await fn(items[k]).catch((e) => ({ error: e.message }));
      }
    })
  );
  return out;
}

const getJSON = async (url) => {
  const r = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
};

function blocksText(v) {
  if (!Array.isArray(v)) return '';
  const walk = (n) => n?.text ?? (Array.isArray(n?.children) ? n.children.map(walk).join('') : '');
  return v.map(walk).filter(Boolean).join('\n');
}

// All human-readable text in a Strapi entry; PDF URLs collected on the side.
function entryText(attrs, pdfs, where) {
  const parts = [];
  for (const [k, v] of Object.entries(attrs || {})) {
    if (SKIP_KEYS.has(k) || v == null) continue;
    if (typeof v === 'string') {
      if (/^https?:\/\//.test(v)) continue;
      if (v.trim().length > 1) parts.push(clean(v));
    } else if (Array.isArray(v) && v[0]?.type) {
      parts.push(blocksText(v));
    } else if (typeof v === 'object' && 'data' in v) {
      const media = Array.isArray(v.data) ? v.data : v.data ? [v.data] : [];
      for (const m of media) {
        const url = m?.attributes?.url;
        if (url && /\.(pdf|docx?)($|\?)/i.test(url)) pdfs.set(url, { where, title: m.attributes.name });
      }
    }
  }
  return parts.filter(Boolean).join('\n');
}

// ---------- 1. pages ----------
async function pageDocs() {
  let urls = [];
  try {
    const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname).filter((p) => p === '/en' || p.startsWith('/en/'));
  } catch (e) {
    console.warn(`! could not read ${SITE}/sitemap.xml: ${e.message}`);
  }
  const pages = await pool(urls, 4, async (path) => {
    const html = await (await fetch(SITE + path, { signal: AbortSignal.timeout(30000) })).text();
    const title = clean((html.match(/<title>([^<]*)<\/title>/) || [])[1] || path).replace(/\s*\|\s*KMF Nandini$/, '');
    const body = html
      .replace(/<head[\s\S]*?<\/head>/i, ' ')
      .replace(/<(script|style|noscript|svg|iframe)[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<\/?(p|div|li|h[1-6]|br|tr|td|section|article|ul|ol|header|footer|nav|a|button)\b[^>]*>/gi, '\n')
      .replace(/<[^>]+>/g, ' ');
    const lines = body.split('\n').map(clean).filter((l) => l.length > 2);
    return { path, title, lines };
  });
  // Drop boilerplate: lines that appear on more than 40% of pages (header, menu, footer).
  const freq = new Map();
  for (const p of pages) if (p?.lines) for (const l of new Set(p.lines)) freq.set(l, (freq.get(l) || 0) + 1);
  const limit = Math.max(3, pages.length * 0.4);
  const docs = [];
  for (const p of pages) {
    if (!p?.lines) continue;
    const text = p.lines.filter((l) => freq.get(l) < limit).join('\n');
    chunks(text).forEach((c, i) => docs.push({ id: `page:${p.path}#${i}`, url: p.path, title: p.title, lang: 'en', source: 'page', text: c }));
  }
  return { docs, pages: pages.filter((p) => p?.lines).length };
}

// ---------- 2. CMS collections ----------
async function cmsDocs(pdfs) {
  const docs = [];
  const stats = {};
  for (const [name, target] of COLLECTIONS) {
    try {
      const json = await getJSON(`${CMS}/api/${name}?locale=en&populate=*&pagination[pageSize]=500`);
      const items = Array.isArray(json.data) ? json.data : json.data ? [json.data] : [];
      stats[name] = items.length;
      for (const it of items) {
        const a = it.attributes || {};
        const url = `/en${typeof target === 'function' ? target(it.id) : target}`;
        const title = clean(TITLE_KEYS.map((k) => a[k]).find((v) => typeof v === 'string' && v.trim()) || name);
        const text = entryText(a, pdfs, url);
        if (name === 'tender-notifications') {
          const pdf = a.pdf_file?.data?.attributes?.url;
          if (pdf) pdfs.set(pdf, { where: url, title, date: a.last_date || a.start_date, tender: true });
        }
        chunks(`${title}\n${text}`).forEach((c, i) =>
          docs.push({ id: `cms:${name}:${it.id}#${i}`, url, title, lang: 'en', source: 'cms', date: a.date || a.last_date || undefined, text: c })
        );
      }
    } catch (e) {
      stats[name] = `error: ${e.message}`;
    }
  }
  return { docs, stats };
}

// ---------- 3. PDFs ----------
async function pdfDocs(pdfs) {
  const pdfjs = require('pdfjs-dist/legacy/build/pdf.js');
  const list = [...pdfs.entries()].slice(0, MAX_PDFS);
  const scanned = [];
  const failed = [];
  const notPdf = [];
  const docs = [];
  await pool(list, 3, async ([url, meta]) => {
    if (!/\.pdf($|\?)/i.test(url)) {
      notPdf.push({ url, title: meta.title, page: meta.where });
      return;
    }
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(60000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = new Uint8Array(await res.arrayBuffer());
      if (buf.byteLength > MAX_PDF_BYTES) throw new Error('too large');
      const doc = await pdfjs.getDocument({ data: buf, isEvalSupported: false, verbosity: 0 }).promise;
      let text = '';
      for (let i = 1; i <= Math.min(doc.numPages, 30); i++) {
        const content = await (await doc.getPage(i)).getTextContent();
        text += content.items.map((it) => it.str).join(' ') + '\n';
      }
      text = clean(text);
      if (text.replace(/\s/g, '').length < 100) {
        scanned.push({ url, title: meta.title, page: meta.where, pages: doc.numPages });
        return;
      }
      chunks(text).forEach((c, i) =>
        docs.push({ id: `pdf:${url}#${i}`, url, title: `${meta.title} (PDF)`, lang: 'en', source: 'pdf', date: meta.date, text: c })
      );
    } catch (e) {
      failed.push({ url, error: e.message });
    }
  });
  return { docs, scanned, failed, notPdf, total: list.length };
}

// ---------- run ----------
const pdfs = new Map();
console.log(`Site: ${SITE}\nCMS:  ${CMS}\n`);
const pages = await pageDocs();
console.log(`pages: ${pages.pages} English pages -> ${pages.docs.length} chunks`);
const cms = await cmsDocs(pdfs);
console.log(`cms:   ${cms.docs.length} chunks from ${Object.keys(cms.stats).length} collections`);
for (const [k, v] of Object.entries(cms.stats)) if (typeof v === 'string') console.log(`       ${k}: ${v}`);
const pdf = await pdfDocs(pdfs);
const withText = pdf.total - pdf.scanned.length - pdf.failed.length - pdf.notPdf.length;
console.log(`files: ${pdf.total} attached -> ${withText} PDFs with text (${pdf.docs.length} chunks), ${pdf.scanned.length} scanned PDFs (no text), ${pdf.notPdf.length} Word files (not indexed), ${pdf.failed.length} failed`);

const docs = [...pages.docs, ...cms.docs, ...pdf.docs];
const index = {
  _readme: 'Generated by scripts/build-chat-index.mjs. Do not edit by hand.',
  builtAt: new Date().toISOString(),
  stats: { pages: pages.pages, pageChunks: pages.docs.length, cmsChunks: cms.docs.length, files: pdf.total, pdfChunks: pdf.docs.length, scannedPdfs: pdf.scanned.length, wordFiles: pdf.notPdf.length, failedPdfs: pdf.failed.length },
  scannedPdfs: pdf.scanned,
  wordFiles: pdf.notPdf,
  failedPdfs: pdf.failed,
  docs,
};
const json = JSON.stringify(index);
writeFileSync(OUT, json);
const mb = Buffer.byteLength(json) / 1024 / 1024;
console.log(`\nWrote ${docs.length} chunks, ${mb.toFixed(2)} MB -> src/data/chat-index.json`);
if (mb > 5) console.warn('! Index is over 5 MB: consider moving it to Supabase (pgvector / full-text) instead of the repo.');
if (pdf.scanned.length) {
  console.log(`\nScanned PDFs with no text layer (not searchable until OCR'd):`);
  for (const s of pdf.scanned) console.log(`  - ${s.title || s.url} (${s.pages}p) on ${s.page}`);
}
