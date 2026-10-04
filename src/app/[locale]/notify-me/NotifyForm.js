'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { TextInput, Textarea, CheckboxGroup, SubmitButton, Alert, Honeypot, SuccessCard } from '@/components/forms/ui';
import { notifyText, DEMAND_PRODUCTS } from '@/configtext/forms';
import { stateFromPin } from '@/lib/forms/pincode';
import { trackLead } from '@/lib/analytics';

export default function NotifyForm({ lang, initial = {} }) {
  const t = notifyText[lang];
  const pathname = usePathname();
  const known = DEMAND_PRODUCTS.map((p) => p.value);
  const [f, setF] = useState({
    pincode: initial.pincode || '',
    city: '',
    products: known.includes(initial.product) ? [initial.product] : [],
    other_product: initial.product && !known.includes(initial.product) ? initial.product : '',
    name: '',
    mobile: '',
    email: '',
    note: '',
  });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState('');
  const [done, setDone] = useState(null);

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e?.target ? e.target.value : e }));
  const detected = stateFromPin(f.pincode);

  const validate = () => {
    const e = {};
    if (!/^[1-9]\d{5}$/.test(f.pincode.trim())) e.pincode = t.invalidPin;
    if (!f.city.trim()) e.city = t.required;
    if (!f.products.length && !f.other_product.trim()) e.products = t.needProduct;
    if (f.mobile.trim() && !/^(\+?91[\s-]?|0)?[6-9]\d{9}$/.test(f.mobile.replace(/\s/g, ''))) e.mobile = t.invalidMobile;
    if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = t.invalidEmail;
    if (!f.mobile.trim() && !f.email.trim()) e.contact = t.needContact;
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    setProblem('');
    if (Object.keys(e).length) {
      setProblem(e.contact || t.fixErrors);
      return;
    }
    setBusy(true);
    try {
      const res = await fetch('/api/forms/demand', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...f, website: ev.target.website?.value || '', lang, page: pathname }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setDone(data);
        trackLead('notify_me');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (res.status === 429) setProblem(t.tooMany);
      else if (data.fields) {
        setErrors(Object.fromEntries(Object.keys(data.fields).map((k) => [k, t.required])));
        setProblem(data.fields.contact ? t.needContact : t.fixErrors);
      } else setProblem(t.failed);
    } catch (err) {
      setProblem(t.failed);
    } finally {
      setBusy(false);
    }
  };

  if (done) return <SuccessCard title={t.successTitle} body={`${t.successBody}`} highlight={`${done.city}, ${done.state}`} next={t.successNext} lang={lang} homeLabel={t.backHome} />;

  return (
    <form onSubmit={submit} noValidate className="relative space-y-5">
      <Honeypot />
      <div className="grid gap-5 md:grid-cols-2">
        <TextInput id="pincode" label={t.pincode} hint={detected ? `${t.pincodeHint} ${t.detected}: ${detected}.` : t.pincodeHint} value={f.pincode} onChange={set('pincode')} error={errors.pincode} required inputMode="numeric" autoComplete="postal-code" maxLength={6} />
        <TextInput id="city" label={t.city} value={f.city} onChange={set('city')} error={errors.city} required autoComplete="address-level2" maxLength={80} />
      </div>
      <CheckboxGroup name="products" label={t.products} options={DEMAND_PRODUCTS} values={f.products} onChange={set('products')} error={errors.products} lang={lang} required />
      <TextInput id="other_product" label={t.otherProduct} value={f.other_product} onChange={set('other_product')} maxLength={80} />
      <fieldset className="rounded-xl border border-neutral-light1 bg-neutral-light3 p-4">
        <legend className="px-1 text-sm font-semibold text-gray-800">{t.contactTitle}</legend>
        <p className="text-xs text-gray-500">{t.contactHint}</p>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          <TextInput id="name" label={t.name} value={f.name} onChange={set('name')} autoComplete="name" maxLength={80} />
          <TextInput id="mobile" label={t.mobile} value={f.mobile} onChange={set('mobile')} error={errors.mobile} type="tel" inputMode="numeric" autoComplete="tel" maxLength={16} />
          <TextInput id="email" label={t.email} value={f.email} onChange={set('email')} error={errors.email} type="email" autoComplete="email" maxLength={120} />
        </div>
      </fieldset>
      <Textarea id="note" label={t.note} hint={t.noteHint} value={f.note} onChange={set('note')} rows={3} maxLength={500} />
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
