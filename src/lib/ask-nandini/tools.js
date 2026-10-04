import { strapiGet, blocksToText, mediaUrl } from './strapi';
import { searchIndex } from './search';
import { getJobs, toCard, todayIST } from '@/lib/careers';
import { careersText } from '@/configtext/careers';
import { CONTACT } from '@/lib/site';
import { complaintStatus } from '@/lib/forms/complaints';

// Tool definitions sent to Claude. Keep the order and text stable: they are
// part of the cached prompt prefix.
export const TOOL_DEFS = [
  {
    name: 'search_products',
    description:
      'Search the Nandini product catalogue (milk, curd, ghee, butter, paneer, sweets, ice creams, bakery, etc.). Returns product names, descriptions and the category page link. The catalogue does NOT contain prices or MRP. Write the query in English product words (e.g. "ghee", "toned milk", "badam").',
    input_schema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'English product words' } },
      required: ['query'],
      additionalProperties: false,
    },
  },
  {
    name: 'list_notifications',
    description:
      'Latest official KMF notices. type "tender" = tender notifications / EOIs with dates and PDF links; "news" = news and blog posts; "press" = the press release page. Tender titles are often generic, so use search_site to look inside tender PDFs for specifics.',
    input_schema: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['tender', 'news', 'press'] },
        limit: { type: 'integer', minimum: 1, maximum: 10 },
      },
      required: ['type'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_careers',
    description:
      'Official KMF recruitment notices (open, closed, results) from the Careers page, plus the official fake-recruitment warning. Use for ANY question about jobs, vacancies, recruitment, selection, appointment letters, fees or job offers.',
    input_schema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'list_milk_unions',
    description: 'List of the district co-operative milk unions under KMF, with links to their pages.',
    input_schema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'get_milk_union',
    description: 'Details about one district milk union (e.g. "Mysuru", "Bengaluru", "Hassan").',
    input_schema: {
      type: 'object',
      properties: { name: { type: 'string', description: 'Union or district name in English' } },
      required: ['name'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_contact_info',
    description:
      'The correct official contact channel for a topic: quality complaint, MRP/price issue, dealership or parlour, bulk order, product not available, dairy farmer, recruitment fraud report, or general.',
    input_schema: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          enum: ['quality', 'mrp', 'dealership', 'bulk_order', 'product_availability', 'farmer', 'recruitment_fraud', 'general'],
        },
      },
      required: ['topic'],
      additionalProperties: false,
    },
  },
  {
    name: 'search_site',
    description:
      'Search the text of the KMF website pages and notification PDFs (company profile, schemes, animal husbandry, procurement, quality, hostels, recipes, tenders, etc.). Use English keywords.',
    input_schema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'English keywords' } },
      required: ['query'],
      additionalProperties: false,
    },
  },
  {
    name: 'check_complaint_status',
    description:
      'Status of a complaint ticket filed on the KMF website (ticket numbers look like KMF-C-7K3PX9). Call this when a visitor gives a ticket number or asks about their complaint. Returns status, category and dates only, never personal details.',
    input_schema: {
      type: 'object',
      properties: { ticket: { type: 'string', description: 'Ticket number, e.g. KMF-C-7K3PX9' } },
      required: ['ticket'],
      additionalProperties: false,
    },
  },
  {
    name: 'flag_unanswered',
    description:
      'Call this (once, before your reply) when the tools do not contain the information needed to answer the question. It is only used to tell KMF which content is missing; the visitor does not see it.',
    input_schema: {
      type: 'object',
      properties: { topic: { type: 'string', description: 'Short English description of what was missing' } },
      required: ['topic'],
      additionalProperties: false,
    },
  },
];

const words = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFKC')
    .split(/[^\p{L}\p{M}\p{N}]+/u)
    .filter((w) => w.length > 1);

function score(haystack, query) {
  const text = String(haystack || '').toLowerCase();
  return words(query).reduce((n, w) => n + (text.includes(w) ? (w.length > 3 ? 2 : 1) : 0), 0);
}

const trim = (s, n) => {
  const t = String(s || '').replace(/\s+/g, ' ').trim();
  return t.length > n ? `${t.slice(0, n - 1)}…` : t;
};

// ---------- tool implementations ----------

