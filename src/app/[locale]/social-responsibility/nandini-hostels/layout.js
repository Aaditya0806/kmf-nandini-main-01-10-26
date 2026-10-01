import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }) {
  return pageMetadata(params.locale, '/social-responsibility/nandini-hostels');
}

export default function Layout({ children }) {
  return children;
}
