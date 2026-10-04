// Served at /sitemap.xml — submit this URL in Google Search Console.
import { getJobs } from '@/lib/careers';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kmfnandini.coop';
const LOCALES = ['en', 'kn'];

// Public static pages under /[locale]. Detail pages ([slug]) and internal
// pages (secret-info*, privateinfo, 404, comingsoon) are intentionally left out,
// except careers notices, which are listed so Google can find job postings.
const ROUTES = [
  '',
  '/about/company-profile',
  '/about/mile-stones',
  '/about/mission-vision',
  '/about/organization-chart',
  '/about/quality-food',
  '/animal-husbandry/animal-breeding',
  '/animal-husbandry/animal-health',
  '/animal-husbandry/cattle-insurance',
  '/animal-husbandry/feed-and-fodder',
  '/animal-husbandry/procurement',
  '/animal-husbandry/scheme',
  '/animal-husbandry/scheme/goi',
  '/animal-husbandry/scheme/gok',
  '/animal-husbandry/scheme/other-scheme',
  '/blog',
  '/blog/gallery',
  '/blog/notification',
  '/blog/press-release',
  '/blog/tv-commercial',
  '/blog/tv-commercial/brandambassador',
  '/careers',
  '/complaint',
  '/contact',
  '/dealership',
  '/directors',
  '/executive',
  '/kmf-unit',
  '/milk-union',
  '/nandini-recipes',
  '/notify-me',
  '/offers',
  '/our-product',
  '/portfolio',
  '/portfolio/awards',
  '/portfolio/brandambassador',
  '/portfolio/defence',
  '/portfolio/historyofmilk',
  '/portfolio/ksheerabhagaya',
  '/portfolio/ksheeradhare',
  '/portfolio/marketing',
  '/social-responsibility/nandini-hostels',
  '/women-empowerment',
];

export default function sitemap() {
  const lastModified = new Date();
  const home = { url: SITE_URL, lastModified, priority: 1 };
  const jobRoutes = getJobs().map((j) => `/careers/${j.slug}`);

  return [
    home,
    ...LOCALES.flatMap((locale) =>
      [...ROUTES, ...jobRoutes].map((route) => ({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified,
        priority: route === '' ? 0.9 : route === '/careers' ? 0.8 : 0.7,
      }))
    ),
  ];
}
