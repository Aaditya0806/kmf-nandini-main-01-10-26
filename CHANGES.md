# CHANGES — branch `feat/site-fixes-careers-intent`

Baseline: commit `6196fc1` "baseline: zip snapshot (matches live sitemap)". The folder had no git history; the snapshot's `sitemap.js` produces exactly the 79 URLs of the live `/sitemap.xml`, and the live site runs on Vercel with GA4 `G-164VVDS7P1`, as this code does.

**Not changed:** Strapi (no content, types, fields, roles or permissions), how pages fetch Strapi data (`src/hooks/useApi.js` and every `axios.get` call are untouched), any existing URL, and the visual design of existing pages.

---

## Phase 1 — Analytics

| Change | Files | Why |
|---|---|---|
| All GA4 events go through one helper; it never throws and never sends PII | `src/lib/analytics.js` | GA recorded zero key events; no scattered `window.gtag` calls |
| One delegated click listener: `file_download` (PDF/doc links), `click_to_call`, `click_whatsapp`, `click_email` with `location` + `section` | `src/components/AnalyticsListener.js` | Measure downloads and contact intent without touching every link |
| PDF "Review" / "View Fullscreen" buttons (not links) tracked explicitly | `blog/notification/Tenders.js`, `blog/notification/PdfPreview.js`, `portfolio/PdfPreview.js` | These open PDFs via `window.open`/iframe, which the listener can't see |
| `generate_lead` now sends `form_category` (was `lead_reason`) | `contact/page.js` | Per spec |
| GA4 still loaded once (`next/script`, afterInteractive); `page_view` stays with enhanced measurement (history changes), no manual `page_view` | `src/app/layout.js` | Avoid double counting |
| GA4 admin guide | `docs/GA4_SETUP.md` | Key events, custom dimensions, Search Console link |

## Phase 2 — SEO, broken links, 404s

| Change | Files | Why |
|---|---|---|
| Root layout converted to a **server component**; all client providers moved **unchanged** into `Providers` | `src/app/layout.js`, `src/components/Providers.js` | Server layouts can export metadata |
| Per-page `<title>`, description, canonical, `hreflang` (en/kn/x-default), Open Graph, in English and Kannada | `src/lib/seo.js`, 51 × `src/app/[locale]/**/layout.js` | Every live page had `<title></title>`; that's why GA's only page title was the 404 one |
| `[slug]` detail pages: item name fetched from Strapi on the server (2.5 s timeout, cached 10 min, falls back to the section title) | `src/lib/seo.js` (`detailMetadata`) | e.g. "Akki Payasa – Nandini Recipes \| KMF Nandini" |
| Internal pages (`secret-info*`, `privateinfo`, `comingsoon`, `404`) marked `noindex` | `src/lib/seo.js` | Keep them out of search |
| `<html lang="kn">` on Kannada pages (tiny inline script in the `[locale]` layout) | `src/app/[locale]/layout.js` | Reading headers in the root layout would make the static home page `/` dynamic |
| Organization JSON-LD site-wide (name, logo, address, both phone lines, socials) | `src/lib/jsonld.js`, `src/lib/site.js`, `public/brand/kmf-nandini-logo.png` | Brand knowledge panel / rich results |
| **Soft-404 fix:** any first path segment other than `en`/`kn` (e.g. `/xyz`, `/xyz/contact`) now returns a real 404 instead of the home page with 200 | `src/middleware.js`, `src/app/[locale]/layout.js` | The middleware only runs for such paths (not `/`, `/en/*`, `/kn/*`, `/api`, `/_next`, files) |
| Bilingual not-found page with links (Products, Careers, Notifications, Contact, Home); fires `page_404` | `src/app/not-found.js`, `src/components/NotFoundContent.js` | Helpful dead-end, measurable 404s |
| 301 redirects: `/careers`, `/recruitment` → `/en/careers`; `/about` → `/en/about/company-profile`; `/contact`, `/en/contact-us`, `/kn/contact-us` → `/{lang}/contact`; `/en-IN/*`, `/kn-IN/*` → `/en/*`, `/kn/*` | `next.config.js`, `docs/REDIRECTS.md` | Dead/guessed URLs; space left for the Search Console 404 export |
| Bulk Order (5 places) → `/{lang}/contact?category=bulk-order` | `configtext/header.js` (×2), `components/Header.js`, `app/page.js`, `app/[locale]/page.js` | Was a "coming soon" dead end |
| Header (×2) and portfolio "contact-us" links → `/{lang}/contact` | `components/Header.js`, `portfolio/page.js` | Pointed to `/en/contact-us`, a 404 |
| **/en home no longer sends English visitors to Kannada pages** (7 hard-coded `/kn/` links → current language) | `app/[locale]/page.js` | `[locale]/page.js` serves both `/en` and `/kn` |
| Contact form: Kannada labels for the category dropdown, new **Bulk Order** category, pre-selects from `?category=` (`quality`, `mrp`, `new-agency-parlour`, `product-non-availability`, `bulk-order`, `others`). **Submitted values unchanged**, so emails look the same | `contact/page.js` | Popup/nav deep links; KN parity |
| Footer "KMF-MIS (CENTRAL OFFICE)" shown as plain text until `KMF_MIS_URL` is filled in (TODO constant) | `components/Footer.js` | Was an empty link on every page |
| Velozity credit → UTM-tagged `velozityglobal.com` link | `components/Footer.js` | Referral attribution |

