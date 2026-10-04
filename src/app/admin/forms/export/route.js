import { listRows } from '@/lib/forms/db';
import { csvResponse, whenIST } from '@/lib/forms/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EXPORTS = {
  dealers: {
    table: 'dealer_applications',
    header: ['Reference', 'Date (IST)', 'Type', 'Name', 'Mobile', 'Email', 'Business', 'City', 'District', 'State', 'PIN', 'Has shop', 'Investment', 'Shop / experience', 'Message', 'Status', 'Admin note', 'Language'],
    row: (r) => [r.ticket, whenIST(r.created_at), r.type, r.name, r.mobile, r.email, r.organisation, r.city, r.district, r.state, r.pincode, r.has_shop == null ? '' : r.has_shop ? 'yes' : 'no', r.investment, r.shop_details, r.message, r.status, r.admin_note, r.lang],
  },
  demand: {
    table: 'demand_requests',
    header: ['Date (IST)', 'State', 'City', 'PIN', 'In Karnataka', 'Products', 'Other product', 'Name', 'Mobile', 'Email', 'Note', 'Notified on', 'Language'],
    row: (r) => [whenIST(r.created_at), r.state, r.city, r.pincode, r.in_karnataka ? 'yes' : 'no', r.products, r.other_product, r.name, r.mobile, r.email, r.note, whenIST(r.notified_at), r.lang],
  },
  complaints: {
    table: 'complaints',
    header: ['Ticket', 'Date (IST)', 'Category', 'Product', 'Bought from', 'Purchase date', 'Batch', 'City', 'PIN', 'Description', 'Photo', 'Name', 'Mobile', 'Email', 'Status', 'Note to visitor', 'Admin note', 'Updated (IST)', 'Language'],
    row: (r) => [r.ticket, whenIST(r.created_at), r.category, r.product, r.purchased_from, r.purchase_date, r.batch, r.city, r.pincode, r.description, r.photo_path ? 'yes' : 'no', r.name, r.mobile, r.email, r.status, r.status_note, r.admin_note, whenIST(r.updated_at), r.lang],
  },
};

// CSV of one table: /admin/forms/export?type=dealers|demand|complaints
export async function GET(req) {
  const type = new URL(req.url).searchParams.get('type');
  const def = EXPORTS[type];
  if (!def) return new Response('Unknown export', { status: 400 });
  const rows = [];
  for (let offset = 0; offset < 20000; offset += 1000) {
    const batch = await listRows(def.table, { limit: 1000, offset });
    rows.push(...batch);
    if (batch.length < 1000) break;
  }
  return csvResponse(`kmf-${type}-${new Date().toISOString().slice(0, 10)}.csv`, def.header, rows.map(def.row));
}
