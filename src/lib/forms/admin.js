// Helpers for the /admin/forms pages and routes (Basic auth is in src/middleware.js).

// Browsers send Basic-auth credentials automatically, so state-changing admin
// routes also require the request to come from this site (no cross-site POSTs).
export function sameOrigin(req) {
  const site = req.headers.get('sec-fetch-site');
  if (site && site !== 'same-origin' && site !== 'none') return false;
  const origin = req.headers.get('origin');
  if (origin) {
    try {
      return new URL(origin).host === req.headers.get('host');
    } catch (e) {
      return false;
    }
  }
  return true;
}

export const redirectTo = (path) => new Response(null, { status: 303, headers: { location: path } });

// CSV cell: quoted, formulas neutralised (=, +, -, @) so Excel can't run them.
export const csvCell = (v) => {
  const s = v == null ? '' : Array.isArray(v) ? v.join('; ') : String(v);
  return `"${(/^[=+\-@]/.test(s) ? `'${s}` : s).replace(/"/g, '""')}"`;
};

export const csvResponse = (name, header, rows) => {
  const body = '﻿' + [header.map(csvCell).join(','), ...rows.map((r) => r.map(csvCell).join(','))].join('\r\n');
  return new Response(body, {
    headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': `attachment; filename="${name}"`, 'cache-control': 'no-store' },
  });
};

export const whenIST = (iso) => (iso ? new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(new Date(iso)) : '–');