## Phase 3 — Careers

| Change | Files | Why |
|---|---|---|
| `/en/careers`, `/kn/careers`: hero, fake-recruitment warning, filterable openings (status / unit / search, "closing soon" badge, PDF + Apply), results & admit cards, past recruitments, FAQ | `src/app/[locale]/careers/*`, `src/components/careers/*`, `src/configtext/careers.js` | Job seekers are a large share of traffic (testbook.com, enggwave.com referrals) |
| Detail pages `/{lang}/careers/<slug>` with **`JobPosting` JSON-LD only while open**; expired "open" notices close automatically (India time) | `careers/[slug]/*`, `src/lib/careers.js`, `src/lib/jsonld.js` | Google Jobs |
| Data from `src/data/careers.json`, **shipped empty** (no invented postings) → "No current openings" empty state | `src/data/careers.json`, `docs/CAREERS.md` | Strapi has no recruitment data (checked snapshot + production API); go live without a CMS change |
| `career_view_job`, `career_apply_click` events | `TrackJobView.js`, `ApplyLink.js` | Measure job interest |
| "Careers" in the header, footer and sitemap (both languages). Desktop: in the **About Us** dropdown at every width, plus a top-level **CAREERS** item at ≥1440 px only. Mobile menu: top-level item | `configtext/header.js`, `components/Header.js`, `Footer.js`, `app/sitemap.js` | Browser testing showed the desktop nav row has no room below 1440 px (production already pushes "CONTACT US" off-screen at 1024 px in English); this keeps the row identical to production there. Sitemap now 81 URLs |
| Strapi `career-notification` plan (additive, priority 1 for Release B) | `docs/STRAPI_CHANGES.md` | Let editors publish vacancies without a deploy |

## Phase 4 — "What brings you here today?" popup

| Change | Files | Why |
|---|---|---|
| 9 options → destinations, bilingual, in one config file | `src/configtext/intentPopup.js` | Easy to edit |
| Shows once per visitor after 6 s or 30% scroll, only on `/`, `/{lang}`, company profile, portfolio, blog; never on careers/contact/products/etc. or to bots; remembered 30 days (try/catch, falls back to once per session) | `src/components/IntentPopupLoader.js` | Route visitors, don't nag |
| Modal on desktop / bottom sheet on mobile; focus trap, Esc, `aria-modal`, visible close; dynamic import (no SSR), fixed overlay | `src/components/IntentPopup.js` | Accessibility; no CLS/LCP impact (home JS unchanged at 199 kB) |
| `intent_selected` / `intent_dismissed` fired before navigating | same | Visitor-intent reporting |
| Off unless `NEXT_PUBLIC_INTENT_POPUP=on` | `IntentPopupLoader.js` | Kill switch (needs a redeploy, see deploy doc) |

