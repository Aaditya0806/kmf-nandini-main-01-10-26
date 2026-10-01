'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import ApplyLink from './ApplyLink';
import { formatDate } from '@/lib/careers';

function StatusBadge({ card, t }) {
  if (card.status === 'open' && card.closingSoon)
    return <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-800">{t.closingSoon}</span>;
  if (card.status === 'open')
    return <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-800">{t.statusOpen}</span>;
  if (card.status === 'results')
    return <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800">{t.results}</span>;
  return <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-bold text-gray-700">{t.closed}</span>;
}

function JobCard({ card, t, lang }) {
  const facts = [
    [t.vacancies, card.vacancies],
    [t.unit, card.unit],
    [t.location, card.location],
    [t.lastDate, formatDate(card.lastDate, lang)],
  ].filter(([, v]) => v !== null && v !== '' && v !== undefined);

  return (
    <li className="flex flex-col rounded-lg bg-white p-5 shadow-md border-b-2 border-primary-main">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge card={card} t={t} />
      </div>
      <h3 className="mt-2 text-lg font-bold text-gray-900">{card.title}</h3>
      {card.post && card.post !== card.title && <p className="text-sm text-gray-700">{t.post}: {card.post}</p>}

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {facts.map(([k, v]) => (
          <div key={k}>
            <dt className="text-gray-500">{k}</dt>
            <dd className="font-semibold text-gray-900">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
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
        <Link
          href={`/${lang}/careers/${card.slug}`}
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-primary-main underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main"
        >
          {t.details}
          <span className="sr-only">: {card.title}</span>
        </Link>
      </div>
    </li>
  );
}

// Filterable list of recruitment notices (status, unit, free-text search).
export default function CareersBrowser({ cards, t, lang }) {
  const hasOpen = cards.some((c) => c.status === 'open');
  const [status, setStatus] = useState(hasOpen ? 'open' : 'all');
  const [unit, setUnit] = useState('');
  const [query, setQuery] = useState('');

  const units = useMemo(() => [...new Set(cards.map((c) => c.unit).filter(Boolean))].sort(), [cards]);

  const shown = cards.filter((c) => {
    if (status !== 'all' && c.status !== status) return false;
    if (unit && c.unit !== unit) return false;
    const q = query.trim().toLowerCase();
    if (q && ![c.title, c.post, c.unit, c.location].join(' ').toLowerCase().includes(q)) return false;
    return true;
  });

  const statuses = [
    ['open', t.statusOpen],
    ['closed', t.statusClosed],
    ['results', t.statusResults],
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm md:flex-row md:items-end">
        <fieldset>
          <legend className="text-sm font-semibold text-gray-700">{t.filterStatus}</legend>
          <div className="mt-1 flex flex-wrap gap-2">
            {statuses.map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={status === value}
                onClick={() => setStatus(status === value ? 'all' : value)}
                className={`min-h-[40px] rounded-full border px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main ${
                  status === value ? 'border-primary-main bg-primary-main text-white' : 'border-gray-300 bg-white text-gray-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        {units.length > 1 && (
          <div className="flex flex-col">
            <label htmlFor="careers-unit" className="text-sm font-semibold text-gray-700">
              {t.filterUnit}
            </label>
            <select
              id="careers-unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="mt-1 min-h-[40px] rounded border border-gray-300 bg-white px-2 text-sm"
            >
              <option value="">{t.allUnits}</option>
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-1 flex-col">
          <label htmlFor="careers-search" className="text-sm font-semibold text-gray-700">
            {t.filterSearch}
          </label>
          <input
            id="careers-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="mt-1 min-h-[40px] rounded border border-gray-300 px-3 text-sm"
          />
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length}
      </p>

      {shown.length ? (
        <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {shown.map((c) => (
            <JobCard key={c.slug} card={c} t={t} lang={lang} />
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-lg bg-white p-6 text-center text-gray-700 shadow-sm">{t.noMatches}</p>
      )}
    </div>
  );
}
