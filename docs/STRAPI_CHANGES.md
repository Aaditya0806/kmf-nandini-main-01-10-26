# Strapi changes — for Release B (not part of this release)

**This release makes no Strapi changes.** No content, content types, fields, roles or permissions were modified, and the editors' publishing flow is unchanged.

The Strapi project (`kmf-cms-production`, Strapi 4.16.2) lives outside this repo. Everything below is **additive only**: new types, nothing existing is edited. Apply it in a Strapi dev/staging environment first.

---

## Priority 1 — `career-notification` collection (Careers page)

**Why:** the Careers page currently reads `src/data/careers.json`, so every new vacancy needs a developer commit and a redeploy. With this collection, KMF editors publish recruitment notices in Strapi like any other content, in English and Kannada.

Checked on 2026-09-28: no existing collection holds recruitment notices (`tender-notification` has 52 EN / 3 KN entries, all tenders/EOIs; `blog-posts` none), so a new type is needed rather than a filter on an existing one.

### 1. Add the component `careers.update` (results / admit cards / corrigenda)

`src/components/careers/update.json`:

```json
{
  "collectionName": "components_careers_updates",
  "info": { "displayName": "Recruitment update", "icon": "file" },
  "options": {},
  "attributes": {
    "type": { "type": "enumeration", "enum": ["result", "admit-card", "update"], "default": "update", "required": true },
    "label": { "type": "string" },
    "file": { "type": "media", "multiple": false, "allowedTypes": ["files"] },
    "url": { "type": "string" },
    "date": { "type": "date" }
  }
}
```

### 2. Add the collection `career-notification`

Create with the Content-Type Builder, or add these files and restart Strapi:

`src/api/career-notification/content-types/career-notification/schema.json`:

```json
{
  "kind": "collectionType",
  "collectionName": "career_notifications",
  "info": {
    "singularName": "career-notification",
    "pluralName": "career-notifications",
    "displayName": "Career Notification",
    "description": "Recruitment notices shown on /careers"
  },
  "options": { "draftAndPublish": true },
  "pluginOptions": { "i18n": { "localized": true } },
  "attributes": {
    "title":            { "type": "string", "required": true, "pluginOptions": { "i18n": { "localized": true } } },
    "slug":             { "type": "string", "required": true, "regex": "^[a-z0-9-]+$", "pluginOptions": { "i18n": { "localized": false } } },
    "post_name":        { "type": "string", "pluginOptions": { "i18n": { "localized": true } } },
    "vacancies":        { "type": "integer", "min": 0, "pluginOptions": { "i18n": { "localized": false } } },
    "unit":             { "type": "string", "pluginOptions": { "i18n": { "localized": true } } },
    "location":         { "type": "string", "pluginOptions": { "i18n": { "localized": true } } },
    "qualification":    { "type": "text", "pluginOptions": { "i18n": { "localized": true } } },
    "age_limit":        { "type": "string", "pluginOptions": { "i18n": { "localized": true } } },
    "start_date":       { "type": "date", "pluginOptions": { "i18n": { "localized": false } } },
    "last_date":        { "type": "date", "pluginOptions": { "i18n": { "localized": false } } },
    "published_date":   { "type": "date", "required": true, "pluginOptions": { "i18n": { "localized": false } } },
    "status":           { "type": "enumeration", "enum": ["open", "closed", "results"], "default": "open", "required": true, "pluginOptions": { "i18n": { "localized": false } } },
    "notification_pdf": { "type": "media", "multiple": false, "allowedTypes": ["files"], "pluginOptions": { "i18n": { "localized": false } } },
    "apply_url":        { "type": "string", "pluginOptions": { "i18n": { "localized": false } } },
    "updates":          { "type": "component", "repeatable": true, "component": "careers.update", "pluginOptions": { "i18n": { "localized": true } } }
  }
}
```

Plus the standard generated files (same as every other type in the project):

- `src/api/career-notification/controllers/career-notification.js` → `createCoreController('api::career-notification.career-notification')`
- `src/api/career-notification/routes/career-notification.js` → `createCoreRouter(...)`
- `src/api/career-notification/services/career-notification.js` → `createCoreService(...)`

`slug`, dates, status, vacancies, PDF and apply URL are non-localized, so they stay in sync between English and Kannada; editors translate only the text fields.

### 3. Permission (needs KMF sign-off)

Settings → Users & Permissions → Roles → **Public** → Career-notification → tick **find** and **findOne** only.

This is the only permission change, and only for the new type. No existing permission is touched.

### 4. Frontend switch (small code change in Release B)

In `src/lib/careers.js`, replace the JSON import in `getJobs()` with a server-side fetch, keeping the JSON as a fallback:

```
GET {NEXT_PUBLIC_BASE_URL}/api/career-notifications?locale={en|kn}&populate=*&pagination[pageSize]=200&sort[0]=published_date:desc
```

with `next: { revalidate: 300 }` (new notices appear within 5 minutes, with no redeploy). Field mapping:

| Strapi | Page field |
|---|---|
| `id` | `id` |
| `slug`, `status`, `vacancies`, `apply_url` | same (`applyUrl`) |
| `title`, `post_name`, `unit`, `location`, `qualification`, `age_limit` | `title`, `post`, `unit`, `location`, `qualification`, `ageLimit` (current locale) |
| `start_date`, `last_date`, `published_date` | `startDate`, `lastDate`, `publishedDate` |
| `notification_pdf.data.attributes.url` | `notificationPdf` |
| `updates[]` (`file` URL or `url`) | `updates[]` |

Then move any entries from `src/data/careers.json` into Strapi and empty the JSON.

### 5. Editor guide (for KMF)

1. Content Manager → Career Notification → Create new entry (English locale).
2. Fill title, slug (e.g. `technical-officer-2026`, never change it after publishing), dates, status **open**, upload the notification PDF, and paste the official apply link.
3. Save → Publish. Switch the locale to **Kannada** → "Fill in from another locale" → translate the text fields → Publish.
4. When applications close, set status **closed**; when results are out, set **results** and add the PDF under *Updates*. Don't delete old notices.

---

## Priority 2 — none required

No other Strapi change is needed for this release. Page titles and descriptions come from `src/lib/seo.js`, and detail-page titles use existing fields (`title` / `name`).
