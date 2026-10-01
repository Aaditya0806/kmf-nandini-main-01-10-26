import { detailMetadata } from '@/lib/seo';

export function generateMetadata({ params }) {
  return detailMetadata({ locale: params.locale, section: '/milk-union', slug: params.slug, api: 'milk-unions', field: 'name' });
}

export default function Layout({ children }) {
  return children;
}
