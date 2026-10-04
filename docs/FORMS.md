# Website forms: dealer applications, "Notify me" demand, complaint tickets

Added 2026-10-04. Three public forms (English and Kannada), stored in the same Supabase project as Ask Nandini, shown on a password-protected admin page, with email notifications and a weekly demand report.

| Form | Page | API | Stored in | Visitor gets |
|---|---|---|---|---|
| Dealer / parlour / agency / distributor / franchise application | `/en/dealership`, `/kn/dealership` | `POST /api/forms/dealer` | `dealer_applications` | reference number `KMF-D-XXXXXX` |
| Notify me when available (out-of-state / missing-product demand) | `/en/notify-me`, `/kn/notify-me` (accepts `?pincode=` and `?product=`) | `POST /api/forms/demand` | `demand_requests` | confirmation with city and state |
| Complaint with photo | `/en/complaint`, `/kn/complaint` (accepts `?ticket=` to show a status) | `POST /api/forms/complaint` (multipart), `GET /api/forms/complaint/status?ticket=` | `complaints` + private bucket `complaint-photos` | ticket `KMF-C-XXXXXX`, status check on the page and in Ask Nandini |

Files: pages under `src/app/[locale]/{dealership,notify-me,complaint}/`, text in `src/configtext/forms.js` (both languages; option values are stored as-is), shared UI in `src/components/forms/`, server code in `src/lib/forms/` (`db.js` Supabase REST + in-memory fallback, `validate.js`, `pincode.js`, `tickets.js`, `limit.js`, `report.js`, `complaints.js`), email in `src/lib/mailer.js`.

## Setup (once)

1. **Supabase:** `docs/forms-supabase.sql` was applied to the `kmf-ask-nandini` project on 2026-10-04 (tables, report-history table, private `complaint-photos` bucket, cleanup function). The server uses the `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` already set for Ask Nandini. Nothing else is required.
2. **No emails by default.** New applications and complaints are **not** emailed; KMF reads them on the admin page. There is an optional weekly demand-report email; to switch it on set:

   | Variable | Purpose |
   |---|---|
   | `FORMS_NOTIFY_TO` | Recipients of the weekly demand report, comma-separated. Unset (default) = the report is off and the cron does nothing. |
   | `CRON_SECRET` | Any long random string; Vercel sends it with the Monday cron call. Needed only together with `FORMS_NOTIFY_TO`. |
   | `FORMS_SMTP_USER`, `FORMS_SMTP_PASSWORD` | SMTP login for the report (falls back to the contact form's `NEXT_PUBLIC_EMAIL` / `NEXT_PUBLIC_PASSWORD`). `FORMS_SMTP_HOST` / `PORT` / `SECURE` default to Gmail 465. |
   | `NEXT_PUBLIC_SITE_URL` | Admin link inside the report email (defaults to https://www.kmfnandini.coop). |

3. **Weekly report cron:** `vercel.json` schedules `GET /api/cron/demand-report` every Monday 03:30 UTC = 09:00 IST. It is harmless while the report is off (returns `skipped`).
4. The admin page uses the existing Basic auth (`ASK_NANDINI_ADMIN_USER` / `ASK_NANDINI_ADMIN_PASSWORD`).
5. Optional retention jobs (not yet scheduled): in the Supabase SQL editor run `create extension if not exists pg_cron;` then `select cron.schedule('kmf-forms-cleanup', '45 3 * * *', 'select kmf_forms_cleanup()');` (and the same for `ask_nandini_cleanup()` at `15 3 * * *`).

## Admin page: `/admin/forms`

Linked from `/admin/ask-nandini`. Three tabs, each with a CSV download (`/admin/forms/export?type=dealers|demand|complaints`).

- **Dealer applications:** every field, status `new → contacted → closed`, internal note. Filter by status.
- **Notify-me demand:** a "by state → city → products" summary (last 7 days and all time), the full list with contact details, and a "mark as notified" tick per request for when KMF has told the visitor. If the optional email report is on: **Email report now** (7/30/90 days) and a history of emailed reports.
- **Complaints:** description, details, the photo (served through `/admin/forms/photo/<id>` from the private bucket; the bucket itself is never public), status `open → in_progress → resolved / rejected`, a **note shown to the visitor** when they check the ticket, and an internal note.

Status changes are plain HTML form posts to `/admin/forms/update` (same-origin only, so Basic-auth cookies can't be abused cross-site).

## Weekly demand report (optional email)

Off unless `FORMS_NOTIFY_TO` is set; the admin page always shows the same summary. `src/lib/forms/report.js` groups `demand_requests` by state (worked out from the PIN code, `src/lib/forms/pincode.js`; approximate near state borders) and city, counts requests and the products asked for, for the last 7 days and all time, and emails it (HTML + text) to `FORMS_NOTIFY_TO`. Each run is recorded in `demand_reports` so the admin page shows whether it went out. Contact details are **not** in the email; they are on the admin page and in the CSV.

## Ask Nandini integration

- Tool `check_complaint_status(ticket)` returns status, category, product and dates for a ticket (never personal details); the prompt tells the assistant to use it when a visitor gives a ticket number, and never to ask for a name or phone to look one up.
- `get_contact_info` now returns the dealership page for dealership topics, the complaint page for quality/MRP topics and the notify-me page for availability topics; the prompt lists all three pages with when to use them.
- Stored replies (`src/configtext/askNandiniReplies.js`) for parlour/dealership, quality complaint, MRP complaint, prices and where-to-buy now link to the new pages; new stored replies: "check my complaint status" (asks for the ticket number) and "Nandini is not available in my city" / "outside Karnataka" / "online delivery" (notify-me page).
- Suggested chips on the three pages and in the complaint / buy-products intents.

## Privacy and abuse limits

- These forms store personal details on purpose (name, mobile, email, location). They live only in Supabase (Mumbai) and are shown only on the Basic-auth admin page; nothing is emailed. Nothing personal goes to GA4 (only `generate_lead` with `form_category` = `dealer_application` / `notify_me` / `complaint`).
- Public status check (`/api/forms/complaint/status`) returns status, category, product and dates only. Ticket numbers use 6 characters from a 32-letter alphabet (about 1 billion combinations), so they can't be guessed in practice.
- Per visitor (hashed IP): 5 submissions per hour, 10 per day, across all three forms; honeypot field; server-side validation of every field (Indian mobile, email, 6-digit PIN, option lists).
- Photos: JPG/PNG/WebP, checked by file signature, 4 MB max on the server (Vercel's body limit is 4.5 MB); the browser shrinks large phone photos to 1600 px JPEG before upload. Stored in a **private** bucket; the complaint is saved even if the photo upload fails (the visitor is told to WhatsApp it with the ticket number).
- Retention: `kmf_forms_cleanup()` deletes resolved/rejected complaints and closed applications a year after their last update, and notify-me requests after two years. Schedule it with pg_cron (see the SQL file) or run it by hand.

## Local development

Without `SUPABASE_URL` the forms work against an in-memory store (per server process) and photos are kept in memory. Run `SUPABASE_URL= npm run dev` to force the in-memory mode.