## Phase 5 — Quick improvements

| Change | Files | Why |
|---|---|---|
| Floating WhatsApp + toll-free call buttons (contact-page numbers), tracked with `location=floating_button`; hidden on `/contact` | `src/components/FloatingContact.js` | One tap to customer care |
| Security headers: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Content-Security-Policy: frame-ancestors 'self'`, `X-Frame-Options: SAMEORIGIN` | `next.config.js` | Only stops *other* sites framing kmfnandini.coop; embeds inside our pages (YouTube, Google Maps, heyzine, PDFs) are unaffected. The Turiya 360 tour is an external link, not an embed |

**Not done (deliberately), recommended for a later release:**

- **`next/image` migration:** the site has 255 `<img>` tags and none use `next/image`. Converting them is not low-risk without visual/Lighthouse testing, which wasn't possible in this environment. Biggest wins first: the home page's `ghee-en/kn.png` (~520 KB each), `feat/stapi3.jpg`, `feat/strpi2.jpg` (~480 KB), `goodlife-banner.jpg` (346 KB); compress to WebP/AVIF and serve with `next/image` + `sizes`.
- **Server-side data fetching:** all pages fetch Strapi **in the browser** (`'use client'` + `useEffect`/`useQuery`), so the HTML crawlers receive has titles/metadata (now) but no page content. Recommend moving key pages (home, products, notifications, careers once on Strapi) to server-side fetching with ISR (`revalidate`) in a later release.

## Kannada parity (report only)

Pages or components with English-only UI text in the code (content from Strapi is localized separately):

- `blog` ("LATEST NEWS"), `blog/notification` ("Tender Notification", "View Fullscreen", "Download PDF"), `portfolio` (PDF buttons), `portfolio/defence` ("KMF ACHIEVEMENTS"), `offers` ("Click Above")
- `animal-husbandry/cattle-insurance` (headings "Animal Husbandery", "Cattle Insurance", no Kannada at all)
- `blog/tv-commercial`, `blog/tv-commercial/brandambassador`, `portfolio/brandambassador` (section headings)
- `about/mission-vision` (29 English sentences), `about/organization-chart`, `animal-husbandry/scheme/gok`, `scheme/goi`, `social-responsibility/nandini-hostels` (long English paragraphs alongside Kannada ones; check both languages render the right one)
- Old `/{lang}/404` and `/{lang}/comingsoon` pages ("PAGE NOT FOUND", "COMING SOON", "Return To Home")
- Contact form field labels (other than the category dropdown) are English only
- Home page Quick Links card titles ("Place Your Order", "Dairy Tour", "Nandini Commercials") are English on `/kn`, and the "Quick Links" heading is Kannada on `/en`

**Please have a native speaker review** the new Kannada text in `src/lib/seo.js`, `src/configtext/careers.js`, `src/configtext/intentPopup.js`, `src/components/NotFoundContent.js`, `src/components/FloatingContact.js` and the contact categories.

## Existing issues found (not caused by this branch, not fixed)

These Strapi endpoints, called by live pages today, fail on the production API (checked 2026-09-28). Fixing them needs Strapi content or permissions, which is outside this release:

| Endpoint | Status | Used by |
|---|---|---|
| `/api/home-new` | 404 | `/{lang}` home |
| `/api/kmf-acheivment`, `/api/organization-chart` | 404 | `/about/organization-chart` |
| `/api/ksheera-dhare` | 404 | `/portfolio/ksheeradhare` |
| `/api/ksheerabhagaya` | 404 | `/portfolio/ksheerabhagaya` |
| `/api/milestone-banner` (kn) | 404 | commented out, not used |
| `/api/schemes` | **403** (no public read permission) | `/animal-husbandry/scheme/other-scheme` |

404 on a single type usually means no published entry for that locale.

## Verification

| Check | Result |
|---|---|
| `next build` | ✅ passes (baseline ✅) |
| `next lint` | ✅ 0 errors, 53 warnings (identical to baseline) |
| Typecheck | n/a: JavaScript project, no TypeScript |
| `node scripts/check-urls.mjs http://localhost:3100` (production build) | ✅ 81/81 sitemap + new pages 200; 10/10 redirects 301 → 200; 4/4 unknown URLs 404 |
| Titles/canonical/hreflang/JSON-LD in server HTML (en + kn, static + detail pages) | ✅ checked with curl |
| Careers with test data (open / expired / results): badges, Apply only when open, JobPosting only when open, sitemap entries, HTML escaping | ✅ then test data removed |
| Analytics helpers (event names, params, no PII, never throws) | ✅ Node test with stubbed `window` |
| Strapi fetching code unchanged vs baseline; 97/112 endpoint×locale calls return 200 | ✅ (the 15 failures are the existing issues above) |
| Home page first-load JS | ✅ 199 kB before and after (popup is lazy-loaded) |
| **Browser checks** (`scripts/browser-check.mjs`, Playwright Chromium, GA hits intercepted so nothing reached GA) | ✅ **40/40**: one `page_view` per load and per in-site navigation with correct title/URL; popup timing (6 s / 30% scroll), centred modal vs mobile bottom sheet, focus trap, Esc, remembered after reload, Kannada text, correct destinations, not shown on careers/contact/products, storage blocked (shows once, no errors); `intent_selected`/`intent_dismissed`, `click_whatsapp` (`floating_button`), `file_download` (link + Review), `page_404`; no PII in any hit; contact `?category=` preselect (en/kn); nav row identical to production at 1024/1280 px, Careers in About Us, CAREERS in the row at 1440 px |

