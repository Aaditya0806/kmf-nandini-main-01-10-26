import NotFoundContent from '@/components/NotFoundContent';

// Handles every unknown URL, and notFound() calls (e.g. an unknown locale).
export const metadata = {
  title: { absolute: 'Page not found | KMF Nandini' },
  robots: { index: false, follow: true },
  alternates: {}, // no canonical/hreflang on error pages
  openGraph: null,
};

export default function NotFound() {
  return <NotFoundContent />;
}
