import { detailMetadata } from '@/lib/seo';

export function generateMetadata({ params }) {
  return detailMetadata({ locale: params.locale, section: '/kmf-unit', slug: params.slug, api: 'units-of-kmfs', field: 'title' });
}

export default function Layout({ children }) {
  return children;
}
