import { exportQuestions } from '@/lib/ask-nandini/log';

// CSV download of all logged questions: /admin/ask-nandini/export?days=30
// Protected by the same Basic auth as the admin page (src/middleware.js, /admin/*).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const cell = (v) => {
  const s = v == null ? '' : Array.isArray(v) ? v.join(' ') : String(v);
  // Neutralise spreadsheet formulas (=, +, -, @) and quote everything.
  return `"${(/^[=+\-@]/.test(s) ? `'${s}` : s).replace(/"/g, '""')}"`;
};

export async function GET(req) {
  const days = [7, 30, 90].includes(Number(new URL(req.url).searchParams.get('days'))) ? Number(new URL(req.url).searchParams.get('days')) : 30;
  const rows = await exportQuestions(days);
  const fmt = new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' });
  const header = ['Date (IST)', 'Question', 'Answer', 'Language', 'Page', 'Answered by', 'Answered', 'Fallback', 'Feedback'];
  const lines = [header.map(cell).join(',')];
  for (const r of rows) {
    lines.push(
      [fmt.format(new Date(r.created_at)), r.question, r.answer, r.lang, r.page, r.model === 'stored' ? 'Stored reply' : r.model ? 'Claude' : '', r.answered ? 'yes' : 'no', r.fallback, r.feedback]
        .map(cell)
        .join(',')
    );
  }
  const body = '﻿' + lines.join('\r\n'); // BOM so Excel opens UTF-8 (Kannada etc.) correctly
  return new Response(body, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="ask-nandini-questions-${days}d-${new Date().toISOString().slice(0, 10)}.csv"`,
      'cache-control': 'no-store',
    },
  });
}
