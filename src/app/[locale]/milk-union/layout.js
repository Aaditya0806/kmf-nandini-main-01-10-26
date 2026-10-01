import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }) {
  return pageMetadata(params.locale, '/milk-union');
}

export default function Layout({ children }) {
  return children;
}
