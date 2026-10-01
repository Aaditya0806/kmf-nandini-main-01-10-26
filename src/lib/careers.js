import data from '@/data/careers.json';

// Recruitment notices come from src/data/careers.json until the Strapi
// "career-notification" collection exists (docs/STRAPI_CHANGES.md). Each job:
// {
//   id, slug, status: 'open' | 'closed' | 'results',
//   title, post, unit, location, qualification, ageLimit: { en, kn },
//   vacancies: number, startDate, lastDate, publishedDate: 'YYYY-MM-DD',
//   notificationPdf, applyUrl: url,
//   updates: [{ type: 'result' | 'admit-card' | 'update', label: { en, kn }, url, date }]
// }

const CLOSING_SOON_DAYS = 7;

// Today's date in India, as YYYY-MM-DD, so "last date" means the whole last day.
export function todayIST(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now);
}

function daysBetween(a, b) {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
}

// Pick the visitor's language, falling back to English (or a plain string).
export function tr(value, lang) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[lang] || value.en || '';
}

// 'open' notices past their last date are treated as closed automatically.
export function effectiveStatus(job, today = todayIST()) {
  if (job.status === 'open' && job.lastDate && job.lastDate < today) return 'closed';
  return job.status || 'closed';
}

export function isClosingSoon(job, today = todayIST()) {
  if (effectiveStatus(job, today) !== 'open' || !job.lastDate) return false;
  const left = daysBetween(today, job.lastDate);
  return left >= 0 && left <= CLOSING_SOON_DAYS;
}

function isValidJob(job) {
  return job && typeof job.slug === 'string' && /^[a-z0-9-]+$/.test(job.slug) && job.title;
}

export function getJobs() {
  const jobs = Array.isArray(data?.jobs) ? data.jobs.filter(isValidJob) : [];
  // Newest first.
  return [...jobs].sort((a, b) => String(b.publishedDate || '').localeCompare(String(a.publishedDate || '')));
}

export function getJob(slug) {
  return getJobs().find((j) => j.slug === slug) || null;
}

// Plain object the client-side list can filter without re-deriving dates.
export function toCard(job, lang, today = todayIST()) {
  return {
    id: String(job.id ?? job.slug),
    slug: job.slug,
    status: effectiveStatus(job, today),
    closingSoon: isClosingSoon(job, today),
    title: tr(job.title, lang),
    post: tr(job.post, lang),
    unit: tr(job.unit, lang),
    location: tr(job.location, lang),
    vacancies: job.vacancies ?? null,
    lastDate: job.lastDate || '',
    publishedDate: job.publishedDate || '',
    notificationPdf: job.notificationPdf || '',
    applyUrl: job.applyUrl || '',
    updates: (job.updates || []).map((u) => ({
      type: u.type || 'update',
      label: tr(u.label, lang),
      url: u.url || '',
      date: u.date || '',
    })),
  };
}

// "2026-10-05" -> "05 Oct 2026" / "05 ಅಕ್ಟೋ 2026"
export function formatDate(iso, lang) {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00+05:30`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(lang === 'kn' ? 'kn-IN' : 'en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(d);
}
