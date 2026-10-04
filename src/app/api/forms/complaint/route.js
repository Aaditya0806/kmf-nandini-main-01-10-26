import { insertWithTicket, putPhoto, updateRow } from '@/lib/forms/db';
import { takeFormSlot } from '@/lib/forms/limit';
import { newTicket } from '@/lib/forms/tickets';
import { str, text, mobile, email, pincode, oneOf, place, isoDate, isBot } from '@/lib/forms/validate';
import { COMPLAINT_CATEGORIES } from '@/configtext/forms';
import { json, bad, context, logError } from '@/lib/forms/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const MAX_PHOTO = 4 * 1024 * 1024; // Vercel's request body limit is 4.5 MB
const TYPES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };

// Checks the real file type from its first bytes, not the browser's label.
function sniff(bytes) {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return 'image/png';
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) return 'image/webp';
  return null;
}

// Complaint with optional photo: multipart/form-data (fields as strings, "photo" = file).
export async function POST(req) {
  let form;
  try {
    form = await req.formData();
  } catch (e) {
    return bad('invalid form');
  }
  const body = Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === 'string'));
  if (isBot(body)) return json({ ok: true, ticket: 'KMF-C-THANKS' });

  const fields = {};
  const row = {
    category: oneOf(body.category, COMPLAINT_CATEGORIES.map((c) => c.value)),
    product: str(body.product, 120) || null,
    purchased_from: str(body.purchased_from, 160) || null,
    purchase_date: isoDate(body.purchase_date),
    batch: str(body.batch, 60) || null,
    pincode: pincode(body.pincode) || null,
    city: place(body.city) || null,
    description: text(body.description, 2000),
    name: str(body.name, 80),
    mobile: mobile(body.mobile),
    email: email(body.email) || null,
    status: 'open',
    ...context(body),
  };
  if (!row.category) fields.category = true;
  if (row.description.length < 10) fields.description = true;
  if (row.name.length < 2) fields.name = true;
  if (!row.mobile) fields.mobile = true;
  if (typeof body.email === 'string' && body.email.trim() && !row.email) fields.email = true;
  if (body.consent !== 'yes') fields.consent = true;
  if (['expired', 'quality', 'overcharge'].includes(row.category) && !row.product) fields.product = true;

  const photo = form.get('photo');
  let photoBytes = null;
  let photoType = null;
  if (photo && typeof photo !== 'string' && photo.size > 0) {
    if (photo.size > MAX_PHOTO) fields.photo = 'big';
    else {
      photoBytes = Buffer.from(await photo.arrayBuffer());
      photoType = sniff(photoBytes);
      if (!photoType) fields.photo = 'type';
    }
  }
  if (Object.keys(fields).length) return bad('validation', fields);

  if (!(await takeFormSlot(req))) return bad('rate_limited', undefined, 429);

  let saved;
  try {
    saved = await insertWithTicket('complaints', row, () => newTicket('C'));
  } catch (e) {
    logError('complaint', e);
    return bad('storage', undefined, 500);
  }

  let photoOk = !photoBytes;
  if (photoBytes) {
    try {
      const path = `${saved.created_at.slice(0, 4)}/${saved.ticket}.${TYPES[photoType]}`;
      await putPhoto(path, photoBytes, photoType);
      await updateRow('complaints', saved.id, { photo_path: path });
      photoOk = true;
    } catch (e) {
      logError('complaint-photo', e);
    }
  }

  return json({ ok: true, ticket: saved.ticket, photo: photoOk });
}