Fixes made because of the browser run:
- Events fired before GA finished loading (e.g. `page_404` on a direct visit) were dropped; `trackEvent` now queues them for up to ~10 s.
- With storage blocked, the popup never showed; it now shows once per session, as specified.
- The extra CAREERS nav item pushed items off-screen at ≤1280 px; moved as described in Phase 3.
- **Found in GA4 config:** enhanced measurement *File downloads* is ON, so PDF link clicks count twice. `docs/GA4_SETUP.md` now makes turning it off a required step.
- Page views on in-site navigation arrive ~5–6 s after the click (GA4 batching); that's normal.

Still best checked by a person on the preview: the overall look, the real contact-form email, and GA4 DebugView with the real property (`docs/DEPLOY_AND_ROLLBACK.md`).

---

## 4 Oct 2026 — website forms, complaint tickets, Ask Nandini updates

Applied on top of the developer's repo (`kmf-nandini-main-01-10-26`, which already contains the 1 Oct zip plus the home-page notification carousel). Details: `docs/FORMS.md`, `docs/ASK_NANDINI.md`.

| Change | Files | Notes |
|---|---|---|
| **Dealer / parlour / agency / franchise application** page (en + kn), reference number `KMF-D-…` | `src/app/[locale]/dealership/`, `src/app/api/forms/dealer/` | Stored in Supabase `dealer_applications` |
| **"Notify me when available"** page (en + kn): PIN code → state, products, contact | `src/app/[locale]/notify-me/`, `src/app/api/forms/demand/`, `src/lib/forms/pincode.js` | Stored in `demand_requests`; demand by state/city on the admin page |
| **Complaint tickets** with optional photo, ticket `KMF-C-…`, public status check | `src/app/[locale]/complaint/`, `src/app/api/forms/complaint/`, `src/lib/forms/complaints.js` | `complaints` table + private bucket `complaint-photos` |
| **Admin page** `/admin/forms` (same password as `/admin/ask-nandini`): lists, status/notes, photos, CSV, demand summary | `src/app/admin/forms/` | No emails: data is read here. Optional weekly email report off unless `FORMS_NOTIFY_TO` is set |
| Ask Nandini: `check_complaint_status` tool, prompt facts for the three pages, stored replies link to them, greetings/thanks/goodbye answered without Claude at any point in the chat | `src/lib/ask-nandini/tools.js`, `prompt.js`, `stored.js`, `src/configtext/askNandini*.js` | |
| Admin: all questions list with search, paging and CSV export (2 Oct) | `src/app/admin/ask-nandini/` | |
| Header menus (en + kn) and sitemap link the three new pages | `src/configtext/header.js`, `src/components/Header.js`, `src/app/sitemap.js`, `src/lib/seo.js` | |
| Supabase: `docs/forms-supabase.sql` **already applied** to project `kmf-ask-nandini` on 4 Oct | `docs/forms-supabase.sql` | Nothing to run |
| Vercel cron (Monday 09:00 IST) for the optional demand email; harmless while off | `vercel.json`, `src/app/api/cron/demand-report/` | |

