// Ask Nandini browser checks (GA4 hits are intercepted; nothing is sent to Google).
//   npm i --no-save playwright && npx playwright install chromium
//   node scripts/chat-check.mjs http://localhost:3000             (build with NEXT_PUBLIC_ASK_NANDINI=on)
//   node scripts/chat-check.mjs http://localhost:3000 --flag-off  (build with it off: nothing may load)
// Each run asks Claude one real question (about $0.005).
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = (process.argv.slice(2).find((a) => !a.startsWith('--')) || 'http://localhost:3000').replace(/\/$/, '');
const FLAG_OFF = process.argv.includes('--flag-off');
const SH = new URL('../.browser-check/', import.meta.url).pathname;
mkdirSync(SH, { recursive: true });

const results = [];
const check = (n, ok, info = '') => {
  results.push(ok);
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${info ? '  — ' + info : ''}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch();

async function ctxFor(mobile, { intent = 'dismissed' } = {}) {
  const c = await b.newContext(
    mobile ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } : { viewport: { width: 1366, height: 768 } }
  );
  c.hits = [];
  await c.route(/\/g\/collect/, async (r) => {
    const q = r.request();
    const base = Object.fromEntries(new URL(q.url()).searchParams);
    const lines = (q.postData() || '').split('\n').filter(Boolean);
    for (const l of lines.length ? lines : ['']) c.hits.push({ ...base, ...Object.fromEntries(new URLSearchParams(l)) });
    await r.fulfill({ status: 204, body: '' });
  });
  await c.addInitScript((value) => {
    Object.defineProperty(Navigator.prototype, 'webdriver', { get: () => false });
    Object.defineProperty(Navigator.prototype, 'userAgent', {
      get: () => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36',
    });
    if (value) try { localStorage.setItem('kmf_intent_popup', JSON.stringify({ value, at: Date.now() })); } catch (e) {}
  }, intent);
  return c;
}
const waitHits = async (c, name, ms = 12000) => {
  const end = Date.now() + ms;
  while (Date.now() < end && !c.hits.some((h) => h.en === name)) await sleep(250);
  return c.hits.filter((h) => h.en === name);
};

if (FLAG_OFF) {
  const c = await b.newContext({ viewport: { width: 1280, height: 800 } });
  const p = await c.newPage();
  const chatChunks = [];
  p.on('request', (r) => {
    if (/AskNandini|ask-nandini/i.test(r.url()) && !r.url().includes('/api/')) chatChunks.push(r.url());
  });
  await p.goto(`${BASE}/en`, { waitUntil: 'load' });
  await sleep(6000);
  check('flag off: no chat widget', (await p.getByRole('dialog', { name: 'Ask Nandini' }).count()) === 0 && (await p.getByRole('button', { name: 'Ask Nandini' }).count()) === 0);
  check('flag off: no chat code requested', chatChunks.length === 0, chatChunks.join(', '));
  const api = await p.request.post(`${BASE}/api/ask-nandini`, { data: { messages: [{ role: 'user', content: 'hi' }] } });
  check('flag off: API returns 404', api.status() === 404, String(api.status()));
  await b.close();
  console.log(`\n${results.filter(Boolean).length}/${results.length} passed`);
  process.exit(results.every(Boolean) ? 0 : 1);
}

