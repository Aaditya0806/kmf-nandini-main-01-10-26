import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }) {
  return pageMetadata(params.locale, '/portfolio/ksheeradhare');
}

export default function Layout({ children }) {
  return children;
}
