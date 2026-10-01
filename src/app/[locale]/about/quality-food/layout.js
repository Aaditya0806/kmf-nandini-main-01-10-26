import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }) {
  return pageMetadata(params.locale, '/about/quality-food');
}

export default function Layout({ children }) {
  return children;
}
