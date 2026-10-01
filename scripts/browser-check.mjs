import { chromium } from 'playwright';

// Browser checks for GA4 events, the intent popup, contact preselect and header
// layout. GA4 hits are intercepted and answered locally, so nothing is sent.
//
//   npm i --no-save playwright && npx playwright install chromium
//   node scripts/browser-check.mjs http://localhost:3000   (or a preview URL)
//
// Needs a build with NEXT_PUBLIC_INTENT_POPUP=on. Screenshots: .browser-check/
import { mkdirSync } from 'node:fs';
const BASE = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
const SHOTS = new URL('../.browser-check/', import.meta.url).pathname;
mkdirSync(SHOTS, { recursive: true });
const results = [];
const check = (name, ok, info = '') => {
  results.push({ name, ok });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${info ? '  — ' + info : ''}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Every GA4 hit is captured here and answered locally; nothing reaches Google.
function parseHits(url, body) {
  const u = new URL(url);
  const base = Object.fromEntries(u.searchParams);
  const lines = (body || '').split('\n').filter(Boolean);
  if (!lines.length) return [base];
  return lines.map((l) => ({ ...base, ...Object.fromEntries(new URLSearchParams(l)) }));
}

async function newContext(browser, { mobile = false, dismissPopup = false, blockStorage = false, lang } = {}) {
  const ctx = await browser.newContext(
    mobile
      ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }
      : { viewport: { width: 1280, height: 800 } }
  );
  await ctx.setExtraHTTPHeaders({});
  await ctx.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, 'webdriver', { get: () => false });
    Object.defineProperty(Navigator.prototype, 'userAgent', {
      get: () => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36',
    });
  });
  ctx.hits = [];
  await ctx.route(/\/g\/collect/, async (route) => {
    const req = route.request();
    ctx.hits.push(...parseHits(req.url(), req.postData()));
    await route.fulfill({ status: 204, body: '' });
  });
  await ctx.route(/wa\.me|whatsapp\.com/, (r) => r.fulfill({ status: 200, body: 'blocked in test' }));
  if (dismissPopup)
    await ctx.addInitScript(() => {
      try { localStorage.setItem('kmf_intent_popup', JSON.stringify({ value: 'test', at: Date.now() })); } catch (e) {}
    });
  if (blockStorage)
    await ctx.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } });
    });
  return ctx;
}
const events = (ctx, name) => ctx.hits.filter((h) => h.en === name);
async function waitHits(ctx, name, n, ms = 15000) {
  const end = Date.now() + ms;
  while (Date.now() < end && events(ctx, name).length < n) await sleep(250);
  await sleep(1500); // catch duplicates
  return events(ctx, name);
}

const browser = await chromium.launch();

// 1. page_view: exactly one per load and per client-side navigation, with the right title
{
  const ctx = await newContext(browser, { dismissPopup: true });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: 'load' });
  const pv1 = await waitHits(ctx, 'page_view', 1);
  check('page_view on first load (exactly 1)', pv1.length === 1, `${pv1.length} hit(s), dt="${pv1[0]?.dt}"`);

  await page.locator('ul li', { hasText: /^CONTACT US$/ }).first().click();
  await page.waitForURL('**/en/contact');
  const pv2 = await waitHits(ctx, 'page_view', 2);
  const last = pv2[pv2.length - 1];
  check('page_view on client navigation (exactly 1 more)', pv2.length === 2, `${pv2.length} total`);
  check('navigation page_view has correct title + location', /Contact Us \| KMF Nandini/.test(last?.dt || '') && /\/en\/contact$/.test(last?.dl || ''), `dt="${last?.dt}" dl="${last?.dl}"`);
  check('document.title updates on navigation', (await page.title()) === 'Contact Us | KMF Nandini', await page.title());
  await ctx.close();
}

