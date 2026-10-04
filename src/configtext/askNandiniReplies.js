// Ask Nandini stored replies: common questions answered without calling Claude.
// Used only when a visitor's FIRST message matches one of `questions` exactly
// (ignoring capitals, spaces and ?!. at the end). Everything else goes to Claude.
//
// `text` replies are fixed (edit freely; Markdown: **bold**, [link](/en/...), "- " lists).
// `live` replies are built from current KMF data by src/lib/ask-nandini/stored.js,
// so they stay correct when careers, tenders or milk unions change.
// `match` (optional) is a regular expression tried after the exact `questions`
// list, against the lower-cased message with punctuation removed.
// `anytime: true` lets a reply match at ANY point in the conversation, not only
// the first message. Use it only for context-free messages (greetings, thanks).

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

If you were charged more than the MRP, you can [file a complaint](/en/complaint) and get a ticket number to track it.`,
  },
  {
    id: 'where_to_buy',
    questions: ['where can i buy nandini products', 'where to buy nandini products', 'where can i buy nandini', 'nandini parlour near me', 'nandini shop near me'],
    text: `Nandini products are sold at **Nandini parlours and outlets** across Karnataka. To find one near you, call toll-free **1800 425 8030** or the helpline **080-260 96800** (${HOURS}), or WhatsApp **[7899683696](https://wa.me/917899683696)**.

You can see the full range on the [Nandini Products](/en/our-product) page. Outside Karnataka, or a product missing near you? Use [Notify me when available](/en/notify-me) and KMF will tell you when it reaches your area.`,
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
    questions: ['how do i open a nandini parlour', 'how to open a nandini parlour', 'nandini parlour', 'nandini franchise', 'who do i contact for dealership', 'dealership', 'nandini dealership', 'nandini agency', 'franchise', 'franchisee', 'i want franchise', 'i want to sell nandini products', 'how to become a nandini distributor', 'distributorship'],
    text: `You can apply online on the [Nandini parlour, agency & dealership](/en/dealership) page: choose parlour, milk agency, distributor or franchise, add your location and contact details, and you get a reference number. There is no fee. The marketing team of KMF or your district milk union will call you, usually within 7 working days.

You can also call toll-free **1800 425 8030** (${HOURS}).`,
  },
  {
    id: 'quality_complaint',
    questions: ['how do i complain about quality', 'quality complaint', 'complaint', 'how to complain', 'i want to complain'],
    text: `Sorry about the trouble. Please [file a complaint](/en/complaint) on the website: choose the type of problem, describe it, attach a photo of the product or pack date if you can, and you get a **ticket number** (like KMF-C-7K3PX9) to track it, here in the chat or on that page.

You can also call toll-free **1800 425 8030** (${HOURS}), WhatsApp **[7899683696](https://wa.me/917899683696)** or email **customercare.nandini@kmf.coop**.`,
  },
  {
    id: 'mrp_complaint',
    questions: ['shop charged more than mrp', 'charged more than mrp', 'overcharged'],
    text: `You can report a shop charging more than the MRP by [filing a complaint](/en/complaint): choose "Charged more than MRP", give the shop's name and location, the product and the amount charged, and attach a photo of the bill if you have one. You get a ticket number to track it.

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

  {
    id: 'complaint_status',
    questions: ['check my complaint status', 'check complaint status', 'complaint status', 'track my complaint', 'status of my complaint', 'where is my complaint', 'my complaint status'],
    text: `Sure. Please type your **ticket number** (it looks like KMF-C-7K3PX9; it was shown when you filed the complaint). You can also check it on the [complaint page](/en/complaint#status).`,
  },
  {
    id: 'notify_me',
    questions: ['nandini is not available in my city', 'not available in my city', 'not available in my area', 'nandini not available near me', 'is nandini available outside karnataka', 'available outside karnataka', 'outside karnataka', 'do you deliver outside karnataka', 'can i order online', 'online order', 'online delivery', 'home delivery'],
    text: `Nandini products are sold mainly in Karnataka through parlours and outlets, and there is no online delivery yet. If you are outside Karnataka, or a product is not available near you, please use [Notify me when available](/en/notify-me): leave your PIN code and the products you want, and KMF will tell you when Nandini reaches your area. These requests also help KMF decide where to expand next.

For a Nandini outlet or distributor near you, call toll-free **1800 425 8030** (${HOURS}).`,
  },

  // ---------- Greetings & small talk (answered at any point in the chat) ----------
  {
    id: 'greeting',
    anytime: true,
    questions: ['hi', 'hello', 'hey', 'hii', 'hai', 'hlo', 'namaste', 'namaskara', 'namaskar', 'ನಮಸ್ಕಾರ', 'good morning', 'good afternoon', 'good evening', 'greetings'],
    match: /^(hi+|hello+|hey+|hai|hlo|helo|hola|yo|namaste|namaskar|namaskara|good (morning|afternoon|evening|night)|greetings)( there| sir| madam| nandini| team| kmf| all| everyone| dear)?$/,
    text: `Hello! 👋 I'm Ask Nandini, KMF's assistant. I can help with:

- **Nandini products** and where to buy them
- **Careers** and recruitment notices
- **Tenders** and notifications
- **Milk unions** and dairy farmer services
- **Bulk orders, parlours** and **complaints**

What would you like to know?`,
  },
  {
    id: 'thanks',
    anytime: true,
    questions: ['thanks', 'thank you', 'thank u', 'thankyou', 'thanku', 'thx', 'tq', 'ty', 'ok thanks', 'ok thank you', 'thank you so much', 'thanks a lot'],
    match: /^(ok+|okay|okk|great|fine|sure|good|nice|super|alright|got it|no|yes)?\s*(thanks?|thank (you|u)|thankyou|thanku|thx|thnx|thnks|tq|ty|tysm|thanks a lot)( (so|very) much| a lot| sir| madam| nandini| for (the|your) (help|info|information|reply))*$/,
    text: `You're welcome! 😊 If you have any other questions about Nandini products, where to buy them, careers, tenders or KMF services, just ask.`,
  },
  {
    id: 'acknowledgement',
    anytime: true,
    questions: ['ok', 'okay', 'okk', 'k', 'fine', 'sure', 'great', 'nice', 'cool', 'super', 'good', 'got it', 'alright', 'understood', 'noted', 'hmm', 'oh', 'ohk', 'ok sir'],
    match: /^(ok+|okay|okk|k|fine|sure|great|nice|cool|super|good|got it|alright|all right|understood|noted|hm+|oh+|ohk|okie|oky)( ok+| sir| madam| fine| good| great)?$/,
    text: `Is there anything else I can help you with? You can ask about Nandini products, where to buy them, careers, tenders, milk unions or how to contact KMF.`,
  },
  {
    id: 'goodbye',
    anytime: true,
    questions: ['bye', 'goodbye', 'good bye', 'see you', 'tata', 'ok bye', 'close', 'no thanks', 'nothing', 'ntg', 'no need', 'nothing else'],
    match: /^(ok+ |okay )?(bye+|goodbye|good bye|see you|see ya|cya|tata|ta ta|close|exit|quit|done|that'?s all|thats all|nothing( else| more)?|ntg|no need( right now| now)?|no thanks|no thank you|not now|no more)( sir| madam| thanks| thank you)?$/,
    text: `Goodbye, and thank you for visiting the KMF website! 👋 If you need anything later, I'm here on every page, or you can call toll-free **1800 425 8030** (${HOURS}).`,
  },
  {
    // Only as the FIRST message: later on, "yes" / "1" may answer something Claude asked.
    id: 'unclear',
    questions: ['yes', 'yes please', 'no', 'yeah', 'yup', 'nope', 'i', 'test', 'testing', 'help', 'question', 'query', 'ask', 'info', 'information', 'details', 'please', 'pls', 'sir', 'madam'],
    match: /^(\d{1,6}|[^a-z0-9]*)$/,
    text: `What would you like to know? You can ask me about:

- **Nandini products** and where to buy them
- **Prices (MRP)**, bulk orders and home delivery
- **Careers** and recruitment notices
- **Tenders** and notifications
- **Milk unions** and dairy farmer services
- **Complaints** and customer care

Type your question in your own words.`,
  },
];

export { FRAUD as STORED_FRAUD_NOTE, HOURS as STORED_HOURS };