// Desktop: opens by itself, chat, feedback, minimise, stays minimised
{
  const c = await ctxFor(false, { intent: 'tenders' });
  const p = await c.newPage();
  await p.goto(`${BASE}/en`, { waitUntil: 'load' });
  const intro = p.locator('[data-kmf-intro]').getByText('Velozity Global Solutions');
  await intro.waitFor({ timeout: 15000 });
  const ib = await intro.boundingBox();
  check('intro "Powered by Velozity Global Solutions" shown in the middle first', Math.abs(ib.x + ib.width / 2 - 683) < 40 && Math.abs(ib.y - 384) < 120, JSON.stringify(ib));
  const dlg = p.getByRole('dialog', { name: 'Ask Nandini' });
  await dlg.waitFor({ timeout: 15000 });
  await sleep(600);
  const box = await dlg.boundingBox();
  check('desktop: then opens bottom-right, below the menu', box.x + box.width > 1366 - 40 && box.y >= 200 && box.width === 370, JSON.stringify(box));
  const fl = await p.locator('[data-track-location=floating_button]').boundingBox();
  check('WhatsApp/call buttons on the left', fl.x < 40, JSON.stringify(fl));
  check('desktop: auto-open does not steal focus', !(await p.evaluate(() => !!document.activeElement?.closest('[role=dialog]'))));
  check('shows privacy notice and "Powered by Velozity" UTM link', (await dlg.getByText(/may make mistakes/).isVisible()) && (await dlg.getByRole('link', { name: 'Velozity' }).getAttribute('href')).includes('utm_source=kmfnandini'));
  check('home page: chips follow popup choice ("tenders")', (await dlg.getByRole('button', { name: 'Show the latest tenders' }).count()) === 1);
  await p.screenshot({ path: SH + 'chat-desktop-open.png' });

  await dlg.getByRole('button', { name: 'Show the latest tenders' }).click();
  await dlg.getByText('Was this helpful?').waitFor({ timeout: 60000 });
  check('answer streamed with a link', (await dlg.locator('[role=log] a').count()) >= 1);
  await p.screenshot({ path: SH + 'chat-desktop-answer.png' });
  await dlg.getByRole('button', { name: 'Yes, helpful' }).click();
  check('feedback accepted', await dlg.getByText(/Thanks for your feedback/).isVisible());

  const ga = async (n) => (await waitHits(c, n)).length > 0;
  const gaOk = (await ga('chat_open')) && (await ga('chat_message_sent')) && (await ga('chat_tool_used')) && (await ga('chat_feedback'));
  check('GA: chat_open, chat_message_sent, chat_tool_used, chat_feedback', gaOk, [...new Set(c.hits.map((h) => h.en).filter((e) => /^chat_/.test(e)))].join(','));
  check('GA: chat_open trigger=auto', c.hits.some((h) => h.en === 'chat_open' && h['ep.trigger'] === 'auto'));
  check('GA: no message text in chat events', !JSON.stringify(c.hits.filter((h) => /^chat_/.test(h.en))).toLowerCase().includes('latest tenders'));

  await dlg.locator('textarea').focus();
  await p.keyboard.press('Escape');
  await sleep(400);
  const bubble = p.getByRole('button', { name: 'Ask Nandini' });
  check('Esc minimises to the pulsing bubble', (await p.getByRole('dialog').count()) === 0 && (await bubble.isVisible()));
  await p.reload({ waitUntil: 'load' });
  await sleep(5000);
  check('stays minimised for the rest of the visit', (await p.getByRole('dialog').count()) === 0 && (await bubble.isVisible()));
  check('minimised bubble uses the AI sparkle icon, bottom-right', (await bubble.boundingBox()).x > 1366 - 100);
  await bubble.click();
  await p.locator('[data-kmf-intro]').waitFor({ timeout: 3000 });
  await dlg.waitFor();
  await sleep(400);
  check('bubble reopens chat with history and focus in input', (await dlg.getByText('Show the latest tenders').count()) >= 1 && (await p.evaluate(() => document.activeElement?.id === 'ask-nandini-input')));
  await dlg.getByRole('button', { name: 'Clear chat' }).click();
  check('clear chat', (await dlg.getByText('Show the latest tenders', { exact: true }).count()) <= 1);
  await c.close();
}

// Mobile: small greeting dialog, then full screen
{
  const c = await ctxFor(true);
  const p = await c.newPage();
  await p.goto(`${BASE}/en/careers`, { waitUntil: 'load' });
  const dlg = p.getByRole('dialog', { name: 'Ask Nandini' });
  await dlg.waitFor({ timeout: 15000 });
  await sleep(600);
  const t = await dlg.boundingBox();
  const floating = await p.locator('[data-track-location=floating_button]').boundingBox();
  check('mobile: small greeting dialog on the right, not covering WhatsApp/call', t.width <= 300 && t.height < 320 && floating.x + floating.width < t.x, JSON.stringify(t));
  check('mobile: careers page chips', (await dlg.getByRole('button', { name: /vacancies/i }).count()) === 1);
  await p.screenshot({ path: SH + 'chat-mobile-teaser.png' });
  await dlg.getByRole('button', { name: /Type your question/ }).click();
  await sleep(800);
  const full = await p.getByRole('dialog', { name: 'Ask Nandini' }).boundingBox();
  check('mobile: expands to full screen', full.x === 0 && full.y === 0 && full.width === 390 && full.height === 844, JSON.stringify(full));
  let trapped = true;
  for (let i = 0; i < 8; i++) {
    await p.keyboard.press('Tab');
    trapped &&= await p.evaluate(() => !!document.activeElement?.closest('[role=dialog]'));
  }
  check('mobile full screen keeps focus inside', trapped);
  await p.screenshot({ path: SH + 'chat-mobile-full.png' });
  await c.close();
}

// The intent popup never opens over an active conversation (a chat already in
// progress in this tab); it may still appear over an idle chat card by design.
{
  const c = await ctxFor(false, { intent: '' });
  await c.addInitScript(() => {
    try {
      sessionStorage.setItem('kmf_ask_nandini_intro', 'true');
      sessionStorage.setItem('kmf_ask_nandini_chat', JSON.stringify([{ id: 'a', role: 'user', content: 'hello' }, { id: 'b', role: 'assistant', content: 'Hi! How can I help?' }]));
    } catch (e) {}
  });
  const p = await c.newPage();
  await p.goto(`${BASE}/en`, { waitUntil: 'load' });
  await p.getByRole('dialog', { name: 'Ask Nandini' }).waitFor({ timeout: 15000 });
  await sleep(8000);
  check('intent popup did not open while chatting', (await p.getByRole('dialog').count()) === 1);
  await c.close();
}

await b.close();
console.log(`\n${results.filter(Boolean).length}/${results.length} passed`);
process.exit(results.every(Boolean) ? 0 : 1);