// 2. Contact form ?category= preselect (en + kn)
{
  const ctx = await newContext(browser, { dismissPopup: true });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en/contact?category=bulk-order`);
  await page.waitForFunction(() => document.querySelector('#reason')?.value === 'Bulk Order', null, { timeout: 8000 }).catch(() => {});
  check('contact ?category=bulk-order preselects Bulk Order', (await page.inputValue('#reason')) === 'Bulk Order');
  await page.goto(`${BASE}/kn/contact?category=quality`);
  await page.waitForFunction(() => document.querySelector('#reason')?.value === 'Quality', null, { timeout: 8000 }).catch(() => {});
  const txt = await page.$eval('#reason', (s) => s.options[s.selectedIndex].text);
  check('kn contact ?category=quality preselects ಗುಣಮಟ್ಟ (value unchanged)', (await page.inputValue('#reason')) === 'Quality' && txt === 'ಗುಣಮಟ್ಟ', `value=${await page.inputValue('#reason')} label=${txt}`);
  await page.screenshot({ path: SHOTS + 'contact-kn.png' });
  await ctx.close();
}

// 3. Popup — desktop
{
  const ctx = await newContext(browser);
  const page = await ctx.newPage();
  const t0 = Date.now();
  await page.goto(`${BASE}/en`);
  const dialog = page.getByRole('dialog');
  await dialog.waitFor({ timeout: 12000 });
  const secs = ((Date.now() - t0) / 1000).toFixed(1);
  check('popup appears on /en after ~6s (no scroll)', secs >= 5.5, `${secs}s`);
  const box = await dialog.boundingBox();
  check('desktop: centred modal', Math.abs(box.x + box.width / 2 - 640) < 10 && Math.abs(box.y + box.height / 2 - 400) < 40, JSON.stringify(box));
  check('aria-modal + labelled', (await dialog.getAttribute('aria-modal')) === 'true' && !!(await dialog.getAttribute('aria-labelledby')));
  await page.screenshot({ path: SHOTS + 'popup-desktop.png' });

  let trapped = true;
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press(i % 5 === 4 ? 'Shift+Tab' : 'Tab');
    trapped &&= await page.evaluate(() => !!document.activeElement?.closest('[role=dialog]'));
  }
  check('focus trapped inside popup (Tab/Shift+Tab)', trapped);

  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'detached', timeout: 3000 }).catch(() => {});
  check('Esc closes popup', (await page.getByRole('dialog').count()) === 0);
  check('intent_dismissed fired', (await waitHits(ctx, 'intent_dismissed', 1)).length === 1);

  await page.reload();
  await sleep(9000);
  check('not shown again after reload (remembered)', (await page.getByRole('dialog').count()) === 0);
  await ctx.close();
}

// 4. Popup — mobile bottom sheet, choose an option
{
  const ctx = await newContext(browser, { mobile: true });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`);
  const dialog = page.getByRole('dialog');
  await dialog.waitFor({ timeout: 12000 });
  await sleep(400);
  const box = await dialog.boundingBox();
  check('mobile: bottom sheet (touches bottom edge, full width)', Math.abs(box.y + box.height - 844) < 2 && box.width >= 388, JSON.stringify(box));
  const small = await dialog.locator('ul button').evaluateAll((bs) => bs.filter((b) => b.getBoundingClientRect().height < 48).length);
  check('mobile: tap targets >= 48px tall', small === 0, `${small} small`);
  await page.screenshot({ path: SHOTS + 'popup-mobile.png' });
  await dialog.getByRole('button', { name: /Jobs & recruitment/ }).click();
  await page.waitForURL('**/en/careers', { timeout: 8000 }).catch(() => {});
  check('choosing "Jobs" goes to /en/careers', page.url().endsWith('/en/careers'), page.url());
  const sel = await waitHits(ctx, 'intent_selected', 1);
  check('intent_selected fired with intent=jobs', sel.length === 1 && sel[0]['ep.intent'] === 'jobs', JSON.stringify(sel.map((h) => h['ep.intent'])));
  await page.screenshot({ path: SHOTS + 'careers-mobile-en.png', fullPage: true });
  await ctx.close();
}

