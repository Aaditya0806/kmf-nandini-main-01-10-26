import { listRows, insertRow } from './db';
import { sendMail, notifyTo, reportEnabled } from '@/lib/mailer';

// Weekly "Notify me when available" demand report for KMF's expansion team:
// new requests in the period and all-time totals, grouped by state and city,
// with the products asked for. Sent by the Monday cron (/api/cron/demand-report)
// or from the admin page ("Send report now").

const fmtDate = (d) => new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeZone: 'Asia/Kolkata' }).format(new Date(d));

function tally(rows) {
  const states = new Map();
  const products = new Map();
  for (const r of rows) {
    const st = states.get(r.state) || { state: r.state, count: 0, cities: new Map(), products: new Map() };
    st.count += 1;
    const city = st.cities.get(r.city) || { city: r.city, count: 0, pincodes: new Set(), products: new Map() };
    city.count += 1;
    city.pincodes.add(r.pincode);
    for (const p of [...(r.products || []), ...(r.other_product ? [`Other: ${r.other_product}`] : [])]) {
      city.products.set(p, (city.products.get(p) || 0) + 1);
      st.products.set(p, (st.products.get(p) || 0) + 1);
      products.set(p, (products.get(p) || 0) + 1);
    }
    st.cities.set(r.city, city);
    states.set(r.state, st);
  }
  const top = (m, n = 5) => [...m].sort((a, b) => b[1] - a[1]).slice(0, n).map(([name, count]) => ({ name, count }));
  return {
    byState: [...states.values()]
      .sort((a, b) => b.count - a.count)
      .map((s) => ({
        state: s.state,
        count: s.count,
        products: top(s.products),
        cities: [...s.cities.values()].sort((a, b) => b.count - a.count).map((c) => ({ city: c.city, count: c.count, pincodes: c.pincodes.size, products: top(c.products, 3) })),
      })),
    products: top(products, 10),
  };
}

export async function buildDemandReport({ days = 7, now = new Date() } = {}) {
  const periodEnd = now.toISOString();
  const periodStart = new Date(now.getTime() - days * 86400e3).toISOString();
  const all = await listRows('demand_requests', { limit: 5000, select: 'created_at,state,city,pincode,products,other_product,in_karnataka' });
  const recent = all.filter((r) => r.created_at > periodStart);
  return {
    periodStart,
    periodEnd,
    days,
    newRequests: recent.length,
    totalRequests: all.length,
    outsideKarnatakaNew: recent.filter((r) => !r.in_karnataka).length,
    recent: tally(recent),
    allTime: tally(all),
  };
}

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const prodList = (ps) => ps.map((p) => `${p.name} (${p.count})`).join(', ') || '–';

