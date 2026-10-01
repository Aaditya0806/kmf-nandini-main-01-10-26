import { detailMetadata } from '@/lib/seo';

export function generateMetadata({ params }) {
  return detailMetadata({ locale: params.locale, section: '/blog', slug: params.slug, api: 'blog-posts', field: 'title' });
}

export default function Layout({ children }) {
  return children;
}