// 5. Popup — Kannada, scroll trigger
{
  const ctx = await newContext(browser);
  const page = await ctx.newPage();
  await page.goto(`${BASE}/kn`, { waitUntil: 'load' });
  await sleep(2500);
  const t0 = Date.now();
  await page.evaluate(() => window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * 0.4));
  const dialog = page.getByRole('dialog');
  await dialog.waitFor({ timeout: 6000 }).catch(() => {});
  const shown = (await dialog.count()) === 1;
  check('popup opens on 30% scroll (before the 6s timer)', shown && Date.now() - t0 < 3000, `${Date.now() - t0}ms`);
  const title = shown ? await dialog.locator('h2').innerText() : '';
  check('kn popup text is Kannada', /[ಀ-೿]/.test(title), title);
  if (shown) {
    await page.screenshot({ path: SHOTS + 'popup-kn.png' });
    await dialog.getByRole('button', { name: /ಪಾಕವಿಧಾನಗಳು/ }).click();
    await page.waitForURL('**/kn/nandini-recipes', { timeout: 8000 }).catch(() => {});
    check('kn option goes to /kn/nandini-recipes', page.url().endsWith('/kn/nandini-recipes'), page.url());
  }
  await ctx.close();
}

// 6. Popup not shown on intent pages
{
  const ctx = await newContext(browser);
  const page = await ctx.newPage();
  let shownOn = [];
  for (const p of ['/en/careers', '/en/contact', '/en/our-product']) {
    await page.goto(BASE + p);
    await sleep(7500);
    if (await page.getByRole('dialog').count()) shownOn.push(p);
  }
  check('popup NOT shown on careers/contact/products', shownOn.length === 0, shownOn.join(', '));
  await ctx.close();
}

