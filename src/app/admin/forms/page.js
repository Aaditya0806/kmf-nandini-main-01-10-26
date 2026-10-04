import Link from 'next/link';
import { listRows, countRows, dbConfigured } from '@/lib/forms/db';
import { buildDemandReport } from '@/lib/forms/report';
import { whenIST } from '@/lib/forms/admin';
import { reportEnabled, notifyTo } from '@/lib/mailer';
import { DEALER_TYPES, INVESTMENT_RANGES, COMPLAINT_CATEGORIES, COMPLAINT_STATUS } from '@/configtext/forms';

// /admin/forms — dealer applications, "notify me" demand and complaint tickets.
// Protected by Basic auth in src/middleware.js.
export const dynamic = 'force-dynamic';
export const metadata = { title: { absolute: 'KMF forms admin' }, robots: { index: false, follow: false } };

const TABS = [
  ['dealers', 'Dealer applications'],
  ['demand', 'Notify-me demand'],
  ['complaints', 'Complaints'],
];
const DEALER_STATUS = { new: 'New', contacted: 'Contacted', closed: 'Closed' };
const TONE = { new: 'bg-blue-50 text-blue-800', open: 'bg-blue-50 text-blue-800', contacted: 'bg-amber-50 text-amber-800', in_progress: 'bg-amber-50 text-amber-800', resolved: 'bg-emerald-50 text-emerald-800', closed: 'bg-gray-100 text-gray-700', rejected: 'bg-gray-100 text-gray-700' };
const label = (list, v) => list.find((x) => x.value === v)?.en || v || '–';

