import { updateRow } from '@/lib/forms/db';
import { sameOrigin, redirectTo } from '@/lib/forms/admin';
import { str, text } from '@/lib/forms/validate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED = {
  complaint: { table: 'complaints', statuses: ['open', 'in_progress', 'resolved', 'rejected'], tab: 'complaints' },
  dealer: { table: 'dealer_applications', statuses: ['new', 'contacted', 'closed'], tab: 'dealers' },
  demand: { table: 'demand_requests', statuses: [], tab: 'demand' },
};

// Status / note changes from the admin page (HTML form POST, then back to the list).
export async function POST(req) {
  if (!sameOrigin(req)) return new Response('Forbidden', { status: 403 });
  const form = await req.formData();
  const kind = ALLOWED[String(form.get('type'))];
  const id = str(form.get('id'), 60);
  if (!kind || !/^[\w-]+$/.test(id)) return new Response('Bad request', { status: 400 });

  const patch = {};
  if (kind.statuses.length) {
    const status = String(form.get('status') || '');
    if (!kind.statuses.includes(status)) return new Response('Bad status', { status: 400 });
    patch.status = status;
  }
  if (form.has('status_note')) patch.status_note = text(form.get('status_note'), 500) || null;
  if (form.has('admin_note')) patch.admin_note = text(form.get('admin_note'), 1000) || null;
  if (form.get('notified') === 'yes') patch.notified_at = new Date().toISOString();
  if (form.get('notified') === 'no') patch.notified_at = null;

  await updateRow(kind.table, id, patch);
  const back = String(form.get('back') || '');
  return redirectTo(back.startsWith('/admin/forms') ? back : `/admin/forms?tab=${kind.tab}`);
}
