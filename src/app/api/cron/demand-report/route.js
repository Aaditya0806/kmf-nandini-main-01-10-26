import { sendDemandReport } from '@/lib/forms/report';
import { adminUrl, json, logError } from '@/lib/forms/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// Optional weekly demand report email, run by the Vercel cron in vercel.json
// (Monday 09:00 IST). Only sends when FORMS_NOTIFY_TO is set; Vercel sends
// "Authorization: Bearer <CRON_SECRET>", without the secret the endpoint does nothing.
export async function GET(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) return new Response('Unauthorized', { status: 401 });
  try {
    const r = await sendDemandReport({ trigger: 'cron', days: 7, adminUrl: adminUrl('demand') });
    if (!r) return json({ ok: true, skipped: 'email report off (FORMS_NOTIFY_TO not set)' });
    return json({ ok: true, sent: r.sent, new_requests: r.new_requests, total_requests: r.total_requests, error: r.error });
  } catch (e) {
    logError('cron', e);
    return json({ ok: false }, 500);
  }
}
