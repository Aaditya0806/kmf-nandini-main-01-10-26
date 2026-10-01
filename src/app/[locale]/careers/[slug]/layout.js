import { buildMetadata, langOf, PAGES } from '@/lib/seo';
import { getJob, tr } from '@/lib/careers';

export function generateMetadata({ params }) {
  const lang = langOf(params.locale);
  const job = getJob(params.slug);
  if (!job) return {};
  return buildMetadata({
    locale: lang,
    route: `/careers/${job.slug}`,
    title: `${tr(job.title, lang)} – ${PAGES['/careers'][lang].title}`,
    description: PAGES['/careers'][lang].description,
  });
}

export default function Layout({ children }) {
  return children;
}