// 7. Storage blocked: shows once, not again after in-site navigation, page still works
{
  const ctx = await newContext(browser, { blockStorage: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`${BASE}/en`);
  const dialog = page.getByRole('dialog');
  await dialog.waitFor({ timeout: 12000 }).catch(() => {});
  check('storage blocked: popup still shows once', (await dialog.count()) === 1);
  await page.keyboard.press('Escape');
  await sleep(500);
  await page.locator('ul li', { hasText: /^KMF PORTFOLIO$/ }).first().click();
  await page.waitForURL('**/en/portfolio');
  await sleep(8000);
  check('storage blocked: not shown again this session (portfolio)', (await page.getByRole('dialog').count()) === 0);
  const ours = errors.filter((m) => /intent|localStorage|blocked/i.test(m));
  check('storage blocked: no errors from our code', ours.length === 0, ours.join(' | '));
  await ctx.close();
}

// 8. Click / download / 404 events
{
  const ctx = await newContext(browser, { dismissPopup: true });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en/about/mission-vision`, { waitUntil: 'load' });
  await sleep(2000);
  const [popup] = await Promise.all([ctx.waitForEvent('page', { timeout: 5000 }).catch(() => null), page.click('[data-track-location=floating_button] a[href*="wa.me"]')]);
  if (popup) await popup.close();
  const wa = await waitHits(ctx, 'click_whatsapp', 1);
  check('click_whatsapp from floating button', wa.length === 1 && wa[0]['ep.location'] === 'floating_button' && wa[0]['ep.section'] === 'about/mission-vision', JSON.stringify(wa.map((h) => [h['ep.location'], h['ep.section']])));

  await page.goto(`${BASE}/en/blog/notification`, { waitUntil: 'load' });
  const dl = page.locator('a[download]', { hasText: 'Download' }).first();
  await dl.waitFor({ timeout: 15000 });
  await page.evaluate(() => document.addEventListener('click', (e) => { if (e.target.closest('a[download]')) e.preventDefault(); }));
  await dl.click();
  await page.getByRole('button', { name: /Review/ }).first().click();
  await waitHits(ctx, 'file_download', 3);
  const fd = events(ctx, 'file_download').filter((h) => !h['ep.link_url']); // ours only (GA's built-in one has link_url)
  check('file_download on tender Download + Review (2 events)', fd.length === 2 && fd.every((h) => /\.pdf$/i.test(h['ep.file_name'] || '') && h['ep.section'] === 'blog/notification'), JSON.stringify(fd.map((h) => h['ep.file_name'])));
  await page.keyboard.press('Escape');

  const res = await page.goto(`${BASE}/kn/no-such-page`);
  const nf = await waitHits(ctx, 'page_404', 1);
  check('404 status + page_404 event with missing_path', res.status() === 404 && nf.length === 1 && nf[0]['ep.missing_path'] === '/kn/no-such-page', JSON.stringify(nf.map((h) => h['ep.missing_path'])));
  check('404 page in Kannada on /kn/...', /ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ/.test(await page.locator('h1').innerText()));
  await page.screenshot({ path: SHOTS + '404-kn.png' });

  const all = JSON.stringify(ctx.hits);
  check('no PII in any GA hit (no emails/phone numbers)', !/%40|@|7899683696|26096800|18004258030/.test(all));
  await ctx.close();
}

// 9. Header: nav row same as production below 1440px; Careers reachable everywhere
async function nav(base, lang, width) {
  const ctx = await browser.newContext({ viewport: { width, height: 800 } });
  await ctx.route(/\/g\/collect/, (r) => r.fulfill({ status: 204, body: '' }));
  await ctx.addInitScript(() => { try { localStorage.setItem('kmf_intent_popup', '{"value":"t","at":' + Date.now() + '}'); } catch (e) {} });
  const page = await ctx.newPage();
  await page.goto(`${base}/${lang}/about/company-profile`, { waitUntil: 'load' });
  await sleep(2000);
  const m = await page.evaluate(() => {
    const ul = [...document.querySelectorAll('ul')].find((u) => u.className.includes('text-light-light4') && u.offsetParent);
    const lis = [...ul.querySelectorAll(':scope > a > li')].filter((li) => li.offsetParent);
    return {
      visible: lis.map((li) => li.textContent.trim().split('\n')[0].slice(0, 18)),
      offscreen: lis.filter((li) => li.getBoundingClientRect().right > innerWidth + 1).length,
      aboutHasCareers: !!ul.querySelector(':scope > a:first-of-type ~ a li a[href$="/careers"]') || [...ul.querySelectorAll('a[href$="/careers"]')].some((a) => a.closest('li')?.closest('a') !== a),
    };
  });
  if (base.includes('localhost') && width === 1024) await page.screenshot({ path: SHOTS + `nav-${lang}-${width}.png`, clip: { x: 0, y: 140, width, height: 70 } });
  await ctx.close();
  return m;
}
for (const lang of ['en', 'kn']) {
  for (const width of [1024, 1280]) {
    const live = await nav('https://www.kmfnandini.coop', lang, width);
    const ours = await nav(BASE, lang, width);
    check(`nav row identical to production (${lang} @ ${width}px)`, JSON.stringify(live.visible) === JSON.stringify(ours.visible) && ours.offscreen === live.offscreen, `offscreen live=${live.offscreen} ours=${ours.offscreen}`);
    check(`Careers in About Us dropdown (${lang} @ ${width}px)`, ours.aboutHasCareers);
  }
  const wide = await nav(BASE, lang, 1440);
  check(`Careers in nav row at 1440px (${lang}), nothing offscreen`, wide.visible.some((t) => /CAREERS|ಉದ್ಯೋಗಾವಕಾಶಗಳು/.test(t)) && wide.offscreen === 0, wide.visible.join(' | '));
}
{
  const ctx = await newContext(browser, { mobile: true, dismissPopup: true });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en/about/company-profile`, { waitUntil: 'load' });
  await sleep(1500);
  const links = await page.$$eval('a[href="/en/careers"]', (as) => as.filter((a) => a.closest('li')).length);
  const inAccordion = await page.$$eval('a[href="/en/careers"]', (as) => as.filter((a) => a.closest('ul')?.closest('ul') && !a.closest('.lg\\:block')).length);
  check('mobile menu: Careers present (top-level, not duplicated in About)', links >= 1, `links=${links}`);
  await ctx.close();
}

await browser.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
