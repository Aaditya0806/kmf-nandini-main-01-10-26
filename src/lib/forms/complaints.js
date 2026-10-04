import { getRow } from './db';
import { normaliseTicket } from './tickets';
import { COMPLAINT_STATUS, COMPLAINT_CATEGORIES } from '@/configtext/forms';

// Public status of one complaint by ticket number. Used by the status API and
// by the Ask Nandini tool. Never returns personal details.
export async function complaintStatus(ticketInput) {
  const ticket = normaliseTicket(ticketInput);
  if (!ticket || !ticket.startsWith('KMF-C-')) return { found: false, invalid: true };
  const r = await getRow('complaints', 'ticket', ticket);
  if (!r) return { found: false, ticket };
  return {
    found: true,
    ticket,
    status: r.status,
    status_text: COMPLAINT_STATUS[r.status]?.en || r.status,
    category: COMPLAINT_CATEGORIES.find((c) => c.value === r.category)?.en || r.category,
    product: r.product || null,
    filed_at: r.created_at,
    updated_at: r.updated_at,
    note: r.status_note || null,
  };
}
