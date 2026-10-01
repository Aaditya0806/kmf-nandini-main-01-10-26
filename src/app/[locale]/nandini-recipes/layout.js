import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }) {
  return pageMetadata(params.locale, '/nandini-recipes');
}

export default function Layout({ children }) {
  return children;
}