Verification: `next build` ✅, `next lint` ✅ (0 errors on changed files), forms/API/admin exercised against both the in-memory store and the live Supabase project (test rows removed). Kannada text in `src/configtext/forms.js` still needs a native review.

---

## 4 Oct 2026 — landing page rework (branch `feat/landing-redesign`)

Safety net: tag `backup/before-landing-redesign-2026-10-04` on GitHub = the live code before this change; local copy in `KMF/kmf-live-backup-2026-10-04/`.

| Change | Files | Notes |
|---|---|---|
| One shared home page for `/`, `/en` and `/kn` (was two 860-line copies; `/en` used to show the Kannada page) | `src/components/home/HomePage.js`, `src/components/home/Cards.js`, `src/configtext/home.js`, `src/app/page.js`, `src/app/[locale]/page.js` | All text per language in the config file |
| Hero: video without player controls, dark gradient, headline, one-line intro, **Explore products** / **Contact us** buttons; the external Lottie embed is gone | | Layout contract with the overlay header kept (absolute page, hero shrinks on scroll) |
| Consistent section titles (eyebrow + title + accent bar) instead of black-shadow gradient boxes | | |
| Explore carousel: labels always visible (were hover-only, so invisible on phones), 1 card per view on phones, relative links | | |
| About KMF / Our brand: two glass cards on the parallax banner, full CMS text (was first paragraph only, "typewriter" that didn't type) | | |
| Know your milk: tiles as a 2×2 grid with icons | | |
| Notifications: **live tender list from the CMS** (title + last date, falls back to the old static list), beside the developer's image carousel | | Old page had a hard-coded 2024 list |
| Quick links: 8 tiles incl. products, bulk order, dealership, notify-me, complaint, careers, dairy tour, commercials | | |
| Duplicate second "Welcome" block replaced by "Our story" with the same video | | |
| Certificates: CMS images when available, clean white cards, responsive slides | | |
| Removed the page's own runtime error (`newsImp is not defined` on the live site) | | Pre-existing hydration warnings from the header remain on every page |

Verified: `next build` ✅, lint ✅, screenshots of `/`, `/kn` and mobile (Playwright) checked by hand.

Follow-up on the same day after local review (all on `feat/landing-redesign`):
- Hero: whole 16:9 video visible on desktop (no cropping); on phones the video shows at natural size with a centred text block beneath it.
- Discover carousel rotates continuously, starts in the middle; new Ksheerasagara image.
- Know your milk: replaced by the supplied designed image (desktop + mobile versions), no text.
- Notifications: open/closed badges, reference numbers; "Latest from Nandini" strip no longer jumps while loading (fixed boxes, smaller images).
- Quick links: featured products card + descriptive action cards.
- New FSSC 22000 logo.
- Header top strip: logos left, address and phone with icon badges, language pill and social icons right; cleaner phone layout.
- Navigation: even spacing, chevrons on menus, plain navy submenus with dividers (hover = pale yellow text, as before); Virtual Tour outlined; no pulse animation.
- Wave-shaped section edges on the home page (hero video, Explore, About, Know your milk, Quick links, Our story, Certificates), like amul.com.
