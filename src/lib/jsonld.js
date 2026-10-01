import { CONTACT, LOGO_PATH, ORG_NAME, SITE_URL, SOCIAL_LINKS } from './site';
import { tr } from './careers';

// JSON for a <script type="application/ld+json"> tag; "<" is escaped so no
// value can close the script element.
export const jsonLdString = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// schema.org JobPosting for an open recruitment notice (Google Jobs).
// Rendered on /[locale]/careers/[slug] only while the post is open.
export function jobPostingJsonLd(job) {
  const title = tr(job.title, 'en');
  const lines = [
    ['Post', tr(job.post, 'en')],
    ['Number of vacancies', job.vacancies],
    ['Unit', tr(job.unit, 'en')],
    ['Location', tr(job.location, 'en')],
    ['Qualification', tr(job.qualification, 'en')],
    ['Age limit', tr(job.ageLimit, 'en')],
    ['Last date to apply', job.lastDate],
  ].filter(([, v]) => v !== null && v !== undefined && v !== '');

  const description =
    `<p>${esc(title)}, Karnataka Co-operative Milk Producers Federation (KMF / Nandini).</p><ul>` +
    lines.map(([k, v]) => `<li>${esc(k)}: ${esc(v)}</li>`).join('') +
    '</ul><p>Read the official notification for full eligibility, fees and the selection process.</p>';

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title,
    description,
    identifier: { '@type': 'PropertyValue', name: 'KMF', value: String(job.id ?? job.slug) },
    datePosted: job.publishedDate || job.startDate,
    ...(job.lastDate ? { validThrough: `${job.lastDate}T23:59:59+05:30` } : {}),
    ...(job.vacancies ? { totalJobOpenings: job.vacancies } : {}),
    hiringOrganization: {
      '@type': 'Organization',
      name: ORG_NAME,
      sameAs: SITE_URL,
      logo: `${SITE_URL}${LOGO_PATH}`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: tr(job.location, 'en') || CONTACT.address.addressLocality,
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
    },
    directApply: false,
    url: `${SITE_URL}/en/careers/${job.slug}`,
  };
}

// schema.org Organization, rendered once in the root layout.
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: ORG_NAME,
    alternateName: ['KMF', 'Nandini', 'KMF Nandini', 'ಕಹಾಮ ನಂದಿನಿ'],
    url: SITE_URL,
    logo: `${SITE_URL}${LOGO_PATH}`,
    email: CONTACT.email,
    address: { '@type': 'PostalAddress', ...CONTACT.address },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: CONTACT.phone,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Kannada'],
      },
      {
        '@type': 'ContactPoint',
        telephone: CONTACT.tollFree,
        contactType: 'customer service',
        contactOption: 'TollFree',
        areaServed: 'IN',
        availableLanguage: ['English', 'Kannada'],
      },
    ],
    sameAs: SOCIAL_LINKS,
  };
}
