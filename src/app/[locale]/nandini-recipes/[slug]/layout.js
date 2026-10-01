import { detailMetadata } from '@/lib/seo';

export function generateMetadata({ params }) {
  return detailMetadata({ locale: params.locale, section: '/nandini-recipes', slug: params.slug, api: 'recipes', field: 'title' });
}

export default function Layout({ children }) {
  return children;
}
