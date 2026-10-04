import { sendDemandReport } from '@/lib/forms/report';
import { sameOrigin, redirectTo } from '@/lib/forms/admin';
import { adminUrl } from '@/lib/forms/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// "Send report now" button on the admin page.
export async function POST(req) {
  if (!sameOrigin(req)) return new Response('Forbidden', { status: 403 });
  const form = await req.formData();
  const days = [7, 30, 90].includes(Number(form.get('days'))) ? Number(form.get('days')) : 7;
  const r = await sendDemandReport({ trigger: 'admin', days, adminUrl: adminUrl('demand') });
  return redirectTo(`/admin/forms?tab=demand&report=${!r ? 'off' : r.sent ? 'sent' : 'failed'}`);
}
