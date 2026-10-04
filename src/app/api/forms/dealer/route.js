import { insertWithTicket } from '@/lib/forms/db';
import { takeFormSlot } from '@/lib/forms/limit';
import { newTicket } from '@/lib/forms/tickets';
import { str, text, mobile, email, pincode, oneOf, place, isBot } from '@/lib/forms/validate';
import { stateFromPin } from '@/lib/forms/pincode';
import { DEALER_TYPES, INVESTMENT_RANGES, INDIAN_STATES } from '@/configtext/forms';
import { json, bad, context, logError } from '@/lib/forms/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Dealer / parlour / agency / distributor application: { type, name, mobile, email?, organisation?, city, district?, state, pincode, has_shop, shop_details, investment, message? }
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (e) {
    return bad('invalid JSON');
  }
  if (isBot(body)) return json({ ok: true, ticket: 'KMF-D-THANKS' }); // silently drop bots

  const fields = {};
  const row = {
    type: oneOf(body.type, DEALER_TYPES.map((t) => t.value)),
    name: str(body.name, 80),
    mobile: mobile(body.mobile),
    email: email(body.email) || null,
    organisation: str(body.organisation, 120) || null,
    city: place(body.city),
    district: place(body.district) || null,
    state: oneOf(str(body.state, 60), INDIAN_STATES),
    pincode: pincode(body.pincode),
    has_shop: body.has_shop === true || body.has_shop === 'yes' ? true : body.has_shop === false || body.has_shop === 'no' ? false : null,
    shop_details: text(body.shop_details, 1000) || null,
    investment: oneOf(body.investment, INVESTMENT_RANGES.map((i) => i.value)) || null,
    message: text(body.message, 1000) || null,
    status: 'new',
    ...context(body),
  };
  if (!row.type) fields.type = true;
  if (row.name.length < 2) fields.name = true;
  if (!row.mobile) fields.mobile = true;
  if (typeof body.email === 'string' && body.email.trim() && !row.email) fields.email = true;
  if (!row.city) fields.city = true;
  if (!row.state) fields.state = true;
  if (!row.pincode) fields.pincode = true;
  if (Object.keys(fields).length) return bad('validation', fields);
  if (!row.state && row.pincode) row.state = stateFromPin(row.pincode);

  if (!(await takeFormSlot(req))) return bad('rate_limited', undefined, 429);

  let saved;
  try {
    saved = await insertWithTicket('dealer_applications', row, () => newTicket('D'));
  } catch (e) {
    logError('dealer', e);
    return bad('storage', undefined, 500);
  }

  return json({ ok: true, ticket: saved.ticket });
}
