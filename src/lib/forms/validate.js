// Shared validation for the public forms. Everything from the browser is untrusted.
import { PIN_RE } from './pincode';

export const MOBILE_RE = /^[6-9]\d{9}$/;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const str = (v, max = 200) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '');
export const text = (v, max = 2000) => (typeof v === 'string' ? v.replace(/\r\n?/g, '\n').replace(/[ \t]+\n/g, '\n').trim().slice(0, max) : '');

// "+91 98765 43210" -> "9876543210"; returns '' if not an Indian mobile number.
export function mobile(v) {
  const d = String(v || '').replace(/\D/g, '').replace(/^(91|0)(?=[6-9]\d{9}$)/, '');
  return MOBILE_RE.test(d) ? d : '';
}
export const email = (v) => (EMAIL_RE.test(str(v, 120)) ? str(v, 120).toLowerCase() : '');
export const pincode = (v) => (PIN_RE.test(str(v, 12)) ? str(v, 12) : '');
export const oneOf = (v, list) => (list.includes(v) ? v : '');
export const isoDate = (v) => (/^\d{4}-\d{2}-\d{2}$/.test(String(v || '')) && !Number.isNaN(Date.parse(v)) ? v : null);

// "bengaluru  north" -> "Bengaluru North"
export const place = (v) =>
  str(v, 80)
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\s.'-]/gu, '')
    .replace(/(^|[\s'-])\p{L}/gu, (c) => c.toUpperCase())
    .trim();

// Form bots fill every field, including the hidden one.
export const isBot = (body) => !!str(body?.website) || !!str(body?.company_url);
