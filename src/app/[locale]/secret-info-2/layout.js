import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }) {
  return pageMetadata(params.locale, '/secret-info-2');
}

export default function Layout({ children }) {
  return children;
}
