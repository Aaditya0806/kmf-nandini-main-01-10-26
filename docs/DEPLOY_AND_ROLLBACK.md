# Deploy & rollback — `feat/site-fixes-careers-intent`

The live site (www.kmfnandini.coop) runs on **Vercel**. This branch was built in a local repo created from a zip snapshot (commit `6196fc1`). **Never deploy straight to production.** Go preview → checks → production.

## 0. Before anything: line up with the real repo

The Vercel project deploys from a Git repo that isn't this folder.

1. Clone the Vercel-linked repo and diff its production branch against this repo's baseline commit (`6196fc1`). If production has changes that aren't in the snapshot, rebase this branch onto the real production branch first; don't overwrite newer work.
2. Push `feat/site-fixes-careers-intent` to that repo and open a PR (text in `docs/PR_DESCRIPTION.md`). Vercel builds a **Preview** deployment for the branch automatically.

## 1. Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Preview | Production | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | existing value | existing value | Strapi API (unchanged) |
| `NEXT_PUBLIC_INTENT_POPUP` | `on` | `on` when ready | **New.** Anything other than `on` = popup off |
| `NEXT_PUBLIC_GA_ID` | optional | leave unset | Defaults to `G-164VVDS7P1` |
| `NEXT_PUBLIC_SITE_URL` | leave unset | leave unset | Defaults to `https://www.kmfnandini.coop` (canonical URLs, sitemap) |
| `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_PASSWORD` | existing | existing | Contact form (unchanged) |

`NEXT_PUBLIC_*` values are baked in at build time: after changing one, **redeploy** for it to take effect.

## 2. Verify on the Preview URL (against the live CMS)

Automated (from this repo):

```bash
node scripts/check-urls.mjs https://<preview-url>.vercel.app
```

It must print `All checks passed.` It checks every live sitemap URL plus the new pages (200), all redirects (301 → 200), and unknown URLs (404). If Vercel Deployment Protection is on, run it with protection bypass, or check a few URLs by hand.

Manual checklist, in a normal browser (Chrome DevTools open). **These were not verified in development and must be done here:**

**Pages & data (live CMS)**
- [ ] `/en` and `/kn` home: banners, products, notifications load; "Quick Links → Place Your Order" goes to contact with **Bulk Order** pre-selected
- [ ] `/en/our-product` and a product category, `/en/blog/notification` (tenders + PDF preview/download), `/en/contact`, `/en/animal-husbandry/procurement`, `/kn/milk-union/1`: content loads as on production
- [ ] Header at 1024 px and 1280 px: nav row identical to production; **ABOUT US** dropdown contains "Careers & Recruitment". At ≥1440 px: **CAREERS / ಉದ್ಯೋಗಾವಕಾಶಗಳು** also shows in the nav row
- [ ] Mobile menu (≈390 px): Careers appears; Bulk Order and Contact links work
- [ ] `/en/careers` and `/kn/careers`: "No current openings" + fake-recruitment warning + FAQ; footer shows "Careers & Recruitment"
- [ ] `/en/contact?category=bulk-order` → Categories shows **Bulk Order**; `/kn/contact?category=quality` → **ಗುಣಮಟ್ಟ**. (Sending the form sends a real email; if you test it, write "TEST — please ignore".)
- [ ] `/xyz` and `/en/nothing-here` → the new "Page not found" page (Kannada on `/kn/...`)
- [ ] Floating WhatsApp/call buttons bottom-right on normal pages, absent on `/contact`, not covering anything important on mobile
- [ ] Embedded YouTube videos (TV commercials, brand ambassador), Google Map on contact, heyzine flip-books on portfolio still play/show
- [ ] Page titles in the browser tab, e.g. "Contact Us | KMF Nandini", "ಕಹಾಮ ಪರಿಚಯ | ಕಹಾಮ ನಂದಿನಿ"

**Popup** (use a private window each time, or clear site data)
- [ ] `/en`: popup appears after ~6 s (or on scrolling ~30%); desktop = centred, ≈390 px mobile = bottom sheet
- [ ] Tab/Shift+Tab stay inside; Esc closes; × closes; clicking the dark backdrop closes
- [ ] Each option goes to the right page; "Just browsing" just closes
- [ ] Reload: popup does **not** come back (30 days)
- [ ] `/kn`: labels in Kannada, options go to `/kn/...`
- [ ] Does **not** appear on `/en/careers`, `/en/contact`, `/en/our-product`
- [ ] Storage blocked (Chrome → Settings → Privacy → Third-party cookies / Site data → block for the preview site): popup shows at most once per visit, and the page works normally

