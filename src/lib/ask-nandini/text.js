// Privacy scrubbing and language detection for Ask Nandini.

// Replace anything that looks like personal data before a question is logged.
// Order matters: emails and Aadhaar before generic phone numbers.
// KMF's own published contact details are not personal data: keep them readable.
const KMF_CONTACTS = ['customercare.nandini@kmf.coop', '7899683696', '1800 425 8030', '18004258030', '080-260 96800', '26096800'];

export function scrubPII(text = '') {
  const kept = [];
  let t = String(text);
  KMF_CONTACTS.forEach((c, i) => {
    t = t.split(c).join(`\u0000${i}\u0000`);
    kept[i] = c;
  });
  return scrubOthers(t).replace(/\u0000(\d+)\u0000/g, (_, i) => kept[i]);
}

function scrubOthers(text) {
  return String(text)
    .replace(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g, '[email]')
    .replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, '[aadhaar]') // 12 digits, 4-4-4
    .replace(/\b[A-Z]{5}\d{4}[A-Z]\b/gi, '[pan]')
    .replace(/(\+?91[\s-]?)?(\b0?[6-9]\d{4}[\s-]?\d{5}\b)/g, '[phone]') // Indian mobiles
    .replace(/\b0\d{2,4}[\s-]?\d{6,8}\b/g, '[phone]') // landlines with STD code
    .replace(/\b\d{10,}\b/g, '[number]');
}

const SCRIPTS = [
  ['kn', /[ಀ-೿]/g],
  ['hi', /[ऀ-ॿ]/g], // Devanagari (Hindi, Marathi)
  ['ta', /[஀-௿]/g],
  ['te', /[ఀ-౿]/g],
  ['ml', /[ഀ-ൿ]/g],
];

// Common Kannada / Tamil / Hindi words typed in English letters.
const ROMANIZED = {
  'kn-latn': /\b(yenu|enu|hege|beku|illa|ide|idya|nimma|nanna|hesaru|haalu|halu|bele|yelli|elli|madodu|kodi|beda|swalpa|thumba|gottilla|sigutte)\b/i,
  'ta-latn': /\b(enna|epdi|eppadi|irukku|venum|vendum|illai|paal|vilai|enga|sollunga)\b/i,
  'hi-latn': /\b(kya|kaise|kaha|kahan|hai|nahi|chahiye|kitna|kitne|doodh|daam|batao|mujhe)\b/i,
};

// Returns 'kn' | 'hi' | 'ta' | 'te' | 'ml' | 'kn-latn' | 'ta-latn' | 'hi-latn' | 'en'.
export function detectLang(text = '') {
  let best = null;
  let bestCount = 0;
  for (const [code, re] of SCRIPTS) {
    const n = (text.match(re) || []).length;
    if (n > bestCount) {
      best = code;
      bestCount = n;
    }
  }
  if (best) return best;
  for (const [code, re] of Object.entries(ROMANIZED)) if (re.test(text)) return code;
  return 'en';
}