function Card({ label: l, value, note }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase text-gray-500">{l}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
      {note && <p className="text-xs text-gray-500">{note}</p>}
    </div>
  );
}
const Badge = ({ status, text }) => <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${TONE[status] || 'bg-gray-100'}`}>{text}</span>;
const Dl = ({ items }) => (
  <dl className="mt-2 grid gap-x-4 gap-y-1 text-sm sm:grid-cols-2">
    {items
      .filter(([, v]) => v !== null && v !== undefined && v !== '')
      .map(([k, v]) => (
        <div key={k} className="flex gap-2">
          <dt className="w-28 shrink-0 text-gray-500">{k}</dt>
          <dd className="break-words text-gray-900">{v}</dd>
        </div>
      ))}
  </dl>
);
const input = 'min-h-[36px] rounded-lg border border-gray-300 bg-white px-2 text-sm';
const btn = 'min-h-[36px] rounded-lg bg-primary-main px-3 text-sm font-semibold text-white';

function StatusForm({ type, row, statuses, back, noteField, notePlaceholder, notified }) {
  return (
    <form method="post" action="/admin/forms/update" className="mt-3 flex flex-wrap items-end gap-2 border-t border-gray-100 pt-3">
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="id" value={row.id} />
      <input type="hidden" name="back" value={back} />
      {statuses && (
        <label className="text-xs text-gray-600">
          Status
          <select name="status" defaultValue={row.status} className={`${input} ml-1`}>
            {Object.entries(statuses).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
      )}
      {noteField && (
        <label className="flex-1 text-xs text-gray-600">
          {noteField === 'status_note' ? 'Note shown to the visitor' : 'Internal note'}
          <input name={noteField} defaultValue={row[noteField] || ''} placeholder={notePlaceholder} className={`${input} ml-1 w-full`} maxLength={500} />
        </label>
      )}
      {notified !== undefined && (
        <label className="text-xs text-gray-600">
          <input type="checkbox" name="notified" value={row.notified_at ? 'no' : 'yes'} className="mr-1 accent-primary-main" /> {row.notified_at ? 'Clear "notified"' : 'Mark as notified'}
        </label>
      )}
      <button type="submit" className={btn}>
        Save
      </button>
    </form>
  );
}

export default async function FormsAdmin({ searchParams }) {
  const tab = TABS.some(([k]) => k === searchParams?.tab) ? searchParams.tab : 'dealers';
  const status = typeof searchParams?.status === 'string' ? searchParams.status.replace(/[^\w]/g, '') : '';
  const pageNo = Math.max(parseInt(searchParams?.p, 10) || 1, 1);
  const PAGE = 50;
  const back = `/admin/forms?tab=${tab}${status ? `&status=${status}` : ''}&p=${pageNo}`;

  let error = null;
  let counts = {};
  let rows = [];
  let total = 0;
  let report = null;
  let reports = [];
  try {
    const [dNew, dAll, nAll, nWeek, cOpen, cAll] = await Promise.all([
      countRows('dealer_applications', 'status=eq.new'),
      countRows('dealer_applications'),
      countRows('demand_requests'),
      countRows('demand_requests', `created_at=gt.${new Date(Date.now() - 7 * 86400e3).toISOString()}`),
      countRows('complaints', 'status=in.(open,in_progress)'),
      countRows('complaints'),
    ]);
    counts = { dNew, dAll, nAll, nWeek, cOpen, cAll };
    const table = { dealers: 'dealer_applications', demand: 'demand_requests', complaints: 'complaints' }[tab];
    const filter = status ? `status=eq.${status}` : '';
    [rows, total] = await Promise.all([listRows(table, { filter, limit: PAGE, offset: (pageNo - 1) * PAGE }), countRows(table, filter)]);
    if (tab === 'demand') [report, reports] = await Promise.all([buildDemandReport({ days: 7 }), listRows('demand_reports', { limit: 10 })]);
  } catch (e) {
    error = e.message;
  }
  const pages = Math.max(1, Math.ceil(total / PAGE));
  const pageHref = (p) => `/admin/forms?tab=${tab}${status ? `&status=${status}` : ''}&p=${p}`;

  return (
    <main className="min-h-screen bg-[#F6F6F6] px-4 pb-16 pt-44">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-heading text-2xl font-extrabold text-primary-main">Website forms — dealers, demand & complaints</h1>
            <p className="text-sm text-gray-600">
              Submissions from the website forms. Personal details are visible here only.{' '}
              <Link href="/admin/ask-nandini" className="font-semibold text-primary-main underline">
                Ask Nandini admin →
              </Link>
            </p>
          </div>
        </div>

        {!dbConfigured() && <p className="mt-4 rounded bg-amber-50 p-3 text-sm text-amber-900">Supabase is not configured: showing in-memory data from this server only (local development).</p>}
        {searchParams?.report === 'sent' && <p className="mt-4 rounded bg-emerald-50 p-3 text-sm text-emerald-900">Report sent to {notifyTo().join(', ')}.</p>}
        {searchParams?.report === 'failed' && <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-900">The report could not be sent; see the report history below for the reason.</p>}
        {searchParams?.report === 'off' && <p className="mt-4 rounded bg-amber-50 p-3 text-sm text-amber-900">The email report is switched off (no FORMS_NOTIFY_TO set). The same summary is shown below.</p>}

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Card label="New dealer applications" value={counts.dNew ?? 0} note={`${counts.dAll ?? 0} in total`} />
          <Card label="Notify-me requests" value={counts.nAll ?? 0} note={`${counts.nWeek ?? 0} in the last 7 days`} />
          <Card label="Open complaints" value={counts.cOpen ?? 0} note={`${counts.cAll ?? 0} in total`} />
          <Card label="Weekly email report" value={reportEnabled() ? 'Mon 9:00' : 'off'} note={reportEnabled() ? `to ${notifyTo().join(', ')}` : 'optional; everything is shown here'} />
        </div>

        <nav className="mt-6 flex flex-wrap gap-2 text-sm" aria-label="Sections">
          {TABS.map(([k, l]) => (
            <Link key={k} href={`/admin/forms?tab=${k}`} className={`rounded-full px-4 py-1.5 font-semibold ${k === tab ? 'bg-primary-main text-white' : 'bg-white text-primary-main shadow-sm'}`}>
              {l}
            </Link>
          ))}
          <a href={`/admin/forms/export?type=${tab}`} className="ml-auto rounded-full bg-white px-4 py-1.5 font-semibold text-primary-main shadow-sm hover:bg-primary-main hover:text-white">
            ⬇ Download CSV
          </a>
        </nav>

        {error && <p className="mt-6 rounded bg-red-50 p-4 text-sm text-red-800">Could not load data: {error}</p>}

        {!error && tab === 'demand' && report && (
          <section className="mt-6 rounded-lg bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-primary-main">Demand by state and city — last 7 days</h2>
                <p className="text-sm text-gray-600">
                  {report.newRequests} new requests ({report.outsideKarnatakaNew} outside Karnataka), {report.totalRequests} all time. Grouped by state and city, with the products asked for.
                </p>
              </div>
              <form method="post" action="/admin/forms/send-report" className="flex items-center gap-2">
                <select name="days" defaultValue="7" className={input}>
                  <option value="7">last 7 days</option>
                  <option value="30">last 30 days</option>
                  <option value="90">last 90 days</option>
                </select>
                <button type="submit" className={btn} disabled={!reportEnabled()} title={reportEnabled() ? '' : 'Set FORMS_NOTIFY_TO to enable the email report'}>
                  Email report now
                </button>
              </form>
            </div>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {[
                ['Last 7 days', report.recent],
                ['All time', report.allTime],
              ].map(([title, t]) => (
                <div key={title}>
                  <h3 className="text-sm font-bold uppercase text-gray-500">{title}</h3>
                  {t.byState.length ? (
                    <ul className="mt-2 divide-y divide-gray-100 text-sm">
                      {t.byState.map((s) => (
                        <li key={s.state} className="py-2">
                          <p className="flex justify-between font-semibold text-gray-900">
                            <span>{s.state}</span>
                            <span>{s.count}</span>
                          </p>
                          <ul className="mt-1 space-y-0.5 pl-3 text-gray-700">
                            {s.cities.slice(0, 8).map((c) => (
                              <li key={c.city} className="flex justify-between gap-2">
                                <span>
                                  {c.city} <span className="text-gray-400">({c.pincodes} PIN{c.pincodes === 1 ? '' : 's'})</span>
                                  {c.products.length > 0 && <span className="text-gray-500"> · {c.products.map((p) => `${p.name} ${p.count}`).join(', ')}</span>}
                                </span>
                                <span className="font-semibold">{c.count}</span>
                              </li>
                            ))}
                            {s.cities.length > 8 && <li className="text-gray-400">+{s.cities.length - 8} more cities (see CSV)</li>}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-gray-500">Nothing yet.</p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">Top products: {t.products.map((p) => `${p.name} (${p.count})`).join(', ') || '–'}</p>
                </div>
              ))}
            </div>
            <details className="mt-4 text-sm">
              <summary className="cursor-pointer font-semibold text-gray-700">Emailed reports ({reports.length})</summary>
              <ul className="mt-2 divide-y divide-gray-100">
                {reports.map((r) => (
                  <li key={r.id} className="flex flex-wrap justify-between gap-2 py-1.5">
                    <span>
                      {whenIST(r.created_at)} · {r.trigger} · {r.new_requests} new / {r.total_requests} total
                    </span>
                    <span className={r.sent ? 'text-emerald-700' : 'text-red-700'}>{r.sent ? `sent to ${r.sent_to}` : `not sent: ${r.error}`}</span>
                  </li>
                ))}
                {!reports.length && <li className="py-1.5 text-gray-500">No reports yet.</li>}
              </ul>
            </details>
          </section>
        )}

        {!error && (
          <section className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-primary-main">
                {TABS.find(([k]) => k === tab)[1]} <span className="text-sm font-normal text-gray-500">({total})</span>
              </h2>
              {tab !== 'demand' && (
                <div className="flex flex-wrap gap-1 text-xs">
                  {[['', 'All'], ...Object.entries(tab === 'dealers' ? DEALER_STATUS : Object.fromEntries(Object.entries(COMPLAINT_STATUS).map(([k, v]) => [k, v.en])))].map(([v, l]) => (
                    <Link key={v} href={`/admin/forms?tab=${tab}${v ? `&status=${v}` : ''}`} className={`rounded-full px-3 py-1 font-semibold ${v === status ? 'bg-primary-main text-white' : 'bg-white text-primary-main shadow-sm'}`}>
                      {l}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {rows.length ? (
              <ul className="mt-3 space-y-3">
                {rows.map((r) => (
                  <li key={r.id} className="rounded-lg bg-white p-4 text-sm shadow-sm">
                    {tab === 'dealers' && (
                      <>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-semibold text-gray-900">
                            <span className="font-mono text-primary-main">{r.ticket}</span> · {label(DEALER_TYPES, r.type)} · {r.city}, {r.state}
                          </p>
                          <span className="text-xs text-gray-500">
                            {whenIST(r.created_at)} · <Badge status={r.status} text={DEALER_STATUS[r.status] || r.status} />
                          </span>
                        </div>
                        <Dl
                          items={[
                            ['Name', r.name],
                            ['Mobile', r.mobile],
                            ['Email', r.email],
                            ['Business', r.organisation],
                            ['Address', [r.city, r.district, r.state, r.pincode].filter(Boolean).join(', ')],
                            ['Has shop', r.has_shop == null ? '' : r.has_shop ? 'yes' : 'no'],
                            ['Investment', label(INVESTMENT_RANGES, r.investment)],
                            ['Shop / experience', r.shop_details],
                            ['Message', r.message],
                            ['Language', r.lang],
                          ]}
                        />
                        <StatusForm type="dealer" row={r} statuses={DEALER_STATUS} back={back} noteField="admin_note" notePlaceholder="e.g. called 5 Oct, sending to Mysuru union" />
                      </>
                    )}
                    {tab === 'demand' && (
                      <>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-semibold text-gray-900">
                            {r.city}, {r.state} <span className="font-mono text-gray-500">{r.pincode}</span>
                            {r.in_karnataka && <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-800">Karnataka</span>}
                          </p>
                          <span className="text-xs text-gray-500">
                            {whenIST(r.created_at)}
                            {r.notified_at && <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-800">notified {whenIST(r.notified_at)}</span>}
                          </span>
                        </div>
                        <Dl
                          items={[
                            ['Products', [...(r.products || []), ...(r.other_product ? [`Other: ${r.other_product}`] : [])].join(', ')],
                            ['Name', r.name],
                            ['Mobile', r.mobile],
                            ['Email', r.email],
                            ['Note', r.note],
                            ['Language', r.lang],
                          ]}
                        />
                        <StatusForm type="demand" row={r} back={back} notified />
                      </>
                    )}
                    {tab === 'complaints' && (
                      <>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-semibold text-gray-900">
                            <span className="font-mono text-primary-main">{r.ticket}</span> · {label(COMPLAINT_CATEGORIES, r.category)}
                            {r.product ? ` · ${r.product}` : ''}
                          </p>
                          <span className="text-xs text-gray-500">
                            {whenIST(r.created_at)} · <Badge status={r.status} text={COMPLAINT_STATUS[r.status]?.en || r.status} />
                          </span>
                        </div>
                        <p className="mt-2 whitespace-pre-wrap rounded bg-gray-50 p-3 text-gray-800">{r.description}</p>
                        <div className="mt-2 flex flex-wrap gap-4">
                          <div className="flex-1">
                            <Dl
                              items={[
                                ['Bought from', r.purchased_from],
                                ['Purchase date', r.purchase_date],
                                ['Batch', r.batch],
                                ['Place', [r.city, r.pincode].filter(Boolean).join(' ')],
                                ['Name', r.name],
                                ['Mobile', r.mobile],
                                ['Email', r.email],
                                ['Updated', whenIST(r.updated_at)],
                                ['Language', r.lang],
                              ]}
                            />
                          </div>
                          {r.photo_path && (
                            <a href={`/admin/forms/photo/${r.id}`} target="_blank" rel="noopener" className="shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={`/admin/forms/photo/${r.id}`} alt={`Photo for ${r.ticket}`} className="h-28 w-28 rounded-lg object-cover ring-1 ring-black/10" loading="lazy" />
                            </a>
                          )}
                        </div>
                        <StatusForm type="complaint" row={r} statuses={Object.fromEntries(Object.entries(COMPLAINT_STATUS).map(([k, v]) => [k, v.en]))} back={back} noteField="status_note" notePlaceholder="shown when the visitor checks the ticket" />
                        {r.admin_note && <p className="mt-1 text-xs text-gray-500">Internal note: {r.admin_note}</p>}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 rounded bg-white p-4 text-sm text-gray-500 shadow-sm">Nothing yet.</p>
            )}
            {pages > 1 && (
              <nav className="mt-3 flex items-center justify-between text-sm" aria-label="Pages">
                <span className="text-gray-600">
                  Page {pageNo} of {pages}
                </span>
                <div className="flex gap-2">
                  {pageNo > 1 && (
                    <Link href={pageHref(pageNo - 1)} className="rounded-full bg-white px-4 py-2 font-semibold text-primary-main shadow-sm">
                      ← Newer
                    </Link>
                  )}
                  {pageNo < pages && (
                    <Link href={pageHref(pageNo + 1)} className="rounded-full bg-white px-4 py-2 font-semibold text-primary-main shadow-sm">
                      Older →
                    </Link>
                  )}
                </div>
              </nav>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
