// Site-wide constants used by metadata, JSON-LD, sitemap and contact buttons.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kmfnandini.coop').replace(/\/$/, '');
export const LOCALES = ['en', 'kn'];

export const BRAND = { en: 'KMF Nandini', kn: 'ಕಹಾಮ ನಂದಿನಿ' };
export const ORG_NAME = 'Karnataka Co-operative Milk Producers Federation Ltd (KMF)';

// Copy of src/images/logo/logo.png at a stable public URL (for JSON-LD and link previews).
export const LOGO_PATH = '/brand/kmf-nandini-logo.png';

// Same numbers and address as the contact page and the Strapi footer.
export const CONTACT = {
  phone: '+91-80-26096800',
  tollFree: '+91-1800-425-8030', // international format, for JSON-LD
  tollFreeDial: '18004258030', // Indian toll-free numbers are dialled without +91
  whatsapp: '917899683696',
  email: 'customercare.nandini@kmf.coop',
  address: {
    streetAddress: 'No 2915, D. R. College Post, Dr M H Marigowda Road',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560029',
    addressCountry: 'IN',
  },
};

export const SOCIAL_LINKS = [
  'https://www.facebook.com/kmfnandini.coop',
  'https://www.instagram.com/kmfnandini.coop',
  'https://www.youtube.com/@kmfnandini12',
  'https://twitter.com/kmfnandinimilk',
];
