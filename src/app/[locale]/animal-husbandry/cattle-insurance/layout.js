import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }) {
  return pageMetadata(params.locale, '/animal-husbandry/cattle-insurance');
}

export default function Layout({ children }) {
  return children;
}
