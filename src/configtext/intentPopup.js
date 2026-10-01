// "What brings you here today?" popup: options, destinations and where it may appear.
// Edit freely: `id` is what GA4 receives as `intent`; `path` is relative to /{lang}
// (null = just close the popup).
export const INTENT_OPTIONS = [
  { id: 'jobs', path: '/careers', en: 'Jobs & recruitment', kn: 'ಉದ್ಯೋಗ ಮತ್ತು ನೇಮಕಾತಿ' },
  { id: 'buy_products', path: '/our-product', en: 'Buy Nandini products / prices', kn: 'ನಂದಿನಿ ಉತ್ಪನ್ನಗಳು / ಬೆಲೆಗಳು' },
  {
    id: 'dealership',
    path: '/contact?category=new-agency-parlour',
    en: 'Dealership / parlour / franchise',
    kn: 'ಡೀಲರ್‌ಶಿಪ್ / ಪಾರ್ಲರ್ / ಫ್ರಾಂಚೈಸಿ',
  },
  { id: 'bulk_order', path: '/contact?category=bulk-order', en: 'Bulk order', kn: 'ಸಗಟು ಖರೀದಿ (ಬಲ್ಕ್ ಆರ್ಡರ್)' },
  {
    id: 'dairy_farmer',
    path: '/animal-husbandry/procurement',
    en: "I'm a dairy farmer (procurement, schemes)",
    kn: 'ನಾನು ಹೈನುಗಾರ (ಹಾಲು ಶೇಖರಣೆ, ಯೋಜನೆಗಳು)',
  },
  { id: 'tenders', path: '/blog/notification', en: 'Tenders & notifications', kn: 'ಟೆಂಡರ್‌ಗಳು ಮತ್ತು ಅಧಿಸೂಚನೆಗಳು' },
  { id: 'recipes', path: '/nandini-recipes', en: 'Recipes', kn: 'ಪಾಕವಿಧಾನಗಳು' },
  { id: 'complaint', path: '/contact?category=quality', en: 'Complaint / customer care', kn: 'ದೂರು / ಗ್ರಾಹಕ ಸೇವೆ' },
  { id: 'just_browsing', path: null, en: 'Just browsing', kn: 'ಸುಮ್ಮನೆ ನೋಡುತ್ತಿದ್ದೇನೆ' },
];

export const INTENT_TEXT = {
  en: {
    title: 'What brings you here today?',
    subtitle: "Choose one and we'll take you straight there.",
    close: 'Close',
  },
  kn: {
    title: 'ಇಂದು ನೀವು ಯಾವ ಉದ್ದೇಶಕ್ಕಾಗಿ ಬಂದಿದ್ದೀರಿ?',
    subtitle: 'ಒಂದನ್ನು ಆರಿಸಿ, ನಾವು ನಿಮ್ಮನ್ನು ನೇರವಾಗಿ ಅಲ್ಲಿಗೆ ಕರೆದೊಯ್ಯುತ್ತೇವೆ.',
    close: 'ಮುಚ್ಚಿ',
  },
};

// Pages (without the /en or /kn prefix) where the popup may appear: the home
// page and general landing pages. Pages that already match an intent
// (careers, contact, products, recipes, notifications…) are deliberately absent.
export const INTENT_PAGES = ['', '/about/company-profile', '/portfolio', '/blog'];

export const INTENT_DELAY_MS = 6000;
export const INTENT_SCROLL_RATIO = 0.3;
export const INTENT_REMEMBER_DAYS = 30;
