// Small helpers shared by the form API routes.
export const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
export const bad = (error, fields = undefined, status = 400) => json({ error, fields }, status);

// Lang/page context the forms send with every submission (for the admin page only).
export function context(body) {
  return {
    lang: body?.lang === 'kn' ? 'kn' : 'en',
    page: typeof body?.page === 'string' ? body.page.slice(0, 200) : null,
  };
}

// Admin page link for emails (set NEXT_PUBLIC_SITE_URL in production).
export const adminUrl = (tab) => `${(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kmfnandini.coop').replace(/\/$/, '')}/admin/forms?tab=${tab}`;

// Server log only: never the visitor's text.
export const logError = (where, e) => console.error(`[forms:${where}]`, e?.name || 'Error', String(e?.message || '').slice(0, 300));
