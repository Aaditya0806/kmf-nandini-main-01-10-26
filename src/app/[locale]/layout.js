import { notFound } from 'next/navigation';
import { LOCALES } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

// Only /en and /kn exist. src/middleware.js turns other first segments into a
// server-rendered 404; notFound() here is a safety net.
export async function generateMetadata({ params }) {
  if (!LOCALES.includes(params.locale)) return {};
  return pageMetadata(params.locale, '');
}

export default function LocaleLayout({ children, params }) {
  if (!LOCALES.includes(params.locale)) notFound();

  return (
    <>
      {/* The root layout is shared with "/" (static), so <html lang> is set here
          before hydration instead of reading request headers there. */}
      {params.locale === 'kn' && (
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.lang='kn'" }} />
      )}
      {children}
    </>
  );
}
