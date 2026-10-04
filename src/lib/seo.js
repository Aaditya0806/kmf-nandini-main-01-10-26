import { BRAND, LOGO_PATH, SITE_URL } from './site';

// Per-page <title> and meta description, both languages. Keys are routes
// under /[locale]. Titles get " | KMF Nandini" (or the Kannada brand) appended
// by the [locale] layout's title template.
export const PAGES = {
  '': {
    en: {
      title: 'KMF Nandini – Karnataka Milk Federation',
      description:
        'Official website of the Karnataka Co-operative Milk Producers Federation (KMF), makers of Nandini milk, curd, ghee, paneer, sweets and ice creams.',
    },
    kn: {
      title: 'ಕಹಾಮ ನಂದಿನಿ – ಕರ್ನಾಟಕ ಹಾಲು ಮಹಾಮಂಡಳಿ',
      description:
        'ಕರ್ನಾಟಕ ಸಹಕಾರಿ ಹಾಲು ಉತ್ಪಾದಕರ ಮಹಾಮಂಡಳಿಯ (ಕಹಾಮ) ಅಧಿಕೃತ ಜಾಲತಾಣ – ನಂದಿನಿ ಹಾಲು, ಮೊಸರು, ತುಪ್ಪ, ಪನೀರ್, ಸಿಹಿತಿಂಡಿಗಳು ಮತ್ತು ಐಸ್ ಕ್ರೀಮ್.',
    },
  },
  '/about/company-profile': {
    en: { title: 'Company Profile', description: 'About KMF: the co-operative behind Nandini, its history, growth, units and ongoing projects.' },
    kn: { title: 'ಕಹಾಮ ಪರಿಚಯ', description: 'ನಂದಿನಿ ಬ್ರ್ಯಾಂಡ್‌ನ ಹಿಂದಿರುವ ಸಹಕಾರಿ ಸಂಸ್ಥೆ ಕಹಾಮದ ಇತಿಹಾಸ, ಬೆಳವಣಿಗೆ, ಘಟಕಗಳು ಮತ್ತು ಯೋಜನೆಗಳು.' },
  },
  '/about/mile-stones': {
    en: { title: 'Milestones', description: 'Key milestones in the journey of KMF and the Nandini brand since 1974.' },
    kn: { title: 'ಮೈಲಿಗಲ್ಲುಗಳು', description: 'ಕಹಾಮ ಮತ್ತು ನಂದಿನಿ ಬ್ರ್ಯಾಂಡ್‌ನ ಪಯಣದ ಪ್ರಮುಖ ಮೈಲಿಗಲ್ಲುಗಳು.' },
  },
  '/about/mission-vision': {
    en: { title: 'Mission & Vision', description: 'The purpose, mission and vision of the Karnataka Milk Federation.' },
    kn: { title: 'ಕಹಾಮ ಉದ್ದೇಶ', description: 'ಕರ್ನಾಟಕ ಹಾಲು ಮಹಾಮಂಡಳಿಯ ಉದ್ದೇಶ, ಧ್ಯೇಯ ಮತ್ತು ದೂರದೃಷ್ಟಿ.' },
  },
  '/about/organization-chart': {
    en: { title: 'Organization Chart', description: 'How KMF is organised: federation, milk unions, units and leadership.' },
    kn: { title: 'ಸಾಂಸ್ಥಿಕ ರಚನೆ', description: 'ಕಹಾಮದ ಸಾಂಸ್ಥಿಕ ರಚನೆ: ಮಹಾಮಂಡಳಿ, ಹಾಲು ಒಕ್ಕೂಟಗಳು, ಘಟಕಗಳು ಮತ್ತು ನಾಯಕತ್ವ.' },
  },
  '/about/quality-food': {
    en: { title: 'Quality & Food Safety', description: 'How KMF ensures quality and food safety for every Nandini product, with certifications and lab testing.' },
    kn: { title: 'ಗುಣಮಟ್ಟ ಮತ್ತು ಆಹಾರ ಸುರಕ್ಷತೆ', description: 'ಪ್ರತಿಯೊಂದು ನಂದಿನಿ ಉತ್ಪನ್ನದ ಗುಣಮಟ್ಟ ಮತ್ತು ಆಹಾರ ಸುರಕ್ಷತೆಯನ್ನು ಕಹಾಮ ಹೇಗೆ ಖಚಿತಪಡಿಸುತ್ತದೆ.' },
  },
  '/animal-husbandry/animal-breeding': {
    en: { title: 'Animal Breeding Programme', description: 'KMF animal breeding programmes, bull mother farms and health camps for dairy farmers.' },
    kn: { title: 'ಪಶು ಸಂತಾನೋತ್ಪತ್ತಿ ಕಾರ್ಯಕ್ರಮ', description: 'ಹೈನುಗಾರರಿಗಾಗಿ ಕಹಾಮದ ಪಶು ಸಂತಾನೋತ್ಪತ್ತಿ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಆರೋಗ್ಯ ಶಿಬಿರಗಳು.' },
  },
  '/animal-husbandry/animal-health': {
    en: { title: 'Animal Health', description: 'Veterinary and animal health services provided by KMF and its milk unions to dairy farmers.' },
    kn: { title: 'ಪಶು ಆರೋಗ್ಯ', description: 'ಕಹಾಮ ಮತ್ತು ಹಾಲು ಒಕ್ಕೂಟಗಳು ಹೈನುಗಾರರಿಗೆ ನೀಡುವ ಪಶುವೈದ್ಯಕೀಯ ಸೇವೆಗಳು.' },
  },
  '/animal-husbandry/cattle-insurance': {
    en: { title: 'Cattle Insurance', description: 'Cattle insurance and cattle feed support for dairy farmers from KMF.' },
    kn: { title: 'ಜಾನುವಾರು ವಿಮೆ', description: 'ಹೈನುಗಾರರಿಗೆ ಕಹಾಮದಿಂದ ಜಾನುವಾರು ವಿಮೆ ಮತ್ತು ಪಶು ಆಹಾರ ನೆರವು.' },
  },
  '/animal-husbandry/feed-and-fodder': {
    en: { title: 'Feed & Fodder Activities', description: 'Fodder development and cattle feed activities of KMF for dairy farmers.' },
    kn: { title: 'ಮೇವು ಚಟುವಟಿಕೆಗಳು', description: 'ಹೈನುಗಾರರಿಗಾಗಿ ಕಹಾಮದ ಮೇವು ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಪಶು ಆಹಾರ ಚಟುವಟಿಕೆಗಳು.' },
  },
  '/animal-husbandry/procurement': {
    en: { title: 'Milk Procurement', description: 'How KMF procures milk from dairy co-operative societies and farmers across Karnataka.' },
    kn: { title: 'ಹಾಲು ಶೇಖರಣೆ', description: 'ಕರ್ನಾಟಕದಾದ್ಯಂತ ಹಾಲು ಉತ್ಪಾದಕರ ಸಹಕಾರ ಸಂಘಗಳು ಮತ್ತು ರೈತರಿಂದ ಕಹಾಮದ ಹಾಲು ಶೇಖರಣೆ.' },
  },
  '/animal-husbandry/scheme': {
    en: { title: 'Schemes & Grants', description: 'Government and KMF schemes and grants available to dairy farmers.' },
    kn: { title: 'ಯೋಜನೆಗಳು / ಅನುದಾನಗಳು', description: 'ಹೈನುಗಾರರಿಗೆ ಲಭ್ಯವಿರುವ ಸರ್ಕಾರದ ಮತ್ತು ಕಹಾಮದ ಯೋಜನೆಗಳು ಮತ್ತು ಅನುದಾನಗಳು.' },
  },
  '/animal-husbandry/scheme/goi': {
    en: { title: 'Government of India Schemes', description: 'Government of India dairy development schemes implemented through KMF.' },
    kn: { title: 'ಭಾರತ ಸರ್ಕಾರದ ಯೋಜನೆಗಳು', description: 'ಕಹಾಮದ ಮೂಲಕ ಜಾರಿಗೊಳ್ಳುವ ಭಾರತ ಸರ್ಕಾರದ ಹೈನು ಅಭಿವೃದ್ಧಿ ಯೋಜನೆಗಳು.' },
  },
  '/animal-husbandry/scheme/gok': {
    en: { title: 'Government of Karnataka Schemes', description: 'Government of Karnataka dairy schemes and incentives for milk producers.' },
    kn: { title: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಯೋಜನೆಗಳು', description: 'ಹಾಲು ಉತ್ಪಾದಕರಿಗಾಗಿ ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಹೈನು ಯೋಜನೆಗಳು ಮತ್ತು ಪ್ರೋತ್ಸಾಹಗಳು.' },
  },
  '/animal-husbandry/scheme/other-scheme': {
    en: { title: 'Other Schemes', description: 'Other dairy development schemes for farmers supported by KMF.' },
    kn: { title: 'ಇತರ ಯೋಜನೆಗಳು', description: 'ಕಹಾಮ ಬೆಂಬಲಿತ ರೈತರಿಗಾಗಿ ಇತರ ಹೈನು ಅಭಿವೃದ್ಧಿ ಯೋಜನೆಗಳು.' },
  },
  '/blog': {
    en: { title: 'News & Blog', description: 'Latest news, events and stories from KMF and Nandini.' },
    kn: { title: 'ಸುದ್ದಿ / ಬ್ಲಾಗ್‌ಗಳು', description: 'ಕಹಾಮ ಮತ್ತು ನಂದಿನಿಯ ಇತ್ತೀಚಿನ ಸುದ್ದಿ, ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಲೇಖನಗಳು.' },
  },
  '/blog/gallery': {
    en: { title: 'Gallery', description: 'Photos and videos from KMF and Nandini events, plants and campaigns.' },
    kn: { title: 'ಗ್ಯಾಲರಿ', description: 'ಕಹಾಮ ಮತ್ತು ನಂದಿನಿ ಕಾರ್ಯಕ್ರಮಗಳು, ಘಟಕಗಳು ಮತ್ತು ಅಭಿಯಾನಗಳ ಚಿತ್ರಗಳು ಮತ್ತು ವಿಡಿಯೋಗಳು.' },
  },
  '/blog/notification': {
    en: { title: 'Notifications & Tenders', description: 'Official KMF tender notifications, expressions of interest and notices, with PDFs to download.' },
    kn: { title: 'ಅಧಿಸೂಚನೆಗಳು ಮತ್ತು ಟೆಂಡರ್‌ಗಳು', description: 'ಕಹಾಮದ ಅಧಿಕೃತ ಟೆಂಡರ್ ಅಧಿಸೂಚನೆಗಳು, ಆಸಕ್ತಿ ವ್ಯಕ್ತಪಡಿಸುವಿಕೆ ಮತ್ತು ಪ್ರಕಟಣೆಗಳು.' },
  },
  '/blog/press-release': {
    en: { title: 'Press Releases', description: 'Official press releases from the Karnataka Milk Federation.' },
    kn: { title: 'ಪತ್ರಿಕಾ ಪ್ರಕಟಣೆಗಳು', description: 'ಕರ್ನಾಟಕ ಹಾಲು ಮಹಾಮಂಡಳಿಯ ಅಧಿಕೃತ ಪತ್ರಿಕಾ ಪ್ರಕಟಣೆಗಳು.' },
  },
  '/blog/tv-commercial': {
    en: { title: 'Nandini TV Commercials', description: 'Watch Nandini TV commercials, ads and the virtual dairy tour.' },
    kn: { title: 'ನಂದಿನಿ ಟಿವಿ ಜಾಹೀರಾತುಗಳು', description: 'ನಂದಿನಿ ಟಿವಿ ಜಾಹೀರಾತುಗಳು ಮತ್ತು ಡೈರಿ ಪ್ರವಾಸದ ವಿಡಿಯೋಗಳು.' },
  },
  '/blog/tv-commercial/brandambassador': {
    en: { title: 'Nandini Brand Ambassador', description: 'Nandini brand ambassador campaigns and videos.' },
    kn: { title: 'ನಂದಿನಿ ಬ್ರ್ಯಾಂಡ್ ರಾಯಭಾರಿ', description: 'ನಂದಿನಿ ಬ್ರ್ಯಾಂಡ್ ರಾಯಭಾರಿಯ ಅಭಿಯಾನಗಳು ಮತ್ತು ವಿಡಿಯೋಗಳು.' },
  },
  '/careers': {
    en: { title: 'Careers & Recruitment', description: 'Official KMF Nandini recruitment notifications: current openings, results, admit cards and past recruitments. Beware of fake job offers.' },
    kn: { title: 'ಉದ್ಯೋಗಾವಕಾಶಗಳು ಮತ್ತು ನೇಮಕಾತಿ', description: 'ಕಹಾಮ ನಂದಿನಿಯ ಅಧಿಕೃತ ನೇಮಕಾತಿ ಅಧಿಸೂಚನೆಗಳು: ಪ್ರಸ್ತುತ ಹುದ್ದೆಗಳು, ಫಲಿತಾಂಶಗಳು, ಪ್ರವೇಶ ಪತ್ರಗಳು ಮತ್ತು ಹಿಂದಿನ ನೇಮಕಾತಿಗಳು.' },
  },
  '/complaint': {
    en: { title: 'File a Complaint', description: 'Report a problem with a Nandini product, a parlour or overcharging above MRP. Attach a photo, get a ticket number and check its status online.' },
    kn: { title: 'ದೂರು ಸಲ್ಲಿಸಿ', description: 'ನಂದಿನಿ ಉತ್ಪನ್ನ, ಪಾರ್ಲರ್ ಅಥವಾ ಎಂಆರ್‌ಪಿಗಿಂತ ಹೆಚ್ಚು ಬೆಲೆ ಬಗ್ಗೆ ದೂರು ನೀಡಿ. ಫೋಟೋ ಲಗತ್ತಿಸಿ, ಟಿಕೆಟ್ ಸಂಖ್ಯೆ ಪಡೆದು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ.' },
  },
  '/contact': {
    en: { title: 'Contact Us', description: 'Contact KMF Nandini customer care: helpline 080-260 96800, toll free 1800 425 8030, WhatsApp and email, or send us a message.' },
    kn: { title: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ', description: 'ಕಹಾಮ ನಂದಿನಿ ಗ್ರಾಹಕ ಸೇವೆ: ಸಹಾಯವಾಣಿ 080-260 96800, ಟೋಲ್ ಫ್ರೀ 1800 425 8030, ವಾಟ್ಸ್ಆ್ಯಪ್ ಮತ್ತು ಇಮೇಲ್.' },
  },
  '/dealership': {
    en: { title: 'Open a Nandini Parlour, Agency or Dealership', description: 'Apply online to open a Nandini parlour, milk agency, distributorship or franchise outlet. No fee; the KMF marketing team contacts you.' },
    kn: { title: 'ನಂದಿನಿ ಪಾರ್ಲರ್, ಏಜೆನ್ಸಿ ಅಥವಾ ಡೀಲರ್‌ಶಿಪ್', description: 'ನಂದಿನಿ ಪಾರ್ಲರ್, ಹಾಲು ಏಜೆನ್ಸಿ, ವಿತರಕ ಅಥವಾ ಫ್ರಾಂಚೈಸ್ ಮಳಿಗೆ ತೆರೆಯಲು ಆನ್‌ಲೈನ್ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ. ಶುಲ್ಕವಿಲ್ಲ.' },
  },
  '/directors': {
    en: { title: 'Board of Directors', description: 'The Board of Directors of the Karnataka Milk Federation.' },
    kn: { title: 'ಮಂಡಳಿ ನಿರ್ದೇಶಕರುಗಳು', description: 'ಕರ್ನಾಟಕ ಹಾಲು ಮಹಾಮಂಡಳಿಯ ಆಡಳಿತ ಮಂಡಳಿ ನಿರ್ದೇಶಕರು.' },
  },
  '/executive': {
    en: { title: 'KMF Executives', description: 'Senior executives and officers of the Karnataka Milk Federation.' },
    kn: { title: 'ಕಹಾಮ ಅಧಿಕಾರಿಗಳು', description: 'ಕರ್ನಾಟಕ ಹಾಲು ಮಹಾಮಂಡಳಿಯ ಹಿರಿಯ ಅಧಿಕಾರಿಗಳು.' },
  },
  '/kmf-unit': {
    en: { title: 'KMF Units', description: 'KMF units: dairies, product plants, cattle feed plants, training centres and more.' },
    kn: { title: 'ಕಹಾಮ ಘಟಕಗಳು', description: 'ಕಹಾಮದ ಘಟಕಗಳು: ಡೈರಿಗಳು, ಉತ್ಪನ್ನ ಘಟಕಗಳು, ಪಶು ಆಹಾರ ಘಟಕಗಳು, ತರಬೇತಿ ಕೇಂದ್ರಗಳು.' },
  },
  '/milk-union': {
    en: { title: 'Milk Unions', description: 'The district co-operative milk unions of Karnataka that make up KMF.' },
    kn: { title: 'ಹಾಲು ಒಕ್ಕೂಟಗಳು', description: 'ಕಹಾಮದ ಭಾಗವಾಗಿರುವ ಕರ್ನಾಟಕದ ಜಿಲ್ಲಾ ಸಹಕಾರಿ ಹಾಲು ಒಕ್ಕೂಟಗಳು.' },
  },
  '/nandini-recipes': {
    en: { title: 'Nandini Recipes', description: 'Easy recipes made with Nandini milk, curd, ghee, paneer and butter.' },
    kn: { title: 'ನಂದಿನಿ ಪಾಕವಿಧಾನಗಳು', description: 'ನಂದಿನಿ ಹಾಲು, ಮೊಸರು, ತುಪ್ಪ, ಪನೀರ್ ಮತ್ತು ಬೆಣ್ಣೆಯಿಂದ ಸುಲಭ ಪಾಕವಿಧಾನಗಳು.' },
  },
  '/notify-me': {
    en: { title: 'Notify Me When Nandini Is Available', description: 'Not in Karnataka, or a Nandini product is not available near you? Leave your PIN code and the products you want, and KMF will tell you when they arrive.' },
    kn: { title: 'ನಂದಿನಿ ಲಭ್ಯವಾದಾಗ ತಿಳಿಸಿ', description: 'ಕರ್ನಾಟಕದ ಹೊರಗಿದ್ದೀರಾ ಅಥವಾ ನಿಮ್ಮ ಹತ್ತಿರ ನಂದಿನಿ ಉತ್ಪನ್ನ ಲಭ್ಯವಿಲ್ಲವೇ? ಪಿನ್ ಕೋಡ್ ಮತ್ತು ಬೇಕಾದ ಉತ್ಪನ್ನಗಳನ್ನು ತಿಳಿಸಿ; ಲಭ್ಯವಾದಾಗ ಕಹಾಮ ತಿಳಿಸುತ್ತದೆ.' },
  },
  '/offers': {
    en: { title: 'Offers', description: 'Current offers on Nandini products.' },
    kn: { title: 'ಕೊಡುಗೆಗಳು', description: 'ನಂದಿನಿ ಉತ್ಪನ್ನಗಳ ಮೇಲಿನ ಪ್ರಸ್ತುತ ಕೊಡುಗೆಗಳು.' },
  },
  '/our-product': {
    en: { title: 'Nandini Products', description: 'The full range of Nandini products: milk, curd, ghee, butter, paneer, sweets, ice creams, bakery and more.' },
    kn: { title: 'ನಮ್ಮ ಉತ್ಪನ್ನಗಳು', description: 'ನಂದಿನಿ ಉತ್ಪನ್ನಗಳ ಸಂಪೂರ್ಣ ಶ್ರೇಣಿ: ಹಾಲು, ಮೊಸರು, ತುಪ್ಪ, ಬೆಣ್ಣೆ, ಪನೀರ್, ಸಿಹಿತಿಂಡಿಗಳು, ಐಸ್ ಕ್ರೀಮ್.' },
  },
  '/portfolio': {
    en: { title: 'KMF Portfolio', description: 'KMF portfolio: Ksheerasagara magazine, marketing, awards, social programmes and more.' },
    kn: { title: 'ಕಹಾಮ ಪೋರ್ಟ್ಫೋಲಿಯೋ', description: 'ಕಹಾಮ ಪೋರ್ಟ್ಫೋಲಿಯೋ: ಕ್ಷೀರಸಾಗರ ನಿಯತಕಾಲಿಕೆ, ಮಾರುಕಟ್ಟೆ, ಪ್ರಶಸ್ತಿಗಳು ಮತ್ತು ಸಾಮಾಜಿಕ ಕಾರ್ಯಕ್ರಮಗಳು.' },
  },
  '/portfolio/awards': {
    en: { title: 'Awards', description: 'Awards and recognition received by KMF and Nandini.' },
    kn: { title: 'ಪ್ರಶಸ್ತಿಗಳು', description: 'ಕಹಾಮ ಮತ್ತು ನಂದಿನಿಗೆ ದೊರೆತ ಪ್ರಶಸ್ತಿಗಳು ಮತ್ತು ಮನ್ನಣೆಗಳು.' },
  },
  '/portfolio/brandambassador': {
    en: { title: 'Brand Ambassador', description: 'Nandini brand ambassador campaigns.' },
    kn: { title: 'ಬ್ರ್ಯಾಂಡ್ ರಾಯಭಾರಿ', description: 'ನಂದಿನಿ ಬ್ರ್ಯಾಂಡ್ ರಾಯಭಾರಿಯ ಅಭಿಯಾನಗಳು.' },
  },
  '/portfolio/defence': {
    en: { title: 'Defence Supplies', description: 'Nandini products supplied to the defence forces.' },
    kn: { title: 'ರಕ್ಷಣಾ ಪಡೆಗಳಿಗೆ ಪೂರೈಕೆ', description: 'ರಕ್ಷಣಾ ಪಡೆಗಳಿಗೆ ನಂದಿನಿ ಉತ್ಪನ್ನಗಳ ಪೂರೈಕೆ.' },
  },
  '/portfolio/historyofmilk': {
    en: { title: 'History of Milk', description: 'The history of milk and dairy co-operatives in Karnataka.' },
    kn: { title: 'ಹಾಲಿನ ಇತಿಹಾಸ', description: 'ಕರ್ನಾಟಕದಲ್ಲಿ ಹಾಲು ಮತ್ತು ಹೈನು ಸಹಕಾರಿ ಚಳವಳಿಯ ಇತಿಹಾಸ.' },
  },
  '/portfolio/ksheerabhagaya': {
    en: { title: 'Ksheera Bhagya', description: 'Ksheera Bhagya: nutritious Nandini milk for schoolchildren and anganwadi children in Karnataka.' },
    kn: { title: 'ಕ್ಷೀರ ಭಾಗ್ಯ', description: 'ಕ್ಷೀರ ಭಾಗ್ಯ: ಕರ್ನಾಟಕದ ಶಾಲಾ ಮತ್ತು ಅಂಗನವಾಡಿ ಮಕ್ಕಳಿಗೆ ಪೌಷ್ಟಿಕ ನಂದಿನಿ ಹಾಲು.' },
  },
  '/portfolio/ksheeradhare': {
    en: { title: 'Ksheera Dhare', description: 'Ksheera Dhare: incentives paid to dairy farmers for every litre of milk supplied.' },
    kn: { title: 'ಕ್ಷೀರಧಾರೆ', description: 'ಕ್ಷೀರಧಾರೆ: ಪೂರೈಸುವ ಪ್ರತಿ ಲೀಟರ್ ಹಾಲಿಗೆ ಹೈನುಗಾರರಿಗೆ ಪ್ರೋತ್ಸಾಹ ಧನ.' },
  },
  '/portfolio/marketing': {
    en: { title: 'Marketing', description: 'Nandini marketing network, campaigns and outlets.' },
    kn: { title: 'ಮಾರುಕಟ್ಟೆ', description: 'ನಂದಿನಿ ಮಾರುಕಟ್ಟೆ ಜಾಲ, ಅಭಿಯಾನಗಳು ಮತ್ತು ಮಳಿಗೆಗಳು.' },
  },
  '/social-responsibility/nandini-hostels': {
    en: { title: 'Nandini Hostels', description: 'Nandini hostels run by KMF for the children of dairy farmers.' },
    kn: { title: 'ನಂದಿನಿ ವಸತಿ ನಿಲಯ', description: 'ಹೈನುಗಾರರ ಮಕ್ಕಳಿಗಾಗಿ ಕಹಾಮ ನಡೆಸುವ ನಂದಿನಿ ವಸತಿ ನಿಲಯಗಳು.' },
  },
  '/women-empowerment': {
    en: { title: 'STEP – Women Empowerment', description: 'The STEP programme supporting women dairy farmers and women-run dairy co-operatives.' },
    kn: { title: 'ಸ್ಟೆಪ್ ಯೋಜನೆ – ಮಹಿಳಾ ಸಬಲೀಕರಣ', description: 'ಮಹಿಳಾ ಹೈನುಗಾರರು ಮತ್ತು ಮಹಿಳಾ ಹಾಲು ಸಹಕಾರ ಸಂಘಗಳಿಗೆ ಬೆಂಬಲ ನೀಡುವ ಸ್ಟೆಪ್ ಯೋಜನೆ.' },
  },

  // Internal / placeholder pages: titled, but kept out of search results.
  '/404': { noindex: true, en: { title: 'Page not found' }, kn: { title: 'ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ' } },
  '/comingsoon': { noindex: true, en: { title: 'Coming soon' }, kn: { title: 'ಶೀಘ್ರದಲ್ಲಿ ಬರಲಿದೆ' } },
  '/privateinfo': { noindex: true, en: { title: 'Information' }, kn: { title: 'ಮಾಹಿತಿ' } },
  '/secret-info': { noindex: true, en: { title: 'Information' }, kn: { title: 'ಮಾಹಿತಿ' } },
  '/secret-info-2': { noindex: true, en: { title: 'Information' }, kn: { title: 'ಮಾಹಿತಿ' } },
  '/secret-info-link': { noindex: true, en: { title: 'Information' }, kn: { title: 'ಮಾಹಿತಿ' } },
  '/secret-info-new-link': { noindex: true, en: { title: 'Information' }, kn: { title: 'ಮಾಹಿತಿ' } },
};

export const langOf = (locale) => (locale === 'kn' ? 'kn' : 'en');

const OG_IMAGE = { url: LOGO_PATH, width: 617, height: 400, alt: BRAND.en };

// Build the full Metadata object for a page at /{lang}{route}.
export function buildMetadata({ locale, route, title, description, noindex = false }) {
  const lang = langOf(locale);
  const path = `/${lang}${route}`;
  const home = route === '';
  const fullTitle = home ? title : `${title} | ${BRAND[lang]}`;

  return {
    // Absolute, so nested layouts can't drop the brand suffix.
    title: { absolute: fullTitle },
    description,
    alternates: noindex
      ? undefined
      : {
          canonical: path,
          languages: { en: `/en${route}`, kn: `/kn${route}`, 'x-default': `/en${route}` },
        },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'website',
      siteName: BRAND[lang],
      title: fullTitle,
      description,
      url: path,
      locale: lang === 'kn' ? 'kn_IN' : 'en_IN',
      alternateLocale: lang === 'kn' ? 'en_IN' : 'kn_IN',
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary', title: fullTitle, description, images: [LOGO_PATH] },
  };
}

// Metadata for one of the static routes in PAGES.
export function pageMetadata(locale, route) {
  const lang = langOf(locale);
  const page = PAGES[route] || {};
  const text = page[lang] || page.en || {};
  return buildMetadata({
    locale: lang,
    route,
    title: text.title || BRAND[lang],
    description: text.description || PAGES[''][lang].description,
    noindex: !!page.noindex,
  });
}

// For [slug] pages: fetch the item's name from Strapi on the server, with a
// short timeout. Any failure falls back to the section's own title, so a slow
// or unavailable CMS can never break or delay the page.
export async function detailMetadata({ locale, section, slug, api, field = 'title' }) {
  const lang = langOf(locale);
  const parent = PAGES[section]?.[lang] || {};
  const route = `${section}/${slug}`;
  let name = '';

  const base = process.env.NEXT_PUBLIC_BASE_URL;
  if (base && /^\d+$/.test(String(slug))) {
    try {
      const res = await fetch(`${base.replace(/\/$/, '')}/api/${api}/${slug}?locale=${lang}`, {
        signal: AbortSignal.timeout(2500),
        next: { revalidate: 600 },
      });
      if (res.ok) {
        const json = await res.json();
        name = String(json?.data?.attributes?.[field] || '').trim();
      }
    } catch (e) {
      // fall through to the section title
    }
  }

  return buildMetadata({
    locale: lang,
    route,
    title: name ? `${titleCase(name)} – ${parent.title || ''}`.replace(/ – $/, '') : parent.title || BRAND[lang],
    description: parent.description || PAGES[''][lang].description,
  });
}

// "AKKI PAYASA" -> "Akki Payasa"; leaves mixed-case and Kannada text alone.
function titleCase(s) {
  if (s !== s.toUpperCase() || !/[A-Z]/.test(s)) return s;
  return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export const absoluteUrl = (path) => `${SITE_URL}${path}`;
