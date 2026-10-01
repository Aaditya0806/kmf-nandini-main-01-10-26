import Link from 'next/link';
import Footer from '@/components/Footer';
import CareersBrowser from '@/components/careers/CareersBrowser';
import FraudNotice from '@/components/careers/FraudNotice';
import { careersText } from '@/configtext/careers';
import { formatDate, getJobs, toCard, todayIST } from '@/lib/careers';
import { langOf } from '@/lib/seo';

function SectionTitle({ id, children }) {
  return (
    <h2 id={id} className="font-heading text-xl md:text-2xl font-extrabold uppercase text-primary-main">
      {children}
    </h2>
  );
}

export default function CareersPage({ params }) {
  const lang = langOf(params.locale);
  const t = careersText[lang];
  const today = todayIST();
  const cards = getJobs().map((j) => toCard(j, lang, today));

  const updates = cards
    .flatMap((c) => c.updates.filter((u) => u.url).map((u) => ({ ...u, job: c })))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const past = cards.filter((c) => c.status !== 'open');

  return (
    <div className="w-full bg-[#F6F6F6]">
      <section className="w-full bg-primary-gradient pt-44 pb-12 px-4 text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-heading text-3xl md:text-5xl font-extrabold uppercase">{t.heroTitle}</h1>
          <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed">{t.heroIntro}</p>
          <p className="mt-3 font-semibold text-secondary-lighter">{t.heroNote}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        <FraudNotice t={t} lang={lang} />

        <section aria-labelledby="openings">
          <SectionTitle id="openings">{t.openingsTitle}</SectionTitle>
          <div className="mt-5">
            {cards.length ? (
              <CareersBrowser cards={cards} t={t} lang={lang} />
            ) : (
              <div className="rounded-lg bg-white p-8 text-center shadow-md border-b-2 border-primary-main">
                <p className="text-xl font-bold text-gray-900">{t.emptyTitle}</p>
                <p className="mx-auto mt-3 max-w-xl text-gray-700">{t.emptyBody}</p>
                <Link
                  href={`/${lang}/blog/notification`}
                  className="mt-5 inline-block bg-primary-gradient px-5 py-3 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main"
                >
                  {t.emptyNotifications}
                </Link>
              </div>
            )}
          </div>
        </section>

        {updates.length > 0 && (
          <section aria-labelledby="updates">
            <SectionTitle id="updates">{t.updatesTitle}</SectionTitle>
            <ul className="mt-5 divide-y divide-gray-200 rounded-lg bg-white shadow-md">
              {updates.map((u) => (
                <li key={`${u.job.slug}-${u.url}`} className="flex flex-col gap-1 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase text-primary-main">
                      {t.updateTypes[u.type] || t.updateTypes.update}
                      {u.date && <span className="ml-2 font-normal text-gray-500">{formatDate(u.date, lang)}</span>}
                    </p>
                    <p className="font-semibold text-gray-900">{u.label || u.job.title}</p>
                    <p className="text-sm text-gray-600">{u.job.title}</p>
                  </div>
                  <a
                    href={u.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start text-sm font-semibold text-primary-main underline md:self-center"
                  >
                    {t.viewPdf}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {past.length > 0 && (
          <section aria-labelledby="archive">
            <SectionTitle id="archive">{t.archiveTitle}</SectionTitle>
            <ul className="mt-5 divide-y divide-gray-200 rounded-lg bg-white shadow-md">
              {past.map((c) => (
                <li key={c.slug} className="flex flex-col gap-1 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <Link href={`/${lang}/careers/${c.slug}`} className="font-semibold text-gray-900 hover:underline">
                      {c.title}
                    </Link>
                    <p className="text-sm text-gray-600">
                      {[c.unit, c.lastDate && `${t.lastDate}: ${formatDate(c.lastDate, lang)}`].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <span className="text-sm text-gray-700">{c.status === 'results' ? t.results : t.closed}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="faq">
          <SectionTitle id="faq">{t.faqTitle}</SectionTitle>
          <div className="mt-5 space-y-3">
            {t.faqs.map((f) => (
              <details key={f.q} className="group rounded-lg bg-white p-4 shadow-sm open:shadow-md">
                <summary className="cursor-pointer list-none font-semibold text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main">
                  <span className="mr-2 inline-block transition-transform group-open:rotate-90" aria-hidden="true">
                    ›
                  </span>
                  {f.q}
                </summary>
                <p className="mt-3 pl-5 text-gray-700">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
