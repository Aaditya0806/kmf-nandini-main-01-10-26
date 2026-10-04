'use client';

import Link from 'next/link';

// Shared building blocks for the dealership, notify-me and complaint forms.
// Plain, accessible markup: every control has a label, errors are announced.

const input = 'mt-1.5 w-full rounded-xl border bg-white px-3 py-2.5 text-base text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-main';
const ok = 'border-neutral-dark4';
const err = 'border-red-500 ring-1 ring-red-300';

export function Field({ id, label, hint, error, required, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-800">
        {label}
        {required && (
          <span className="ml-0.5 text-red-600" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-0.5 text-xs text-gray-500">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const aria = (id, hint, error) => ({
  'aria-invalid': error ? 'true' : undefined,
  'aria-describedby': [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined,
});

export function TextInput({ id, label, hint, error, required, className = '', ...rest }) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      <input id={id} name={id} required={required} className={`${input} ${error ? err : ok} ${className}`} {...aria(id, hint, error)} {...rest} />
    </Field>
  );
}

export function Textarea({ id, label, hint, error, required, rows = 4, ...rest }) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      <textarea id={id} name={id} rows={rows} required={required} className={`${input} ${error ? err : ok}`} {...aria(id, hint, error)} {...rest} />
    </Field>
  );
}

export function Select({ id, label, hint, error, required, options, placeholder, lang = 'en', ...rest }) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      <select id={id} name={id} required={required} className={`${input} ${error ? err : ok}`} {...aria(id, hint, error)} {...rest}>
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>
            {o[lang] ?? o.label ?? o}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function RadioGroup({ name, label, options, value, onChange, error, lang = 'en', required }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-gray-800">
        {label}
        {required && (
          <span className="ml-0.5 text-red-600" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <label key={o.value} className={`flex cursor-pointer items-start gap-2 rounded-xl border bg-white p-3 text-sm shadow-sm ${value === o.value ? 'border-primary-main ring-1 ring-primary-main' : 'border-neutral-dark4'}`}>
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="mt-0.5 accent-primary-main" />
            <span>{o[lang] ?? o.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function CheckboxGroup({ name, label, options, values, onChange, error, lang = 'en', required }) {
  const toggle = (v) => onChange(values.includes(v) ? values.filter((x) => x !== v) : [...values, v]);
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-gray-800">
        {label}
        {required && (
          <span className="ml-0.5 text-red-600" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = values.includes(o.value);
          return (
            <label key={o.value} className={`cursor-pointer select-none rounded-full border px-3.5 py-2 text-sm font-semibold shadow-sm ${on ? 'border-primary-main bg-primary-main text-white' : 'border-neutral-dark4 bg-white text-gray-800'}`}>
              <input type="checkbox" name={name} value={o.value} checked={on} onChange={() => toggle(o.value)} className="sr-only" />
              {o[lang] ?? o.label}
            </label>
          );
        })}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function SubmitButton({ busy, children, busyText }) {
  return (
    <button type="submit" disabled={busy} className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary-main px-8 text-base font-bold text-white shadow hover:bg-primary-darker disabled:opacity-60">
      {busy ? busyText : children}
    </button>
  );
}

export function Alert({ children, tone = 'error' }) {
  const cls = tone === 'error' ? 'border-red-300 bg-red-50 text-red-800' : 'border-amber-300 bg-amber-50 text-amber-900';
  return (
    <p className={`rounded-lg border p-3 text-sm ${cls}`} role="alert">
      {children}
    </p>
  );
}

// Hidden from people, filled by bots.
export function Honeypot() {
  return (
    <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function SuccessCard({ title, body, highlight, next, extra, lang, homeLabel }) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 md:p-8" role="status" aria-live="polite">
      <p className="text-2xl font-extrabold text-emerald-800">✓ {title}</p>
      <p className="mt-3 text-gray-800">{body}</p>
      {highlight && <p className="mt-2 select-all rounded-lg bg-white px-4 py-3 font-mono text-2xl font-bold tracking-wider text-primary-main shadow-sm">{highlight}</p>}
      <p className="mt-3 text-sm text-gray-700">{next}</p>
      {extra && <p className="mt-3 text-sm text-amber-900">{extra}</p>}
      <Link href={`/${lang}`} className="mt-5 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-primary-main shadow-sm">
        {homeLabel}
      </Link>
    </div>
  );
}
