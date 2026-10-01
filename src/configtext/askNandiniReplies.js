// Ask Nandini stored replies: common questions answered without calling Claude.
// Used only when a visitor's FIRST message matches one of `questions` exactly
// (ignoring capitals, spaces and ?!. at the end). Everything else goes to Claude.
//
// `text` replies are fixed (edit freely; Markdown: **bold**, [link](/en/...), "- " lists).
// `live` replies are built from current KMF data by src/lib/ask-nandini/stored.js,
// so they stay correct when careers, tenders or milk unions change.

const HOURS = '10:00 AM – 5:45 PM, except second and fourth Saturday, Sunday and State Government holidays';
const FRAUD =
  '**Please note:** KMF never asks for money for jobs through personal bank accounts, UPI, wallets or agents, and only notices on the official [Careers](/en/careers) page are genuine.';

export const STORED_REPLIES = [
  // ---------- Jobs ----------
  {
    id: 'vacancies',
    questions: ['any current vacancies', 'any vacancies', 'current vacancies', 'any job vacancies', 'job vacancies', 'vacancies', 'jobs', 'any jobs', 'recruitment'],
    live: 'vacancies',
  },
  {
    id: 'how_to_apply',
    questions: ['how do i apply', 'how to apply', 'how can i apply', 'how to apply for kmf jobs'],
    live: 'how_to_apply',
  },
  {
    id: 'job_offer_real',
    questions: ['is a job offer i got real', 'is this job offer real', 'is the job offer real'],
    text: `KMF recruitment is announced **only** through official notices on the [Careers](/en/careers) page. If you got a job offer, selection message or appointment letter by phone, WhatsApp, SMS, email or social media that isn't listed there, treat it as **fraud**.

- Don't pay any money (registration, training, deposit or "processing" fees).
- Don't share OTPs, bank details or original documents.
- Report it at **cybercrime.gov.in** or call **1930**, and inform KMF on toll-free **1800 425 8030**.

KMF never asks for money for jobs through personal bank accounts, UPI, wallets or agents.`,
  },

  // ---------- Products & prices ----------
  {
    id: 'prices',
    questions: ['nandini ghee prices', 'nandini ghee price', 'ghee price', 'nandini milk price', 'nandini prices', 'price list', 'mrp'],
    text: `Nandini product prices (MRP) are not published on the KMF website. Please check at your nearest Nandini parlour or outlet, or call toll-free **1800 425 8030** (${HOURS}).

If you were charged more than the MRP, you can report it using the [contact form (MRP related)](/en/contact?category=mrp).`,
  },
  {
    id: 'where_to_buy',
    questions: ['where can i buy nandini products', 'where to buy nandini products', 'where can i buy nandini', 'nandini parlour near me', 'nandini shop near me'],
    text: `Nandini products are sold at **Nandini parlours and outlets** across Karnataka. To find one near you, call toll-free **1800 425 8030** or the helpline **080-260 96800** (${HOURS}), or WhatsApp **[7899683696](https://wa.me/917899683696)**.

You can see the full range on the [Nandini Products](/en/our-product) page.`,
  },
  { id: 'products', questions: ['what nandini products are there', 'nandini products', 'what products do you have', 'product list'], live: 'products' },
  { id: 'milk_types', questions: ['what types of milk are there', 'types of milk', 'what milk types are there', 'nandini milk types'], live: 'milk_types' },

  // ---------- Tenders ----------
  { id: 'tenders', questions: ['show the latest tenders', 'latest tenders', 'tenders', 'tender notifications', 'show tenders'], live: 'tenders' },
  {
    id: 'tender_pdfs',
    questions: ['where are tender pdfs', 'where are the tender pdfs', 'tender pdf'],
    text: `All KMF tender notifications and their PDFs are on the [Notifications & Tenders](/en/blog/notification) page. Use **Review** to preview a PDF or **Download** to save it.`,
  },

  // ---------- Milk unions ----------
  { id: 'milk_union_count', questions: ['how many milk unions are there', 'how many milk unions', 'milk unions', 'list of milk unions'], live: 'milk_unions' },
  { id: 'mysuru_union', questions: ['tell me about mysuru milk union', 'mysuru milk union', 'mysore milk union', 'mymul'], live: 'mysuru_union' },

  // ---------- Business & contact ----------
  {
    id: 'bulk_order',
    questions: ['i want to place a bulk order', 'bulk order', 'how to place a bulk order', 'bulk orders'],
    text: `To place a bulk order for Nandini products (events, weddings, institutions, hotels):

- Send your requirement using the [contact form (bulk order)](/en/contact?category=bulk-order)
- Or call toll-free **1800 425 8030** (${HOURS})
- Or WhatsApp **[7899683696](https://wa.me/917899683696)**

Mention the products, quantities, date and location, and the team will get back to you.`,
  },
  {
    id: 'parlour',
    questions: ['how do i open a nandini parlour', 'how to open a nandini parlour', 'nandini parlour', 'nandini franchise', 'who do i contact for dealership', 'dealership', 'nandini dealership', 'nandini agency'],
    text: `To apply for a Nandini parlour, agency or dealership, send your enquiry using the [contact form (new agency/parlour)](/en/contact?category=new-agency-parlour), or call toll-free **1800 425 8030** (${HOURS}).

Include your location and contact details in the form so the team can guide you on the process.`,
  },
  {
    id: 'quality_complaint',
    questions: ['how do i complain about quality', 'quality complaint', 'complaint', 'how to complain', 'i want to complain'],
    text: `Sorry about the trouble. Please report the quality issue using the [contact form (quality)](/en/contact?category=quality) and mention the product, pack date or batch code if you have it, and where you bought it.

You can also call toll-free **1800 425 8030** (${HOURS}), WhatsApp **[7899683696](https://wa.me/917899683696)** or email **customercare.nandini@kmf.coop**.`,
  },
  {
    id: 'mrp_complaint',
    questions: ['shop charged more than mrp', 'charged more than mrp', 'overcharged'],
    text: `You can report a shop charging more than the MRP using the [contact form (MRP related)](/en/contact?category=mrp). Please mention the shop's name and location, the product and the amount charged.

You can also call toll-free **1800 425 8030** (${HOURS}).`,
  },
  {
    id: 'customer_care',
    questions: ['how do i contact customer care', 'customer care number', 'customer care', 'contact number', 'helpline number', 'toll free number', 'contact kmf'],
    text: `You can reach Nandini customer care:

- Toll-free: **1800 425 8030**
- Helpline: **080-260 96800**
- WhatsApp: **[7899683696](https://wa.me/917899683696)**
- Email: **customercare.nandini@kmf.coop**
- [Contact form](/en/contact)

Hours: ${HOURS}.`,
  },

  // ---------- Greetings ----------
  {
    id: 'greeting',
    questions: ['hi', 'hello', 'hey', 'hii', 'hai', 'namaste', 'namaskara', 'good morning', 'good afternoon', 'good evening'],
    text: `Hello! 👋 I'm Ask Nandini, KMF's assistant. I can help with:

- **Nandini products** and where to buy them
- **Careers** and recruitment notices
- **Tenders** and notifications
- **Milk unions** and dairy farmer services
- **Bulk orders, parlours** and **complaints**

What would you like to know?`,
  },
];

export { FRAUD as STORED_FRAUD_NOTE, HOURS as STORED_HOURS };
