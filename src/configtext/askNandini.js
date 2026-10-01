// Ask Nandini chat text (English only for now) and suggested questions.

export const ASK_TEXT = {
  launcher: 'Ask Nandini',
  title: 'Ask Nandini',
  subtitle: 'AI assistant · Online',
  botName: 'Nandini · AI assistant',
  greeting: 'Hi there! 👋',
  welcome:
    "I'm Nandini, KMF's AI assistant. Ask me about Nandini products, tenders, careers, milk unions or how to reach customer care.",
  teaser: 'Hi! 👋 Need help? Ask me about Nandini products, tenders or jobs.',
  notice: "AI assistant — may make mistakes. Official notices on this site prevail. Don't share personal details.",
  minimize: 'Minimise chat',
  expand: 'Open full chat',
  poweredBy: 'Powered by',
  poweredName: 'Velozity Global Solutions',
  introTitle: 'Ask Nandini',
  introSubtitle: 'AI assistant',
  poweredUrl: 'https://www.velozityglobal.com/case-studies/kmf-nandini/?utm_source=kmfnandini&utm_medium=referral&utm_campaign=footer_credit',
  placeholder: 'Type your question…',
  send: 'Send',
  close: 'Close chat',
  clear: 'Clear chat',
  mic: 'Speak your question',
  micStop: 'Stop listening',
  listening: 'Listening…',
  thinking: 'Checking KMF information…',
  helpful: 'Was this helpful?',
  thanks: 'Thanks for your feedback!',
  tooLong: (n) => `Please keep your question under ${n} characters.`,
  offline: "Sorry, I can't connect right now. Please call toll-free 1800 425 8030.",
};

// First path segment after /en or /kn -> suggested questions.
export const PAGE_CHIPS = [
  { match: /^\/careers/, chips: ['Any current vacancies?', 'How do I apply?', 'Is a job offer I got real?'] },
  { match: /^\/our-product/, chips: ['Nandini ghee prices?', 'Where can I buy Nandini products?', 'What types of milk are there?'] },
  { match: /^\/blog\/notification/, chips: ['Show the latest tenders', 'Any tender for cattle feed?', 'Where are tender PDFs?'] },
  { match: /^\/contact/, chips: ['How do I complain about quality?', 'I want to place a bulk order', 'How do I open a Nandini parlour?'] },
  { match: /^\/animal-husbandry/, chips: ['How can I sell my milk to KMF?', 'What schemes are there for farmers?', 'Is there cattle insurance?'] },
  { match: /^\/milk-union/, chips: ['How many milk unions are there?', 'Tell me about Mysuru milk union'] },
  { match: /^\/nandini-recipes/, chips: ['A recipe with Nandini ghee', 'Easy sweet recipes'] },
];

// The visitor's answer in the "What brings you here today?" popup -> chips.
export const INTENT_CHIPS = {
  jobs: ['Any current vacancies?', 'How do I apply?', 'Is a job offer I got real?'],
  buy_products: ['Where can I buy Nandini products?', 'What types of milk are there?', 'Nandini ghee prices?'],
  dealership: ['How do I open a Nandini parlour?', 'Who do I contact for dealership?'],
  bulk_order: ['I want to place a bulk order', 'Customer care number?'],
  dairy_farmer: ['How can I sell my milk to KMF?', 'What schemes are there for farmers?'],
  tenders: ['Show the latest tenders', 'Any tender for cattle feed?'],
  recipes: ['A recipe with Nandini ghee', 'Easy sweet recipes'],
  complaint: ['How do I complain about quality?', 'Shop charged more than MRP'],
};

export const DEFAULT_CHIPS = ['What Nandini products are there?', 'Any current vacancies?', 'Show the latest tenders', 'How do I contact customer care?'];

// Page-specific chips first; on general pages, the visitor's popup choice; else a mix.
export function chipsFor(pathname = '', intent = '') {
  const route = pathname.replace(/^\/(en|kn)(?=\/|$)/, '');
  return PAGE_CHIPS.find((p) => p.match.test(route))?.chips || (intent && INTENT_CHIPS[intent]) || DEFAULT_CHIPS;
}
