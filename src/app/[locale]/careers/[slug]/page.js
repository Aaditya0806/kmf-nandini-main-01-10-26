import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import ApplyLink from '@/components/careers/ApplyLink';
import FraudNotice from '@/components/careers/FraudNotice';
import TrackJobView from '@/components/careers/TrackJobView';
import { careersText } from '@/configtext/careers';
import { formatDate, getJob, toCard, todayIST, tr } from '@/lib/careers';
import { jobPostingJsonLd, jsonLdString } from '@/lib/jsonld';
import { langOf } from '@/lib/seo';

export default function JobPage({ params }) {
  const lang = langOf(params.locale);
  const job = getJob(params.slug);
  if (!job) notFound();

  const t = careersText[lang];
  const card = toCard(job, lang, todayIST());
  const facts = [
    [t.post, tr(job.post, lang)],
    [t.vacancies, job.vacancies],
    [t.unit, card.unit],
    [t.location, card.location],
    [t.qualification, tr(job.qualification, lang)],
    [t.ageLimit, tr(job.ageLimit, lang)],
    [t.startDate, formatDate(job.startDate, lang)],
    [t.lastDate, formatDate(job.lastDate, lang)],
    [t.published, formatDate(job.publishedDate, lang)],
  ].filter(([, v]) => v !== null && v !== undefined && v !== '');

  const statusLabel =
    card.status === 'open' ? (card.closingSoon ? t.closingSoon : t.statusOpen) : card.status === 'results' ? t.results : t.closed;

  return (
    <div className="w-full bg-[#F6F6F6]">
      {/* Google Jobs: only while the post is open. */}
      {card.status === 'open' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(jobPostingJsonLd(job)) }}
        />
      )}
      <TrackJobView jobId={card.id} jobTitle={card.title} />

      <section className="w-full bg-primary-gradient pt-44 pb-10 px-4 text-white">
        <div className="max-w-4xl mx-auto">
          <Link href={`/${lang}/careers`} className="text-sm font-semibold text-secondary-lighter hover:underline">
            {t.backToCareers}
          </Link>
          <p className="mt-4 inline-block rounded-full bg-white/15 px-3 py-1 text-sm font-bold">{statusLabel}</p>
          <h1 className="mt-3 font-heading text-2xl md:text-4xl font-extrabold">{card.title}</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <div className="rounded-lg bg-white p-6 shadow-md border-b-2 border-primary-main">
          <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="text-sm text-gray-500">{k}</dt>
                <dd className="font-semibold text-gray-900">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-sm text-gray-700">{t.readNotification}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            {card.notificationPdf && (
              <a
                href={card.notificationPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-primary-main px-4 py-2 text-sm font-semibold text-primary-main hover:bg-primary-main hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main"
              >
                {t.viewPdf}
              </a>
            )}
            {card.status === 'open' && (
              <ApplyLink href={card.applyUrl} jobId={card.id} jobTitle={card.title} label={t.apply} srHint={t.applyNewTab} />
            )}
          </div>
        </div>

        {card.updates.some((u) => u.url) && (
          <section aria-labelledby="job-updates" className="rounded-lg bg-white p-6 shadow-md">
            <h2 id="job-updates" className="font-heading text-lg font-extrabold uppercase text-primary-main">
              {t.updatesTitle}
            </h2>
            <ul className="mt-3 space-y-2">
              {card.updates
                .filter((u) => u.url)
                .map((u) => (
                  <li key={u.url}>
                    <a href={u.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-main underline">
                      {(t.updateTypes[u.type] || t.updateTypes.update) + (u.label ? `: ${u.label}` : '')}
                    </a>
                    {u.date && <span className="ml-2 text-sm text-gray-500">{formatDate(u.date, lang)}</span>}
                  </li>
                ))}
            </ul>
          </section>
        )}

        <FraudNotice t={t} lang={lang} />
      </div>

      <Footer />
    </div>
  );
}
