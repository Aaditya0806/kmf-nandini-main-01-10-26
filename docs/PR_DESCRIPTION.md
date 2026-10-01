## KMF Nandini: site fixes, Careers page, visitor-intent popup

**No Strapi changes. No URL changes. Every existing sitemap URL still returns 200.**

### Why
GA showed an empty or "404" page title everywhere, zero key events, many job-seeker visitors (testbook/enggwave referrals) with no careers page, broken links (Bulk Order → "coming soon", header contact → 404, empty footer link), and unknown URLs returning the home page with a 200.

### What
**Analytics:** one helper (`src/lib/analytics.js`) plus a delegated link listener. New events: `generate_lead` (`form_category`), `file_download`, `click_to_call` / `click_whatsapp` / `click_email`, `intent_selected` / `intent_dismissed`, `career_view_job` / `career_apply_click`, `page_404`. No PII. GA4 still loaded once; `page_view` stays with enhanced measurement.

**SEO:** the root layout is now a server component (providers moved unchanged). Every page has a title, description, canonical, hreflang (en/kn), Open Graph, `<html lang>`, and Organization JSON-LD. Detail pages use the real item name from Strapi (timeout plus fallback).

**404s and redirects:** a real bilingual 404 page, bogus first path segments now 404 (small middleware), and 301s for `/careers`, `/recruitment`, `/about`, `/contact`, `/{en,kn}/contact-us`, `/en-IN/*`, `/kn-IN/*`.

**Links:**
- Bulk Order now opens the contact form with the Bulk Order category, fixed in all 5 places.
- The contact-us links are fixed.
- The `/en` home no longer links English visitors to `/kn` pages.
- KMF-MIS is plain text until a URL is supplied.
- The Velozity credit has the UTM link.

**Contact form:** Kannada category labels, a new "Bulk Order" category, and `?category=` pre-selection. Submitted values are unchanged.

**Careers (`/en/careers`, `/kn/careers`):**
- The page has openings with filters, results and admit cards, an archive, an FAQ, and a fake-recruitment warning.
- Detail pages carry `JobPosting` JSON-LD while a post is open.
- The data file ships **empty**, so the page shows "No current openings" until KMF publishes a notice (`docs/CAREERS.md`).
- The Strapi collection is planned for Release B (`docs/STRAPI_CHANGES.md`).

**Intent popup:** "What brings you here today?" routes visitors to the right page.
- It shows once per visitor, on landing pages only, and is lazy-loaded.
- It's accessible (focus trap, Esc, bottom sheet on mobile).
- It's controlled by `NEXT_PUBLIC_INTENT_POPUP=on`.

**Quick wins:** floating WhatsApp and toll-free buttons (tracked), and security headers (`nosniff`, `Referrer-Policy`, `frame-ancestors 'self'`).

### Verification
- `next build` passes. `next lint` shows 0 errors and 53 warnings, the same as the baseline.
- `node scripts/check-urls.mjs` against the production build: 81/81 pages return 200, 10/10 redirects return 301 to a 200, and 4/4 unknown URLs return 404.
- Metadata and JSON-LD were checked in the server HTML with curl. The analytics helpers pass a Node test.
- `scripts/browser-check.mjs` (Playwright, GA hits intercepted): **40/40**. That covers page_view per navigation, all new events, no PII, popup behaviour (desktop, mobile, Kannada, storage blocked), contact pre-select, and a nav row identical to production at 1024/1280 px.
- ⚠️ Still needs a person on the preview: the overall look, a real contact-form email, and GA4 DebugView (`docs/DEPLOY_AND_ROLLBACK.md`). **GA4 admin: turn off Enhanced measurement → File downloads**, or PDF downloads count twice.

### Deploy
Preview first, run the checklist, then promote. For rollback, use Vercel Instant Rollback. To turn off only the popup, set `NEXT_PUBLIC_INTENT_POPUP=off` and redeploy. Details are in `docs/DEPLOY_AND_ROLLBACK.md`, and the full change list is in `CHANGES.md`.

### Follow-ups
- A native speaker should review the new Kannada text.
- Supply the KMF-MIS URL.
- Paste the Search Console 404 export into `docs/REDIRECTS.md`.
- Existing Strapi endpoint failures (404/403) are listed in `CHANGES.md`.
- `next/image` migration and server-side data fetching are for a later release.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