**Analytics** (GA4 → Admin → DebugView, with the "Google Analytics Debugger" extension on)
- [ ] One `page_view` per page and per in-site navigation (no duplicates)
- [ ] `intent_selected` (with `intent`) / `intent_dismissed` from the popup
- [ ] `file_download` on a tender PDF Download and on Review; `click_whatsapp` / `click_to_call` on the floating buttons (`location = floating_button`)
- [ ] `page_404` on `/xyz` with `missing_path`
- [ ] Nothing contains a name, phone number or email

## 3. Promote to production

1. Merge the PR into the production branch (or, in Vercel → Deployments, **Promote to Production** on the checked preview).
2. Right after: run `node scripts/check-urls.mjs https://www.kmfnandini.coop` and spot-check home, a product page and `/en/careers`.
3. Search Console: submit `https://www.kmfnandini.coop/sitemap.xml`; use URL Inspection on `/en/careers`.
4. GA4: do the admin steps in `docs/GA4_SETUP.md`, in particular **turn off Enhanced measurement → File downloads** (otherwise PDF downloads count twice), then key events and custom dimensions.
5. Watch GA4 Realtime and Vercel → Logs for ~30 minutes.

## 4. Rollback

| Situation | Action | Time |
|---|---|---|
| **Anything is wrong after going live** | Vercel → Deployments → pick the last good production deployment → ⋯ → **Instant Rollback**. No rebuild; the previous version is back immediately. Then investigate on a preview. | ~1 min |
| Only the popup is a problem | Vercel → Settings → Environment Variables → set `NEXT_PUBLIC_INTENT_POPUP` to `off` (Production) → Deployments → latest → **Redeploy**. No code change needed. (For an immediate fix, use Instant Rollback to a deployment built without the popup, then redeploy with it off.) | ~3–5 min |
| A specific change must go | `git revert <commit>` on the production branch → Vercel deploys it. Commits are small and separate per feature (see `git log`) | ~5 min |
| Undo the whole release | Revert the merge commit (`git revert -m 1 <merge-sha>`), or Instant Rollback | ~1–5 min |

Instant Rollback turns off automatic production deploys from Git until you promote a deployment again. Remember to re-enable it (promote the fixed deployment) afterwards.

Nothing in Strapi changed, so a rollback never needs CMS work.

---

## Ask Nandini (chat assistant) — additional steps

Full details: `docs/ASK_NANDINI.md`.

**Before the first deploy with the chat:**
1. Supabase: create a project in **Mumbai**, run `docs/ask-nandini-supabase.sql`.
2. Anthropic Console: create a workspace "Ask Nandini" with a monthly spend limit, and an API key inside it.
3. Vercel env vars (Preview first, then Production): `NEXT_PUBLIC_ASK_NANDINI=on`, `ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ASK_NANDINI_HASH_SALT` (random), `ASK_NANDINI_DAILY_MSG_CAP` (e.g. 3000), `ASK_NANDINI_ADMIN_USER`, `ASK_NANDINI_ADMIN_PASSWORD` (strong). Do **not** set `ASK_NANDINI_EVAL_TOKEN` in Production.

**Check on the preview:**
- [ ] ~2 s after the page loads, a 1-second "Ask Nandini · Powered by Velozity Global Solutions" intro appears in the middle, then the chat opens **bottom-right**: a chat card on desktop, a small greeting dialog on mobile (expands to full screen when tapped). WhatsApp/call buttons are **bottom-left** and not covered; the footer shows "Powered by Velozity Global Solutions" (link with UTM tags).
- [ ] Minimising it leaves a pulsing bubble, and it stays minimised on the next pages of the visit.
- [ ] Ask: "Any current vacancies?" → says what the Careers page says, with the fake-recruitment warning. "Price of Nandini ghee?" → says prices aren't published. "Show the latest tenders" → lists tenders with dates and PDF links.
- [ ] 👍/👎 work; the intent popup never opens over the chat; Esc closes the chat.
- [ ] `/admin/ask-nandini` asks for a password and shows the questions you just asked (with any phone numbers shown as [phone]), plus Velozity credit clicks and popup choices after you click them.
- [ ] If the Supabase SQL was run before 2026-09-30, run `docs/ask-nandini-supabase.sql` again (it adds the `site_events` table; safe to re-run).
- [ ] Optional: `ASK_NANDINI_EVAL_TOKEN` set on **Preview only**, then `node scripts/eval-ask-nandini.mjs https://<preview-url>` (≈ $0.15 per run).

**Turn the chat off quickly:** set `NEXT_PUBLIC_ASK_NANDINI=off` → Redeploy (or Instant Rollback). The rest of the site is unaffected.

**Spend guards:** the daily cap (`ASK_NANDINI_DAILY_MSG_CAP`) plus the Anthropic workspace spend limit. The admin page shows the estimated spend.
