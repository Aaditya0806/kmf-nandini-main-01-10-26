import { insertRow } from '@/lib/forms/db';
import { takeFormSlot } from '@/lib/forms/limit';
import { str, text, mobile, email, pincode, place, isBot } from '@/lib/forms/validate';
import { stateFromPin, isKarnatakaPin } from '@/lib/forms/pincode';
import { DEMAND_PRODUCTS } from '@/configtext/forms';
import { json, bad, context, logError } from '@/lib/forms/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// "Notify me when available": { pincode, city, products[], other_product?, name?, mobile?, email?, note? }
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (e) {
    return bad('invalid JSON');
  }
  if (isBot(body)) return json({ ok: true });

  const allowed = DEMAND_PRODUCTS.map((p) => p.value);
  const fields = {};
  const row = {
    pincode: pincode(body.pincode),
    city: place(body.city),
    products: [...new Set((Array.isArray(body.products) ? body.products : []).filter((p) => allowed.includes(p)))],
    other_product: str(body.other_product, 80) || null,
    name: str(body.name, 80) || null,
    mobile: mobile(body.mobile) || null,
    email: email(body.email) || null,
    note: text(body.note, 500) || null,
    ...context(body),
  };
  if (!row.pincode) fields.pincode = true;
  if (!row.city) fields.city = true;
  if (!row.products.length && !row.other_product) fields.products = true;
  if (typeof body.mobile === 'string' && body.mobile.trim() && !row.mobile) fields.mobile = true;
  if (typeof body.email === 'string' && body.email.trim() && !row.email) fields.email = true;
  if (!row.mobile && !row.email) fields.contact = true;
  if (Object.keys(fields).length) return bad('validation', fields);
  row.state = stateFromPin(row.pincode) || 'Unknown';
  row.in_karnataka = isKarnatakaPin(row.pincode);

  if (!(await takeFormSlot(req))) return bad('rate_limited', undefined, 429);
  try {
    await insertRow('demand_requests', row);
  } catch (e) {
    logError('demand', e);
    return bad('storage', undefined, 500);
  }
  return json({ ok: true, state: row.state, city: row.city });
}
