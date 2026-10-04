import { randomInt } from 'crypto';

// Ticket IDs shown to visitors: KMF-C-7K3PX9 (complaints), KMF-D-… (dealer applications).
// Alphabet without 0/O/1/I so they can be read out over the phone.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function newTicket(prefix) {
  let s = '';
  for (let i = 0; i < 6; i++) s += ALPHABET[randomInt(ALPHABET.length)];
  return `KMF-${prefix}-${s}`;
}

export const TICKET_RE = /^KMF-([CD])-([A-HJ-NP-Z2-9]{6})$/;

// "kmf c 7k3px9" / "KMFC7K3PX9" -> "KMF-C-7K3PX9" or null.
export function normaliseTicket(input) {
  const s = String(input || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .replace(/^KMF([CD])([A-Z0-9]{6})$/, 'KMF-$1-$2');
  return TICKET_RE.test(s) ? s : null;
}
