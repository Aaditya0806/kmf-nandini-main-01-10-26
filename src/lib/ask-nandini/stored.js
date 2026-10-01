import { STORED_REPLIES, STORED_FRAUD_NOTE } from '@/configtext/askNandiniReplies';
import { runTool } from './tools';
import { strapiGet } from './strapi';
import { formatDate } from '@/lib/careers';

// Answers common first questions from stored replies instead of calling Claude.

const normalise = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[?!.。,]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const INDEX = new Map();
for (const r of STORED_REPLIES) for (const q of r.questions) INDEX.set(normalise(q), r);

// Only the visitor's first message: later ones ("yes", "that one") depend on context.
export function matchStored(history) {
  if (history.length !== 1 || history[0].role !== 'user') return null;
  return INDEX.get(normalise(history[0].content)) || null;
}

const short = (t, n = 110) => {
  const x = String(t || '').replace(/\s+/g, ' ').trim();
  return x.length > n ? `${x.slice(0, n - 1).trim()}…` : x;
};
// "NANDINI DELHI COW MILK" -> "Nandini Delhi Cow Milk" (mixed-case names left alone)
const tidy = (n) => (n === n.toUpperCase() ? n.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) : n);
// First two sentences, at most ~350 characters.
const intro = (text) => {
  // A sentence ends at . ! ? followed by a space and a capital letter (so "23.11.1976" stays whole).
  const parts = String(text || '').replace(/\s+/g, ' ').split(/(?<=[.!?])\s+(?=[A-Z“"])/);
  // Re-join pieces split at abbreviations such as "Ltd." / "Co." / "No." / "Dr.".
  const sentences = [];
  for (const p of parts) {
    const prev = sentences[sentences.length - 1];
    if (prev && /\b(Ltd|Co|No|Dr|Pvt|St|Sri|Smt)\.$/i.test(prev.trim())) sentences[sentences.length - 1] = `${prev} ${p}`;
    else sentences.push(p);
  }
  return short(sentences.slice(0, 2).join(' ').trim(), 350);
};

const data = async (tool, input = {}) => {
  const r = await runTool(tool, input, { lang: 'en' });
  if (r.isError) throw new Error(`${tool} failed`);
  return JSON.parse(r.content);
};

// Live replies: built from current KMF data (same sources Claude's tools use).
const LIVE = {
  async vacancies() {
    const c = await data('get_careers');
    if (!c.open.length)
      return `There is **no recruitment notice** on the KMF website right now. New vacancies are published only on the [Careers](/en/careers) page, so please check there regularly.\n\n${STORED_FRAUD_NOTE}`;
    const list = c.open
      .slice(0, 6)
      .map((j) => `- **${j.title}**${j.vacancies ? ` (${j.vacancies} posts)` : ''}${j.lastDate ? ` — last date ${formatDate(j.lastDate, 'en')}` : ''}: [details](/en/careers/${j.slug})`)
      .join('\n');
    return `These recruitment notices are open on the KMF website:\n\n${list}\n\nRead the full notification before applying. ${STORED_FRAUD_NOTE}`;
  },

  async how_to_apply() {
    const c = await data('get_careers');
    if (!c.open.length)
      return `There is **no open recruitment notice** on the KMF website right now, so there is nothing to apply for at the moment. When KMF announces recruitment, the notice with full instructions on how to apply will be published on the [Careers](/en/careers) page.\n\n${STORED_FRAUD_NOTE}`;
    return `Open the notice on the [Careers](/en/careers) page, read the official notification (PDF) fully, then use its **Apply** button, which takes you to the official application site. Follow the steps, fees and documents listed in the notification.\n\n${STORED_FRAUD_NOTE}`;
  },

  async products() {
    const cats = (await strapiGet('categories', { locale: 'en', 'sort[0]': 'order:asc', 'pagination[pageSize]': 50 }))
      .map((c) => c.attributes?.title)
      .filter(Boolean);
    if (!cats.length) return null;
    return `Nandini products come in these categories:\n\n${cats.map((c) => `- ${c}`).join('\n')}\n\nSee every product on the [Nandini Products](/en/our-product) page. Prices aren't published on the website; check at a Nandini parlour or call toll-free **1800 425 8030**.`;
  },

  async milk_types() {
    const items = await strapiGet('product-sub-items', { locale: 'en', populate: 'subcategory', 'pagination[pageSize]': 500 });
    const milks = items.filter((i) => /^milk$/i.test(i.attributes?.subcategory?.data?.attributes?.title || ''));
    if (!milks.length) return null;
    const subId = milks[0].attributes.subcategory.data.id;
    const names = [...new Set(milks.map((m) => tidy(m.attributes.name?.trim() || '')).filter(Boolean))];
    return `Nandini milk varieties:\n\n${names.map((n) => `- ${n}`).join('\n')}\n\nSee them on the [Milk](/en/our-product/${subId}) products page.`;
  },

  async tenders() {
    const t = await data('list_notifications', { type: 'tender', limit: 8 });
    if (!t.results?.length) return null;
    const line = (r) =>
      `- **${short(r.title)}**${r.reference_no ? ` (${r.reference_no})` : ''}${r.last_date ? ` — last date ${formatDate(r.last_date, 'en')}` : ''}${r.pdf ? ` — [PDF](${r.pdf})` : ''}`;
    const open = t.results.filter((r) => r.status === 'open');
    const closed = t.results.filter((r) => r.status !== 'open').slice(0, Math.max(2, 5 - open.length));
    const parts = [];
    if (open.length) parts.push(`**Open now:**\n${open.map(line).join('\n')}`);
    else parts.push('There is **no open tender** at the moment.');
    if (closed.length) parts.push(`**Recently closed:**\n${closed.map(line).join('\n')}`);
    return `${parts.join('\n\n')}\n\nSee all tenders on the [Notifications & Tenders](/en/blog/notification) page.`;
  },

  async milk_unions() {
    const u = await data('list_milk_unions');
    if (!u.count) return null;
    const list = u.unions.map((x) => `[${x.name.replace(/ (Co-operative )?Milk (Producers'? )?(Societies )?Union.*$/i, '')}](${x.link})`).join(', ');
    return `There are **${u.count} district milk unions** under KMF:\n\n${list}.\n\nSee the [Milk Unions](/en/milk-union) page for details.`;
  },

  async mysuru_union() {
    const u = await data('get_milk_union', { name: 'Mysuru' });
    if (!u.found) return null;
    return `**${u.name}**\n\n${intro(u.about)}\n\nRead more on the [union's page](${u.link}).`;
  },
};

// Returns { id, text } or null (null = let Claude answer).
export async function storedReply(history) {
  const r = matchStored(history);
  if (!r) return null;
  if (r.text) return { id: r.id, text: r.text };
  try {
    const text = await LIVE[r.live]?.();
    return text ? { id: r.id, text } : null;
  } catch (e) {
    return null; // data source down: fall back to Claude
  }
}