async function searchProducts({ query }, ctx) {
  const items = await strapiGet('product-sub-items', { locale: 'en', populate: '*', 'pagination[pageSize]': 500 });
  const ranked = items
    .map((it) => {
      const a = it.attributes || {};
      const sub = a.subcategory?.data;
      const hay = `${a.name} ${a.description} ${sub?.attributes?.title}`;
      return { a, sub, s: score(hay, query) };
    })
    .filter((x) => x.s > 0)
    .sort((x, y) => y.s - x.s)
    .slice(0, 8);

  return {
    note: 'Prices/MRP are not published on the website.',
    results: ranked.map(({ a, sub }) => ({
      name: a.name,
      category: sub?.attributes?.title,
      description: trim(a.description, 220),
      link: sub ? `/${ctx.lang}/our-product/${sub.id}` : `/${ctx.lang}/our-product`,
    })),
    all_products_page: `/${ctx.lang}/our-product`,
  };
}

async function listNotifications({ type, limit = 5 }, ctx) {
  const n = Math.min(Math.max(parseInt(limit, 10) || 5, 1), 10);
  if (type === 'tender') {
    const items = await strapiGet('tender-notifications', {
      locale: 'en',
      populate: '*',
      'sort[0]': 'createdAt:desc',
      'pagination[pageSize]': n,
    });
    const today = todayIST();
    return {
      page: `/${ctx.lang}/blog/notification`,
      results: items.map((it) => {
        const a = it.attributes || {};
        return {
          title: a.title?.trim(),
          reference_no: a.c_no || undefined,
          start_date: a.start_date || undefined,
          last_date: a.last_date || undefined,
          status: a.last_date ? (a.last_date < today ? 'closed' : 'open') : 'unknown',
          pdf: mediaUrl(a.pdf_file) || undefined,
        };
      }),
    };
  }
  if (type === 'news') {
    const items = await strapiGet('blog-posts', {
      locale: 'en',
      populate: '*',
      'sort[0]': 'date:desc',
      'pagination[pageSize]': n,
    });
    return {
      page: `/${ctx.lang}/blog`,
      results: items.map((it) => ({
        title: it.attributes?.title,
        date: it.attributes?.date,
        summary: trim(blocksToText(it.attributes?.content), 200),
        link: `/${ctx.lang}/blog/${it.id}`,
      })),
    };
  }
  return {
    page: `/${ctx.lang}/blog/press-release`,
    note: 'Press releases are published as images on this page; their text is not available to the assistant.',
  };
}

async function getCareers(_input, ctx) {
  const today = todayIST();
  const jobs = getJobs().map((j) => toCard(j, ctx.lang, today));
  const t = careersText.en;
  return {
    careers_page: `/${ctx.lang}/careers`,
    open: jobs.filter((j) => j.status === 'open'),
    closed_or_results: jobs.filter((j) => j.status !== 'open').slice(0, 10),
    note:
      jobs.length === 0
        ? 'There are NO recruitment notices published on the KMF website right now.'
        : 'Only the notices listed here are official.',
    milk_union_recruitment:
      'District milk unions may recruit separately. This website does not publish their recruitment links; do not guess any.',
    fake_recruitment_warning: [...t.fraudPoints, t.fraudReport],
  };
}

async function milkUnions(ctx) {
  const items = await strapiGet('milk-unions', { locale: 'en', populate: '*', 'pagination[pageSize]': 50 });
  return items.map((it) => {
    const a = it.attributes || {};
    return {
      id: it.id,
      name: a.name?.trim(),
      link: `/${ctx.lang}/milk-union/${it.id}`,
      about: blocksToText(a.about),
    };
  });
}

async function listMilkUnions(_input, ctx) {
  const all = await milkUnions(ctx);
  return {
    page: `/${ctx.lang}/milk-union`,
    count: all.length,
    unions: all.map(({ name, link }) => ({ name, link })),
    note: 'Phone numbers, emails and websites of the unions are not published on this website.',
  };
}

async function getMilkUnion({ name }, ctx) {
  const all = await milkUnions(ctx);
  const best = all
    .map((u) => ({ u, s: score(u.name, name) }))
    .sort((a, b) => b.s - a.s)[0];
  if (!best || best.s === 0) return { found: false, page: `/${ctx.lang}/milk-union`, names: all.map((u) => u.name) };
  const u = best.u;
  return {
    found: true,
    name: u.name,
    link: u.link,
    about: trim(u.about, 1500),
    note: 'Phone numbers, emails and websites of the unions are not published on this website.',
  };
}

const CATEGORY_SLUG = {
  quality: 'quality',
  mrp: 'mrp',
  dealership: 'new-agency-parlour',
  bulk_order: 'bulk-order',
  product_availability: 'product-non-availability',
  general: 'others',
};

