import nodemailer from 'nodemailer';

// SMTP transport for the optional weekly demand report (the contact form has
// its own copy in /api/send-email). New applications and complaints are NOT
// emailed: they are read on /admin/forms.
// FORMS_SMTP_USER / FORMS_SMTP_PASSWORD are preferred; the contact form's
// NEXT_PUBLIC_EMAIL / NEXT_PUBLIC_PASSWORD (Gmail app password) remain the fallback.

const user = () => process.env.FORMS_SMTP_USER || process.env.NEXT_PUBLIC_EMAIL || '';
const pass = () => process.env.FORMS_SMTP_PASSWORD || process.env.NEXT_PUBLIC_PASSWORD || '';

export const mailConfigured = () => !!(user() && pass());

// Who receives the optional weekly demand report (comma-separated). Unset = no emails:
// form submissions are only shown on /admin/forms.
export const notifyTo = () => (process.env.FORMS_NOTIFY_TO || '').split(',').map((s) => s.trim()).filter(Boolean);
export const reportEnabled = () => mailConfigured() && notifyTo().length > 0;

export async function sendMail({ to = notifyTo(), subject, text, html, replyTo }) {
  if (!mailConfigured()) throw new Error('mail not configured');
  const transporter = nodemailer.createTransport({
    host: process.env.FORMS_SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.FORMS_SMTP_PORT || 465),
    secure: (process.env.FORMS_SMTP_SECURE || 'true') !== 'false',
    auth: { user: user(), pass: pass() },
  });
  await transporter.sendMail({ from: `"KMF Nandini website" <${user()}>`, to: to.join(', '), subject, text, html, replyTo });
  return to;
}
