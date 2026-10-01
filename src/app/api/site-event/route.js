import { recordSiteEvent } from '@/lib/site-events';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Records a click for the admin page: { event, value }. Unknown events are ignored.
export async function POST(req) {
  try {
    const text = await req.text();
    if (text.length > 200) return new Response(null, { status: 400 });
    const { event, value = '' } = JSON.parse(text || '{}');
    await recordSiteEvent(req, String(event || ''), String(value || ''));
  } catch (e) {
    // counting must never affect the visitor
  }
  return new Response(null, { status: 204 });
}
