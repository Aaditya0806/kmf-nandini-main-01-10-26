import { getRow, getPhoto } from '@/lib/forms/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Streams a complaint's photo from the private bucket to a logged-in admin.
export async function GET(_req, { params }) {
  if (!/^[\w-]+$/.test(params.id)) return new Response('Not found', { status: 404 });
  const row = await getRow('complaints', 'id', params.id);
  if (!row?.photo_path) return new Response('Not found', { status: 404 });
  const file = await getPhoto(row.photo_path);
  if (!file) return new Response('Not found', { status: 404 });
  return new Response(file.bytes, {
    headers: { 'content-type': file.contentType, 'cache-control': 'private, no-store', 'content-disposition': `inline; filename="${row.ticket}.${row.photo_path.split('.').pop()}"`, 'x-content-type-options': 'nosniff' },
  });
}
