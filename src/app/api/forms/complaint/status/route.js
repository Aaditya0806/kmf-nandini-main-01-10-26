import { complaintStatus } from '@/lib/forms/complaints';
import { json, bad, logError } from '@/lib/forms/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/forms/complaint/status?ticket=KMF-C-XXXXXX (no personal details in the reply)
export async function GET(req) {
  const ticket = new URL(req.url).searchParams.get('ticket') || '';
  try {
    const s = await complaintStatus(ticket);
    if (s.invalid) return bad('invalid ticket');
    return json(s, s.found ? 200 : 404);
  } catch (e) {
    logError('status', e);
    return bad('storage', undefined, 500);
  }
}
