# Redirects — KMF Nandini

All redirects live in `next.config.js` → `redirects()` and return **301**. They only cover URLs that do not exist as pages; none of the 79 sitemap URLs is redirected.

## Current redirects

| From | To | Why |
|---|---|---|
| `/careers` | `/en/careers` | Job seekers type/guess it; used to show the home page with a bogus locale |
| `/recruitment` | `/en/careers` | Same |
| `/about` | `/en/about/company-profile` | Guessed URL; used to show the home page |
| `/contact` | `/en/contact` | Guessed URL; used to show the home page |
| `/en/contact-us` | `/en/contact` | Was linked from the header and portfolio page; returned 404 |
| `/kn/contact-us` | `/kn/contact` | Kannada equivalent |
| `/en-IN`, `/en-IN/:path*` | `/en`, `/en/:path*` | Old/alternate locale code |
| `/kn-IN`, `/kn-IN/:path*` | `/kn`, `/kn/:path*` | Old Strapi locale code `kn-IN` |

`/en/careers` and `/kn/careers` are real pages (not redirects).

## How unknown URLs behave now

- Before: any single-segment path (`/careers`, `/xyz`) returned **200** and rendered the home page with a bogus language ("soft 404").
- Now: only `/en/...` and `/kn/...` exist. Everything else returns a real **404** with the bilingual "Page not found" page, which fires the GA4 event `page_404` (`missing_path`, `referrer`).

## Adding a redirect

1. Add a line to the list in `next.config.js`, e.g. `r('/old-path', '/en/new-path'),`
2. Add a row to the table above.
3. `npm run build`, `npm start`, then `curl -sI http://localhost:3000/old-path` should show `301` and the right `location`.

Rules: only redirect URLs that currently 404, send them to the closest real page (not the home page, unless nothing fits), and never redirect a URL that is in the sitemap.

## Search Console 404 export — paste here

Search Console → Indexing → Pages → "Not found (404)" → Export. Paste the URLs below, then map each one to a destination (or mark "leave as 404"):

| 404 URL (from Search Console) | Redirect to | Status |
|---|---|---|
| _paste here_ | | |

Also check GA4 → Explore → event `page_404` by *Missing path* after launch for URLs real visitors hit.
