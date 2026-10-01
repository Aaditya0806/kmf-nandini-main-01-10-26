import { CFG } from '@/lib/ask-nandini/config';
import { setFeedback } from '@/lib/ask-nandini/log';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Thumbs up/down for one logged answer: { id, value: 'up' | 'down' }.
export async function POST(req) {
  if (!CFG.enabled) return new Response('Not found', { status: 404 });
  try {
    const { id, value } = await req.json();
    const ok = await setFeedback(id, value);
    return new Response(null, { status: ok ? 204 : 400 });
  } catch (e) {
    return new Response(null, { status: 400 });
  }
}
