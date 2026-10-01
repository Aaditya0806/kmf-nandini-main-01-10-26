import { detailMetadata } from '@/lib/seo';

export function generateMetadata({ params }) {
  return detailMetadata({ locale: params.locale, section: '/blog/tv-commercial', slug: params.slug, api: 'tv-commercials', field: 'title' });
}

export default function Layout({ children }) {
  return children;
}
