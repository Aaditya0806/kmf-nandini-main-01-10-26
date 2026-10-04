'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { TextInput, Textarea, Select, RadioGroup, SubmitButton, Alert, Honeypot, SuccessCard } from '@/components/forms/ui';
import { dealerText, DEALER_TYPES, INVESTMENT_RANGES, INDIAN_STATES } from '@/configtext/forms';
import { trackLead } from '@/lib/analytics';

const EMPTY = { type: '', name: '', mobile: '', email: '', organisation: '', city: '', district: '', state: 'Karnataka', pincode: '', has_shop: '', shop_details: '', investment: '', message: '' };

export default function DealerForm({ lang }) {
  const t = dealerText[lang];
  const pathname = usePathname();
  const [f, setF] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState('');
  const [ticket, setTicket] = useState('');

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e?.target ? e.target.value : e }));

  const validate = () => {
    const e = {};
    if (!f.type) e.type = t.required;
    if (f.name.trim().length < 2) e.name = t.required;
    if (!/^(\+?91[\s-]?|0)?[6-9]\d{9}$/.test(f.mobile.replace(/\s/g, ''))) e.mobile = t.invalidMobile;
    if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = t.invalidEmail;
    if (!f.city.trim()) e.city = t.required;
    if (!f.state) e.state = t.required;
    if (!/^[1-9]\d{5}$/.test(f.pincode.trim())) e.pincode = t.invalidPin;
    if (!f.has_shop) e.has_shop = t.required;
    if (!f.shop_details.trim()) e.shop_details = t.required;
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    setProblem('');
    if (Object.keys(e).length) {
      setProblem(t.fixErrors);
      return;
    }
    setBusy(true);
    try {
      const res = await fetch('/api/forms/dealer', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...f, website: ev.target.website?.value || '', lang, page: pathname }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ticket) {
        setTicket(data.ticket);
        trackLead('dealer_application');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (res.status === 429) setProblem(t.tooMany);
      else if (data.fields) {
        setErrors(Object.fromEntries(Object.keys(data.fields).map((k) => [k, t.required])));
        setProblem(t.fixErrors);
      } else setProblem(t.failed);
    } catch (err) {
      setProblem(t.failed);
    } finally {
      setBusy(false);
    }
  };

  if (ticket) return <SuccessCard title={t.successTitle} body={t.successBody} highlight={ticket} next={t.successNext} lang={lang} homeLabel={t.backHome} />;

  return (
    <form onSubmit={submit} noValidate className="relative space-y-5">
      <Honeypot />
      <RadioGroup name="type" label={t.type} options={DEALER_TYPES} value={f.type} onChange={set('type')} error={errors.type} lang={lang} required />
      <div className="grid gap-5 md:grid-cols-2">
        <TextInput id="name" label={t.name} value={f.name} onChange={set('name')} error={errors.name} required autoComplete="name" maxLength={80} />
        <TextInput id="mobile" label={t.mobile} hint={t.mobileHint} value={f.mobile} onChange={set('mobile')} error={errors.mobile} required type="tel" inputMode="numeric" autoComplete="tel" maxLength={16} />
        <TextInput id="email" label={t.email} value={f.email} onChange={set('email')} error={errors.email} type="email" autoComplete="email" maxLength={120} />
        <TextInput id="organisation" label={t.organisation} value={f.organisation} onChange={set('organisation')} maxLength={120} />
        <TextInput id="city" label={t.city} value={f.city} onChange={set('city')} error={errors.city} required autoComplete="address-level2" maxLength={80} />
        <TextInput id="district" label={t.district} value={f.district} onChange={set('district')} maxLength={80} />
        <Select id="state" label={t.state} value={f.state} onChange={set('state')} error={errors.state} required options={INDIAN_STATES} lang={lang} />
        <TextInput id="pincode" label={t.pincode} value={f.pincode} onChange={set('pincode')} error={errors.pincode} required inputMode="numeric" autoComplete="postal-code" maxLength={6} />
      </div>
      <RadioGroup
        name="has_shop"
        label={t.hasShop}
        options={[
          { value: 'yes', label: t.yes },
          { value: 'no', label: t.no },
        ]}
        value={f.has_shop}
        onChange={set('has_shop')}
        error={errors.has_shop}
        required
      />
      <Textarea id="shop_details" label={t.shopDetails} hint={t.shopDetailsHint} value={f.shop_details} onChange={set('shop_details')} error={errors.shop_details} required maxLength={1000} />
      <Select id="investment" label={t.investment} value={f.investment} onChange={set('investment')} options={INVESTMENT_RANGES} placeholder="—" lang={lang} />
      <Textarea id="message" label={t.message} value={f.message} onChange={set('message')} rows={3} maxLength={1000} />
      {problem && <Alert>{problem}</Alert>}
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton busy={busy} busyText={t.submitting}>
          {t.submit}
        </SubmitButton>
        <p className="text-xs text-gray-500">{t.privacy}</p>
      </div>
    </form>
  );
}
