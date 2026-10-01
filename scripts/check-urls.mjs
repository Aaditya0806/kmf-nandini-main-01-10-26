#!/usr/bin/env node
// Checks that every URL in the live sitemap, plus the new pages, returns 200 on
// a given deployment, and that every redirect returns 301 to a 200 page.
//
//   node scripts/check-urls.mjs http://localhost:3000
//   node scripts/check-urls.mjs https://<preview>.vercel.app
//
// URL list: the base's own /sitemap.xml, plus the production sitemap (so a new
// build is checked against every URL that is live today), plus EXTRA below.
// No dependencies; needs Node 18+.

const BASE = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
const LIVE_SITEMAP = 'https://www.kmfnandini.coop/sitemap.xml';

const EXTRA = ['/en/careers', '/kn/careers'];
const REDIRECTS = {
  '/careers': '/en/careers',
  '/recruitment': '/en/careers',
  '/about': '/en/about/company-profile',
  '/contact': '/en/contact',
  '/en/contact-us': '/en/contact',
  '/kn/contact-us': '/kn/contact',
  '/en-IN': '/en',
  '/en-IN/our-product': '/en/our-product',
  '/kn-IN': '/kn',
  '/kn-IN/our-product': '/kn/our-product',
};
const MUST_404 = ['/xyz', '/xyz/contact', '/en/this-page-does-not-exist', '/en/careers/no-such-job'];

async function sitemapPaths(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname || '/');
  } catch (e) {
    console.warn(`! could not read ${url}: ${e.message}`);
    return [];
  }
}

async function status(path, redirect = 'manual') {
  const res = await fetch(BASE + path, { redirect, signal: AbortSignal.timeout(30000) });
  return { code: res.status, location: res.headers.get('location') };
}

async function run() {
  const paths = [
    ...new Set([...(await sitemapPaths(`${BASE}/sitemap.xml`)), ...(await sitemapPaths(LIVE_SITEMAP)), ...EXTRA]),
  ].sort();

  const failures = [];
  let ok = 0;

  // A few at a time, to be gentle on the server and the CMS.
  for (let i = 0; i < paths.length; i += 6) {
    await Promise.all(
      paths.slice(i, i + 6).map(async (p) => {
        try {
          const { code } = await status(p);
          if (code === 200) ok++;
          else failures.push(`${code}  ${p}`);
        } catch (e) {
          failures.push(`ERR  ${p}  ${e.message}`);
        }
      })
    );
  }
  console.log(`pages: ${ok}/${paths.length} returned 200`);

  for (const [from, to] of Object.entries(REDIRECTS)) {
    const { code, location } = await status(from);
    const target = location ? new URL(location, BASE).pathname : '';
    const final = target ? (await status(target)).code : 0;
    const good = code === 301 && target === to && final === 200;
    console.log(`${good ? 'ok  ' : 'FAIL'} ${from} -> ${code} ${target || '-'} -> ${final || '-'}`);
    if (!good) failures.push(`redirect ${from}: ${code} ${target} ${final}`);
  }

  for (const p of MUST_404) {
    const { code } = await status(p);
    console.log(`${code === 404 ? 'ok  ' : 'FAIL'} ${p} -> ${code} (expected 404)`);
    if (code !== 404) failures.push(`expected 404: ${p} got ${code}`);
  }

  if (failures.length) {
    console.log(`\n${failures.length} failure(s):\n` + failures.join('\n'));
    process.exit(1);
  }
  console.log('\nAll checks passed.');
}

run();
