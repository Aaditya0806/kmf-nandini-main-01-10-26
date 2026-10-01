import Link from 'next/link';
import { adminData } from '@/lib/ask-nandini/log';
import { siteEventCounts } from '@/lib/site-events';
import { INTENT_OPTIONS } from '@/configtext/intentPopup';

// /admin/ask-nandini — protected by Basic auth in src/middleware.js.
export const dynamic = 'force-dynamic';
export const metadata = { title: { absolute: 'Ask Nandini admin' }, robots: { index: false, follow: false } };

const LANG_NAMES = { en: 'English', kn: 'Kannada', hi: 'Hindi', ta: 'Tamil', te: 'Telugu', ml: 'Malayalam', 'kn-latn': 'Kanglish', 'ta-latn': 'Tanglish', 'hi-latn': 'Hinglish', unknown: 'Unknown' };
const pct = (n, d) => (d ? `${Math.round((100 * n) / d)}%` : '–');
const when = (iso) =>
  new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date(iso));

function Card({ label, value, note }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
      {note && <p className="text-xs text-gray-500">{note}</p>}
    </div>
  );
}

function Section({ title, hint, children }) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold text-primary-main">{title}</h2>
      {hint && <p className="text-sm text-gray-600">{hint}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Rows({ rows, showAnswer }) {
  if (!rows?.length) return <p className="rounded bg-white p-4 text-sm text-gray-500 shadow-sm">Nothing yet.</p>;
  return (
    <ul className="divide-y divide-gray-200 rounded-lg bg-white shadow-sm">
      {rows.map((r, i) => (
        <li key={i} className="p-3 text-sm">
          <p className="font-semibold text-gray-900">{r.question}</p>
          <p className="text-xs text-gray-500">
            {when(r.created_at)} · {LANG_NAMES[r.lang] || r.lang || '–'} · {r.page || '–'}
            {r.missing ? ` · missing: ${r.missing}` : ''}
          </p>
          {showAnswer && r.answer && <p className="mt-1 whitespace-pre-wrap rounded bg-gray-50 p-2 text-xs text-gray-700">{r.answer}</p>}
        </li>
      ))}
    </ul>
  );
}

export default async function AskNandiniAdmin({ searchParams }) {
  const days = [7, 30, 90].includes(Number(searchParams?.days)) ? Number(searchParams.days) : 30;
  let data;
  let clicks = [];
  let error = null;
  try {
    [data, clicks] = await Promise.all([adminData(days), siteEventCounts(days)]);
  } catch (e) {
    error = e.message;
  }
  const count = (event, value) => clicks.filter((c) => c.event === event && (value === undefined || c.value === value)).reduce((n, c) => n + Number(c.clicks), 0);
  const credit = { footer: count('credit_click', 'footer'), chat: count('credit_click', 'chat') };
  const popupRows = [
    ...INTENT_OPTIONS.map((o) => ({ label: o.en, n: count('intent_selected', o.id) })),
    { label: 'Closed without choosing', n: count('intent_dismissed'), muted: true },
  ];
  const popupTotal = popupRows.reduce((n, r) => n + r.n, 0);
  const s = data?.summary || {};
  const langs = Object.entries(s.langs || {}).sort((a, b) => b[1] - a[1]);

  return (
    <main className="min-h-screen bg-[#F6F6F6] px-4 pb-16 pt-44">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-heading text-2xl font-extrabold text-primary-main">Ask Nandini — questions, gaps & clicks</h1>
            <p className="text-sm text-gray-600">Anonymised visitor questions (personal details removed). Kept 90 days. {data?.source && `Source: ${data.source}.`}</p>
          </div>
          <nav className="flex gap-2 text-sm" aria-label="Period">
            {[7, 30, 90].map((d) => (
              <Link key={d} href={`/admin/ask-nandini?days=${d}`} className={`rounded-full px-3 py-1 font-semibold ${d === days ? 'bg-primary-main text-white' : 'bg-white text-primary-main shadow-sm'}`}>
                {d} days
              </Link>
            ))}
          </nav>
        </div>

        {error ? (
          <p className="mt-6 rounded bg-red-50 p-4 text-sm text-red-800">Could not load data: {error}</p>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              <Card label="Questions" value={s.total ?? 0} />
              <Card label="Answered" value={pct(s.answered, s.total)} note={`${s.answered ?? 0} answered from KMF data`} />
              <Card label="Not answered" value={s.unanswered ?? 0} note="content KMF could add" />
              <Card label="Feedback" value={`👍 ${s.up ?? 0} · 👎 ${s.down ?? 0}`} />
              <Card label="Stored replies" value={pct(s.stored ?? 0, s.total)} note={`${s.stored ?? 0} answered without Claude (free, instant)`} />
              <Card label="Limits hit" value={(s.fallbacks?.rate_limited ?? 0) + (s.fallbacks?.daily_cap ?? 0)} note={`${s.fallbacks?.daily_cap ?? 0} daily-cap`} />
              <Card label="Errors" value={s.fallbacks?.error ?? 0} note="shown contact options instead" />
              <Card label="Est. model cost" value={`$${Number(s.cost_usd || 0).toFixed(2)}`} note="Claude list price" />
              <Card label="Tokens" value={`${Math.round((s.tokens_in || 0) / 1000)}k in`} note={`${Math.round((s.tokens_out || 0) / 1000)}k out`} />
            </div>

            <Section title="Unanswered questions" hint="The assistant had no KMF data for these. Adding this content to the website fixes them.">
              <Rows rows={data.unanswered} />
            </Section>

            <Section title="Top questions">
              {data.top?.length ? (
                <ol className="divide-y divide-gray-200 rounded-lg bg-white shadow-sm">
                  {data.top.map((t, i) => (
                    <li key={i} className="flex justify-between gap-3 p-3 text-sm">
                      <span>{t.question}</span>
                      <span className="font-bold text-gray-700">{t.n}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="rounded bg-white p-4 text-sm text-gray-500 shadow-sm">Nothing yet.</p>
              )}
            </Section>

            <Section title="Languages visitors wrote in" hint="Replies are English only for now; this shows demand for other languages.">
              <div className="flex flex-wrap gap-2">
                {langs.length ? (
                  langs.map(([l, n]) => (
                    <span key={l} className="rounded-full bg-white px-3 py-1 text-sm shadow-sm">
                      {LANG_NAMES[l] || l}: <strong>{n}</strong> ({pct(n, s.total)})
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">Nothing yet.</span>
                )}
              </div>
            </Section>

            <Section title="Answers marked 👎" hint="Check these for wrong or unhelpful answers.">
              <Rows rows={data.down} showAnswer />
            </Section>

            <Section title="Velozity credit clicks" hint="Visitors who clicked the Velozity Global link (each visitor counted once per day).">
              <div className="grid grid-cols-3 gap-3">
                <Card label="Site footer" value={credit.footer} />
                <Card label="Chatbot" value={credit.chat} note="“Powered by Velozity Global”" />
                <Card label="Total" value={credit.footer + credit.chat} />
              </div>
            </Section>

            <Section title="“What brings you here today?” choices" hint="What visitors picked in the popup (each visitor counted once per option per day).">
              <ul className="divide-y divide-gray-200 rounded-lg bg-white shadow-sm">
                {popupRows
                  .slice()
                  .sort((a, b) => (a.muted ? 1 : 0) - (b.muted ? 1 : 0) || b.n - a.n)
                  .map((r) => (
                    <li key={r.label} className="flex items-center gap-3 p-3 text-sm">
                      <span className={`w-56 shrink-0 ${r.muted ? 'text-gray-500' : 'font-semibold text-gray-900'}`}>{r.label}</span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
                        <span className={`block h-full rounded-full ${r.muted ? 'bg-gray-300' : 'bg-primary-main'}`} style={{ width: popupTotal ? `${(100 * r.n) / popupTotal}%` : 0 }} />
                      </span>
                      <span className="w-20 text-right font-bold text-gray-700">
                        {r.n} <span className="font-normal text-gray-400">{pct(r.n, popupTotal)}</span>
                      </span>
                    </li>
                  ))}
              </ul>
            </Section>
          </>
        )}
      </div>
    </main>
  );
}
