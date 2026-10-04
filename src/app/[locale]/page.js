import HomePage from '@/components/home/HomePage';
import { langOf } from '@/lib/seo';

// /en and /kn home pages (shared component; "/" is src/app/page.js).
export default function LocaleHome({ params }) {
  return <HomePage locale={langOf(params.locale)} />;
}
