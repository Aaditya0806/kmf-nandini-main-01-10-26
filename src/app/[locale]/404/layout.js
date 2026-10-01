import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }) {
  return pageMetadata(params.locale, '/404');
}

export default function Layout({ children }) {
  return children;
}
