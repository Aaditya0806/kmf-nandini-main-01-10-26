# Careers page — how to add a vacancy

Pages: `/en/careers`, `/kn/careers`, and one detail page per notice at `/en/careers/<slug>` and `/kn/careers/<slug>`.

Until the Strapi `career-notification` collection exists (see `docs/STRAPI_CHANGES.md`, priority 1 for Release B), notices live in **`src/data/careers.json`**. Changing that file needs a commit and a redeploy (preview first, then production, see `docs/DEPLOY_AND_ROLLBACK.md`).

> **Only add notices KMF has officially published.** Never add placeholder or test jobs to `src/data/careers.json`. Open posts are sent to Google Jobs.

## Steps

1. Get the official notification PDF and upload it to the KMF S3 bucket (or Strapi media library) so it has a permanent public URL.
2. Add an entry to the `jobs` array in `src/data/careers.json` (copy the example below and replace **every** value).
3. Check locally: `npm run build && npm start`, open `/en/careers` and `/kn/careers`, and the detail page.
4. Commit, deploy to a preview, check again, then promote to production.

## Fields

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Notification number or any unique ID. Sent to GA4 as `job_id`. |
| `slug` | yes | URL part: lowercase letters, numbers, hyphens only (e.g. `kmf-technical-officer-2026`). Never change it once published. |
| `status` | yes | `open`, `closed` or `results`. An `open` notice whose `lastDate` has passed is shown as closed automatically. |
| `title` | yes | `{ "en": "...", "kn": "..." }`. Shown as the card heading and page title. |
| `post` | no | Post name(s), `{ en, kn }`. |
| `vacancies` | no | Number. |
| `unit` | no | Department / unit / milk union, `{ en, kn }`. Used by the unit filter. |
| `location` | no | `{ en, kn }`. |
| `qualification` | no | `{ en, kn }`. |
| `ageLimit` | no | `{ en, kn }`. |
| `startDate` | no | `YYYY-MM-DD`, applications open. |
| `lastDate` | yes for open posts | `YYYY-MM-DD`, last date to apply (whole day, India time). "Closing soon" shows in the last 7 days. |
| `publishedDate` | yes | `YYYY-MM-DD`. Newest notices are listed first. |
| `notificationPdf` | yes | Full URL of the official notification PDF. |
| `applyUrl` | no | Full URL of the official online application. The "Apply" button only shows while the post is open. |
| `updates` | no | Results, admit cards, corrigenda: `[{ "type": "result" \| "admit-card" \| "update", "label": { en, kn }, "url": "...", "date": "YYYY-MM-DD" }]`. |

Any `{ en, kn }` field can also be a plain string (used for both languages), but please provide Kannada.

## Example entry (NOT real — for format only)

```json
{
  "id": "EXAMPLE-2026-01",
  "slug": "example-technical-officer-2026",
  "status": "open",
  "title": { "en": "EXAMPLE – Technical Officer (Dairy)", "kn": "ಉದಾಹರಣೆ – ತಾಂತ್ರಿಕ ಅಧಿಕಾರಿ (ಡೈರಿ)" },
  "post": { "en": "Technical Officer (Dairy Technology)", "kn": "ತಾಂತ್ರಿಕ ಅಧಿಕಾರಿ (ಡೈರಿ ತಂತ್ರಜ್ಞಾನ)" },
  "vacancies": 5,
  "unit": { "en": "KMF Head Office", "kn": "ಕಹಾಮ ಕೇಂದ್ರ ಕಚೇರಿ" },
  "location": { "en": "Bengaluru", "kn": "ಬೆಂಗಳೂರು" },
  "qualification": { "en": "B.Tech (Dairy Technology)", "kn": "ಬಿ.ಟೆಕ್ (ಡೈರಿ ತಂತ್ರಜ್ಞಾನ)" },
  "ageLimit": { "en": "18–35 years (relaxation as per rules)", "kn": "18–35 ವರ್ಷ (ನಿಯಮಾನುಸಾರ ಸಡಿಲಿಕೆ)" },
  "startDate": "2026-10-01",
  "lastDate": "2026-10-31",
  "publishedDate": "2026-10-01",
  "notificationPdf": "https://kmf-public.s3.ap-south-1.amazonaws.com/EXAMPLE.pdf",
  "applyUrl": "https://example.org/apply",
  "updates": [
    { "type": "admit-card", "label": { "en": "Admit card download", "kn": "ಪ್ರವೇಶ ಪತ್ರ ಡೌನ್‌ಲೋಡ್" }, "url": "https://example.org/admit-card.pdf", "date": "2026-11-10" }
  ]
}
```

## When a recruitment ends

Don't delete it: set `status` to `closed` (or `results` once results are out) and add the result PDF to `updates`. It then moves to "Past recruitments", stops being sent to Google Jobs, and the URL keeps working.

## Analytics

The page sends `career_view_job` (detail page opened) and `career_apply_click` (Apply clicked) with `job_id` and `job_title`, plus `file_download` for PDFs. See `docs/GA4_SETUP.md`.
