import { detailMetadata } from '@/lib/seo';

export function generateMetadata({ params }) {
  return detailMetadata({ locale: params.locale, section: '/our-product', slug: params.slug, api: 'subcategories', field: 'title' });
}

export default function Layout({ children }) {
  return children;
}