async function getContactInfo({ topic }, ctx) {
  const channels = {
    toll_free: '1800 425 8030',
    helpline: '080-260 96800',
    hours: '10:00 AM – 5:45 PM, except second & fourth Saturday, Sunday and State Government holidays',
    whatsapp: `+${CONTACT.whatsapp.slice(0, 2)} ${CONTACT.whatsapp.slice(2)}`,
    whatsapp_link: `https://wa.me/${CONTACT.whatsapp}`,
    email: CONTACT.email,
    address:
      'Karnataka Co-operative Milk Producers Federation Ltd, No 2915, D. R. College Post, Dr M H Marigowda Road, Bengaluru 560029',
  };
  if (topic === 'farmer') {
    return {
      ...channels,
      advice:
        'Dairy farmers are served through their village Dairy Co-operative Society and district milk union. There is no separate farmer contact form; use the general contact options.',
      pages: [`/${ctx.lang}/animal-husbandry/procurement`, `/${ctx.lang}/animal-husbandry/scheme`, `/${ctx.lang}/milk-union`],
    };
  }
  if (topic === 'recruitment_fraud') {
    return {
      ...channels,
      cybercrime: 'Report cyber fraud at cybercrime.gov.in or call 1930 (national cybercrime helpline).',
      careers_page: `/${ctx.lang}/careers`,
    };
  }
  const slug = CATEGORY_SLUG[topic] || 'others';
  const extra = {};
  if (topic === 'dealership') {
    extra.apply_online = `/${ctx.lang}/dealership`;
    extra.advice = 'The quickest way is the online application page: parlour, milk agency, distributor or franchise. No fee. The marketing team calls back, usually within 7 working days.';
  }
  if (topic === 'quality' || topic === 'mrp') {
    extra.complaint_page = `/${ctx.lang}/complaint`;
    extra.advice = 'Visitors can file a complaint online with a photo and get a ticket number (KMF-C-XXXXXX) to track it on that page or here in the chat.';
  }
  if (topic === 'product_availability') {
    extra.notify_me_page = `/${ctx.lang}/notify-me`;
    extra.advice = 'If the visitor is outside Karnataka or a product is not sold near them, suggest the "Notify me when available" page: they leave their PIN code and products, and KMF tells them when it becomes available. KMF uses these requests to plan expansion.';
  }
  return { ...channels, contact_form: `/${ctx.lang}/contact?category=${slug}`, ...extra };
}

async function checkComplaintStatus({ ticket }, ctx) {
  const s = await complaintStatus(ticket);
  if (s.invalid) return { found: false, note: 'Not a valid ticket number. Ticket numbers look like KMF-C-7K3PX9 (letters and digits).', complaint_page: `/${ctx.lang}/complaint` };
  if (!s.found) return { found: false, ticket: s.ticket, note: 'No complaint with this ticket number. Ask the visitor to check it; they can also look it up on the complaint page.', complaint_page: `/${ctx.lang}/complaint` };
  return { ...s, status_page: `/${ctx.lang}/complaint?ticket=${s.ticket}` };
}

async function searchSite({ query }, ctx) {
  return { results: searchIndex(query, ctx.lang, 5) };
}

const IMPL = {
  search_products: searchProducts,
  list_notifications: listNotifications,
  get_careers: getCareers,
  list_milk_unions: listMilkUnions,
  get_milk_union: getMilkUnion,
  get_contact_info: getContactInfo,
  search_site: searchSite,
  check_complaint_status: checkComplaintStatus,
  flag_unanswered: async ({ topic }) => ({ ok: true, topic }),
};

// Minimal validation against each tool's JSON schema (inputs are untrusted).
function validate(def, input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return 'input must be an object';
  const { properties = {}, required = [] } = def.input_schema;
  for (const r of required) if (input[r] === undefined || input[r] === '') return `missing ${r}`;
  for (const [k, v] of Object.entries(input)) {
    const p = properties[k];
    if (!p) return `unknown field ${k}`;
    if (p.type === 'string' && (typeof v !== 'string' || v.length > 300)) return `${k} must be a short string`;
    if (p.type === 'integer' && !Number.isInteger(v)) return `${k} must be an integer`;
    if (p.enum && !p.enum.includes(v)) return `${k} must be one of ${p.enum.join(', ')}`;
  }
  return null;
}

// Runs a tool call; always resolves to { content, isError }.
export async function runTool(name, input, ctx) {
  const def = TOOL_DEFS.find((t) => t.name === name);
  if (!def) return { content: `Unknown tool ${name}`, isError: true };
  const problem = validate(def, input);
  if (problem) return { content: `Invalid input: ${problem}`, isError: true };
  try {
    const out = await IMPL[name](input, ctx);
    return { content: JSON.stringify(out), isError: false };
  } catch (e) {
    return { content: 'The KMF data source is temporarily unavailable. Suggest the contact options.', isError: true };
  }
}
