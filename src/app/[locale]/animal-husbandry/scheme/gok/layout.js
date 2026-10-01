import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }) {
  return pageMetadata(params.locale, '/animal-husbandry/scheme/gok');
}

export default function Layout({ children }) {
  return children;
}
