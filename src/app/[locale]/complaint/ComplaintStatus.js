'use client';

import { useEffect, useState } from 'react';
import { complaintText, COMPLAINT_STATUS } from '@/configtext/forms';

const TICKET = /^KMF-?C-?[A-HJ-NP-Z2-9]{6}$/i;
const when = (iso, lang) => new Intl.DateTimeFormat(lang === 'kn' ? 'kn-IN' : 'en-IN', { dateStyle: 'medium', timeZone: 'Asia/Kolkata' }).format(new Date(iso));
const TONE = { open: 'bg-blue-50 text-blue-800', in_progress: 'bg-amber-50 text-amber-800', resolved: 'bg-emerald-50 text-emerald-800', rejected: 'bg-gray-100 text-gray-700' };

export default function ComplaintStatus({ lang, initialTicket = '' }) {
  const t = complaintText[lang];
  const [ticket, setTicket] = useState(initialTicket);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const check = async (value) => {
    const v = String(value || '').trim().toUpperCase().replace(/\s/g, '');
    setError('');
    setResult(null);
    if (!TICKET.test(v)) {
      setError(t.invalidTicket);
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`/api/forms/complaint/status?ticket=${encodeURIComponent(v)}`);
      const data = await res.json().catch(() => ({}));
      if (data.found) setResult(data);
      else setError(t.notFound);
    } catch (e) {
      setError(t.failed);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (initialTicket) check(initialTicket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTicket]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        check(ticket);
      }}
      className="space-y-3"
    >
      <label htmlFor="ticket" className="block text-sm font-semibold text-gray-800">
        {t.ticket}
      </label>
      <div className="flex gap-2">
        <input id="ticket" value={ticket} onChange={(e) => setTicket(e.target.value)} placeholder="KMF-C-XXXXXX" className="min-h-[44px] w-full rounded-xl border border-neutral-dark4 px-3 font-mono uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-primary-main" maxLength={14} autoCapitalize="characters" />
        <button type="submit" disabled={busy} className="min-h-[44px] shrink-0 rounded-xl bg-primary-main px-4 text-sm font-bold text-white disabled:opacity-60">
          {busy ? t.checking : t.check}
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
      {result && (
        <div className="rounded-xl border border-neutral-light1 bg-neutral-light3 p-4 text-sm" role="status">
          <p className="font-mono text-lg font-bold text-primary-main">{result.ticket}</p>
          <p className="mt-1">
            <span className="text-gray-600">{t.statusLabel}:</span>{' '}
            <span className={`rounded-full px-2.5 py-0.5 font-semibold ${TONE[result.status] || ''}`}>{COMPLAINT_STATUS[result.status]?.[lang] || result.status_text}</span>
          </p>
          <p className="mt-1 text-gray-700">
            {result.category}
            {result.product ? ` · ${result.product}` : ''}
          </p>
          <p className="mt-1 text-gray-600">
            {t.filedOn} {when(result.filed_at, lang)} · {t.updatedOn} {when(result.updated_at, lang)}
          </p>
          {result.note && (
            <p className="mt-2 rounded-lg bg-white p-3 text-gray-800">
              <span className="font-semibold">{t.kmfNote}:</span> {result.note}
            </p>
          )}
        </div>
      )}
    </form>
  );
}
