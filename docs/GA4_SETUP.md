# GA4 setup — KMF Nandini

Property measurement ID: **G-164VVDS7P1** (override with `NEXT_PUBLIC_GA_ID`).
If `NEXT_PUBLIC_GTM_ID` is set, GTM is loaded instead of gtag and events are pushed to `dataLayer` (create a GTM "Custom Event" trigger per event name below).

All tracking code lives in `src/lib/analytics.js`. Link clicks (PDFs, tel:, WhatsApp, mailto:) are captured by one delegated listener in `src/components/AnalyticsListener.js`. No personal data (name, phone, email, message text) is ever sent.

## page_view

Not sent by site code. It relies on GA4 **enhanced measurement**:

Admin → Data streams → (web stream) → Enhanced measurement → ⚙ → make sure **Page views → "Page changes based on browser history events"** is ON.

Do not add a manual `page_view` in code or GTM as well, or every page will count twice.

## Events sent by the site

| Event | When | Parameters |
|---|---|---|
| `generate_lead` | Contact form sent successfully | `form_category` (the submitted reason: `Quality`, `MRP Related`, `New Agency/Parlour`, `Product Non-Availability`, `Bulk Order`, `Others`, or `none`) |
| `file_download` | Click on any PDF/doc link, or a PDF "Review" / "View Fullscreen" button | `file_name`, `section` (page path without language, e.g. `blog/notification`) |
| `click_to_call` | Click on a `tel:` link | `location` (`header` / `footer` / `content` / `floating_button`), `section` |
| `click_whatsapp` | Click on a `wa.me` / WhatsApp link | `location`, `section` |
| `click_email` | Click on a `mailto:` link | `location`, `section` |
| `intent_selected` | Visitor picks an option in the "What brings you here?" popup | `intent` |
| `intent_dismissed` | Popup closed without a choice | — |
| `career_view_job` | Careers: a job's details opened | `job_id`, `job_title` |
| `career_apply_click` | Careers: "Apply" clicked | `job_id`, `job_title` |
| `page_404` | The not-found page is shown | `missing_path`, `referrer` (referring host only, or `(direct)`) |
| `credit_click` | Velozity Global credit link clicked | `location` (`footer` / `chat`) |
| `chat_open` | Ask Nandini chat shown | `section`, `trigger` (`auto` = opened itself on page load, `user` = visitor opened it) |
| `chat_message_sent` | A chat answer finished | `lang` (language the visitor wrote in), `turn` |
| `chat_tool_used` | The assistant looked something up | `tool` (e.g. `get_careers`, `search_products`; `stored_reply` = answered from a stored reply without Claude) |
| `chat_link_click` | A link in a chat answer was clicked | `path` (site path, or host for external links) |
| `chat_feedback` | 👍 / 👎 on an answer | `value` (`up` / `down`) |
| `chat_fallback` | The chat couldn't answer normally | `reason` (`no_answer`, `rate_limited`, `daily_cap`, `error`) |

Chat events never include the visitor's message or the answer text.

**Required: turn off GA4's built-in "File downloads".** Enhanced measurement's *File downloads* is ON for this property (verified 2026-09-28), so every PDF link click is counted twice: once by GA (`file_name` = `/path.pdf`, with `link_url`) and once by the site (`file_name` = `name.pdf`, with `section`). Admin → Data streams → web stream → Enhanced measurement → ⚙ → turn **File downloads** OFF, and leave *Page views*, *Scrolls*, *Outbound clicks* and *Video engagement* on. The site's own event also covers PDF buttons that aren't links ("Review", "View Fullscreen"), which GA's built-in one misses.

## 1. Mark key events

Admin → Data display → **Key events** → "New key event", and add:

- `generate_lead`
- `career_apply_click`
- `click_to_call`
- `click_whatsapp`
- `file_download` (optional — useful for tenders/recruitment interest)

(Events appear in Admin → Events once they have fired at least once; key events can be created by name beforehand.)

## 2. Register custom dimensions

Admin → Data display → **Custom definitions** → Create custom dimension, scope **Event**:

| Dimension name | Event parameter |
|---|---|
| Intent | `intent` |
| Form category | `form_category` |
| Missing path | `missing_path` |
| Section | `section` |
| Link location | `location` (also used by `credit_click`) |
| Job ID | `job_id` |
| Job title | `job_title` |
| Chat language | `lang` |
| Chat turn | `turn` |
| Chat tool | `tool` |
| Chat link | `path` |
| Chat feedback | `value` |
| Chat fallback reason | `reason` |

(`file_name` is already a built-in GA4 parameter.) Parameters are only reportable from the day the dimension is registered, so do this first.

## 3. Link Search Console

Admin → Product links → **Search Console links** → Link → choose the `https://www.kmfnandini.coop` property → select the web stream. Then in Search Console → Sitemaps, submit `https://www.kmfnandini.coop/sitemap.xml`.

## 4. Useful reports after launch

- **404s:** Explore → Free form, dimension *Missing path*, metric *Event count*, filter event name = `page_404`. Feed the top paths into `docs/REDIRECTS.md`.
- **Visitor intent:** event `intent_selected` broken down by *Intent*.
- **Leads by category:** `generate_lead` by *Form category*.

## 5. Checking events work (DebugView)

Install the "Google Analytics Debugger" Chrome extension (or use Tag Assistant at tagassistant.google.com), browse the site, then open Admin → **DebugView**. Each navigation should show exactly one `page_view`.
