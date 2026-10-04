'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { TextInput, Textarea, Select, Field, SubmitButton, Alert, Honeypot, SuccessCard } from '@/components/forms/ui';
import { complaintText, COMPLAINT_CATEGORIES } from '@/configtext/forms';
import { trackLead } from '@/lib/analytics';

const MAX_BYTES = 4 * 1024 * 1024;
const TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Phone photos are often 5–12 MB: shrink to 1600 px JPEG in the browser so the
// upload is quick and stays under the server's 4 MB limit.
async function shrink(file) {
  if (file.size < 900 * 1024) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((r) => canvas.toBlob(r, 'image/jpeg', 0.85));
    return blob && blob.size < file.size ? new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' }) : file;
  } catch (e) {
    return file;
  }
}

export default function ComplaintForm({ lang }) {
  const t = complaintText[lang];
  const pathname = usePathname();
  const [f, setF] = useState({ category: '', product: '', purchased_from: '', purchase_date: '', batch: '', city: '', pincode: '', description: '', name: '', mobile: '', email: '', consent: false });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState('');
  const [done, setDone] = useState(null);

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e?.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e }));

  const pickPhoto = async (e) => {
    const file = e.target.files?.[0];
    setErrors((p) => ({ ...p, photo: '' }));
    if (!file) return;
    if (!TYPES.includes(file.type)) {
      setErrors((p) => ({ ...p, photo: t.photoBad }));
      e.target.value = '';
      return;
    }
    const small = await shrink(file);
    if (small.size > MAX_BYTES) {
      setErrors((p) => ({ ...p, photo: t.photoBig }));
      e.target.value = '';
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    setPhoto(small);
    setPreview(URL.createObjectURL(small));
  };
  const removePhoto = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPhoto(null);
    setPreview('');
  };

  const needsProduct = ['expired', 'quality', 'overcharge'].includes(f.category);
  const validate = () => {
    const e = {};
    if (!f.category) e.category = t.required;
    if (needsProduct && !f.product.trim()) e.product = t.required;
    if (f.description.trim().length < 10) e.description = t.required;
    if (f.name.trim().length < 2) e.name = t.required;
    if (!/^(\+?91[\s-]?|0)?[6-9]\d{9}$/.test(f.mobile.replace(/\s/g, ''))) e.mobile = t.invalidMobile;
    if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = t.invalidEmail;
    if (f.pincode.trim() && !/^[1-9]\d{5}$/.test(f.pincode.trim())) e.pincode = t.invalidPin;
    if (!f.consent) e.consent = t.needConsent;
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
      const fd = new FormData();
      for (const [k, v] of Object.entries(f)) fd.append(k, k === 'consent' ? (v ? 'yes' : 'no') : v);
      fd.append('website', ev.target.website?.value || '');
      fd.append('lang', lang);
      fd.append('page', pathname);
      if (photo) fd.append('photo', photo, photo.name);
      const res = await fetch('/api/forms/complaint', { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ticket) {
        setDone(data);
        trackLead('complaint');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (res.status === 429) setProblem(t.tooMany);
      else if (data.fields) {
        setErrors(Object.fromEntries(Object.keys(data.fields).map((k) => [k, k === 'photo' ? (data.fields.photo === 'big' ? t.photoBig : t.photoBad) : t.required])));
        setProblem(t.fixErrors);
      } else setProblem(t.failed);
    } catch (err) {
      setProblem(t.failed);
    } finally {
      setBusy(false);
    }
  };

  if (done) return <SuccessCard title={t.successTitle} body={t.successBody} highlight={done.ticket} next={t.successNext} extra={done.photo === false ? t.successPhotoFailed : ''} lang={lang} homeLabel={t.backHome} />;

  return (
    <form onSubmit={submit} noValidate className="relative space-y-5">
      <Honeypot />
      <Select id="category" label={t.category} value={f.category} onChange={set('category')} error={errors.category} required options={COMPLAINT_CATEGORIES} placeholder="—" lang={lang} />
      <div className="grid gap-5 md:grid-cols-2">
        <TextInput id="product" label={t.product} hint={t.productHint} value={f.product} onChange={set('product')} error={errors.product} required={needsProduct} maxLength={120} />
        <TextInput id="purchased_from" label={t.purchasedFrom} hint={t.purchasedFromHint} value={f.purchased_from} onChange={set('purchased_from')} maxLength={160} />
        <TextInput id="purchase_date" label={t.purchaseDate} value={f.purchase_date} onChange={set('purchase_date')} type="date" max={new Date().toISOString().slice(0, 10)} />
        <TextInput id="batch" label={t.batch} value={f.batch} onChange={set('batch')} maxLength={60} />
        <TextInput id="city" label={t.city} value={f.city} onChange={set('city')} autoComplete="address-level2" maxLength={80} />
        <TextInput id="pincode" label={t.pincode} value={f.pincode} onChange={set('pincode')} error={errors.pincode} inputMode="numeric" autoComplete="postal-code" maxLength={6} />
      </div>
      <Textarea id="description" label={t.description} hint={t.descriptionHint} value={f.description} onChange={set('description')} error={errors.description} required rows={5} maxLength={2000} />
      <Field id="photo" label={t.photo} hint={t.photoHint} error={errors.photo}>
        <input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" capture="environment" onChange={pickPhoto} className="mt-1.5 block w-full text-sm text-gray-700 file:mr-3 file:rounded-full file:border-0 file:bg-primary-subtle file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-main" />
        {preview && (
          <div className="mt-2 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="h-24 w-24 rounded-lg object-cover ring-1 ring-black/10" />
            <button type="button" onClick={removePhoto} className="text-sm font-semibold text-red-700 underline">
              {t.photoRemove}
            </button>
          </div>
        )}
      </Field>
      <div className="grid gap-5 md:grid-cols-3">
        <TextInput id="name" label={t.name} value={f.name} onChange={set('name')} error={errors.name} required autoComplete="name" maxLength={80} />
        <TextInput id="mobile" label={t.mobile} hint={t.mobileHint} value={f.mobile} onChange={set('mobile')} error={errors.mobile} required type="tel" inputMode="numeric" autoComplete="tel" maxLength={16} />
        <TextInput id="email" label={t.email} value={f.email} onChange={set('email')} error={errors.email} type="email" autoComplete="email" maxLength={120} />
      </div>
      <div>
        <label className="flex items-start gap-2 text-sm text-gray-800">
          <input type="checkbox" name="consent" checked={f.consent} onChange={set('consent')} className="mt-1 accent-primary-main" />
          <span>{t.consent}</span>
        </label>
        {errors.consent && (
          <p className="mt-1 text-sm text-red-700" role="alert">
            {errors.consent}
          </p>
        )}
      </div>
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
