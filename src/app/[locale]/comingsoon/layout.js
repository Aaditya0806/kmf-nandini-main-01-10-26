import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }) {
  return pageMetadata(params.locale, '/comingsoon');
}

export default function Layout({ children }) {
  return children;
}
