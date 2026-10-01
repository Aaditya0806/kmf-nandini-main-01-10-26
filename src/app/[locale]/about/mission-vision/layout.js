import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }) {
  return pageMetadata(params.locale, '/about/mission-vision');
}

export default function Layout({ children }) {
  return children;
}