function stateTableHtml(t) {
  if (!t.byState.length) return '<p style="color:#555">No requests.</p>';
  const rows = t.byState
    .flatMap((s) => [
      `<tr style="background:#eef4fb"><td colspan="3" style="padding:6px 8px;font-weight:bold">${esc(s.state)} — ${s.count}</td></tr>`,
      ...s.cities.map((c) => `<tr><td style="padding:4px 8px 4px 24px">${esc(c.city)}</td><td style="padding:4px 8px;text-align:right">${c.count}</td><td style="padding:4px 8px;color:#555">${esc(prodList(c.products))}</td></tr>`),
    ])
    .join('');
  return `<table style="border-collapse:collapse;width:100%;font-size:14px"><thead><tr style="border-bottom:2px solid #074989"><th style="text-align:left;padding:6px 8px">State / city</th><th style="text-align:right;padding:6px 8px">Requests</th><th style="text-align:left;padding:6px 8px">Products asked for</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function stateTableText(t) {
  if (!t.byState.length) return '  (no requests)';
  return t.byState.map((s) => `${s.state} — ${s.count}\n` + s.cities.map((c) => `    ${c.city}: ${c.count} (${prodList(c.products)})`).join('\n')).join('\n');
}

export function reportSubject(r) {
  return `Nandini demand report: ${r.newRequests} new request${r.newRequests === 1 ? '' : 's'} (${fmtDate(r.periodStart)} – ${fmtDate(r.periodEnd)})`;
}

export function reportHtml(r, adminUrl) {
  return `<div style="font-family:Arial,sans-serif;color:#222;max-width:760px">
<h2 style="color:#074989;margin:0 0 4px">Nandini "Notify me when available" — weekly demand report</h2>
<p style="margin:0 0 16px;color:#555">${fmtDate(r.periodStart)} to ${fmtDate(r.periodEnd)} (last ${r.days} days). Visitors of kmfnandini.coop who asked to be told when Nandini products become available near them.</p>
<table style="border-collapse:collapse;margin-bottom:16px"><tr>
<td style="padding:8px 16px;background:#f1f5fb;border-radius:6px"><div style="font-size:24px;font-weight:bold">${r.newRequests}</div><div style="font-size:12px;color:#555">new this period</div></td><td style="width:8px"></td>
<td style="padding:8px 16px;background:#f1f5fb;border-radius:6px"><div style="font-size:24px;font-weight:bold">${r.outsideKarnatakaNew}</div><div style="font-size:12px;color:#555">of them outside Karnataka</div></td><td style="width:8px"></td>
<td style="padding:8px 16px;background:#f1f5fb;border-radius:6px"><div style="font-size:24px;font-weight:bold">${r.totalRequests}</div><div style="font-size:12px;color:#555">all time</div></td>
</tr></table>
<h3 style="color:#074989;margin:16px 0 6px">New requests by state and city</h3>${stateTableHtml(r.recent)}
<p style="margin:8px 0 0"><b>Most asked-for products this period:</b> ${esc(prodList(r.recent.products))}</p>
<h3 style="color:#074989;margin:20px 0 6px">All time by state and city</h3>${stateTableHtml(r.allTime)}
<p style="margin:8px 0 0"><b>Most asked-for products all time:</b> ${esc(prodList(r.allTime.products))}</p>
<p style="margin-top:20px;font-size:13px;color:#555">Names and contact details of the visitors are in the website admin page${adminUrl ? ` (<a href="${esc(adminUrl)}">${esc(adminUrl)}</a>)` : ''}, where the full list can be downloaded as CSV. State is worked out from the PIN code and is approximate near state borders.</p>
</div>`;
}

export function reportText(r, adminUrl) {
  return [
    `Nandini "Notify me when available" — weekly demand report`,
    `${fmtDate(r.periodStart)} to ${fmtDate(r.periodEnd)} (last ${r.days} days)`,
    '',
    `New requests: ${r.newRequests} (${r.outsideKarnatakaNew} outside Karnataka). All time: ${r.totalRequests}.`,
    '',
    'NEW REQUESTS BY STATE AND CITY',
    stateTableText(r.recent),
    `Most asked-for products this period: ${prodList(r.recent.products)}`,
    '',
    'ALL TIME BY STATE AND CITY',
    stateTableText(r.allTime),
    `Most asked-for products all time: ${prodList(r.allTime.products)}`,
    '',
    `Contact details and CSV download: ${adminUrl || 'website admin page'}.`,
  ].join('\n');
}

// Builds, emails and records the report. Returns the stored row, or null when
// the email report is switched off (FORMS_NOTIFY_TO unset): the same numbers
// are always visible on /admin/forms?tab=demand.
export async function sendDemandReport({ trigger = 'cron', days = 7, adminUrl = '' } = {}) {
  if (!reportEnabled()) return null;
  const r = await buildDemandReport({ days });
  const summary = { recent: r.recent, allTime: r.allTime, outsideKarnatakaNew: r.outsideKarnatakaNew };
  let sent = false;
  let error = null;
  let to = notifyTo();
  {
    try {
      to = await sendMail({ to, subject: reportSubject(r), text: reportText(r, adminUrl), html: reportHtml(r, adminUrl) });
      sent = true;
    } catch (e) {
      error = String(e?.message || e).slice(0, 300);
    }
  }
  return insertRow('demand_reports', {
    period_start: r.periodStart,
    period_end: r.periodEnd,
    trigger,
    new_requests: r.newRequests,
    total_requests: r.totalRequests,
    sent_to: to.join(', '),
    sent,
    error,
    summary,
  });
}
