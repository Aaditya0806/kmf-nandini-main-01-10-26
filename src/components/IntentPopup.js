'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { INTENT_OPTIONS, INTENT_TEXT } from '@/configtext/intentPopup';
import { trackIntentDismissed, trackIntentSelected } from '@/lib/analytics';

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Centred modal on desktop, bottom sheet on mobile. Loaded on demand by
// IntentPopupLoader; fixed-position, so it never shifts page layout.
export default function IntentPopup({ lang, onClose, remember }) {
  const router = useRouter();
  const dialogRef = useRef(null);
  const t = INTENT_TEXT[lang] || INTENT_TEXT.en;

  const dismiss = () => {
    trackIntentDismissed();
    remember('dismissed');
    onClose();
  };

  const choose = (option) => {
    trackIntentSelected(option.id);
    remember(option.id);
    onClose();
    if (option.path) router.push(`/${lang}${option.path}`);
  };

  // Focus trap, Esc to close, restore focus and page scroll afterwards.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const dialog = dialogRef.current;
    dialog?.querySelector(FOCUSABLE)?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        dismiss();
        return;
      }
      if (e.key !== 'Tab' || !dialog) return;
      const items = [...dialog.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/60 md:items-center md:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="intent-title"
        aria-describedby="intent-subtitle"
        lang={lang}
        className="relative w-full max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white p-5 pb-8 shadow-2xl md:max-w-2xl md:rounded-2xl md:p-8"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label={t.close}
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-3xl leading-none text-gray-600 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-main"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300 md:hidden" aria-hidden="true" />
        <h2 id="intent-title" className="pr-10 font-heading text-xl font-extrabold text-primary-main md:text-2xl">
          {t.title}
        </h2>
        <p id="intent-subtitle" className="mt-2 text-sm text-gray-700 md:text-base">
          {t.subtitle}
        </p>

        <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {INTENT_OPTIONS.map((o) => (
            <li key={o.id} className={o.path ? '' : 'md:col-span-2'}>
              <button
                type="button"
                onClick={() => choose(o)}
                className={`flex min-h-[52px] w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main ${
                  o.path
                    ? 'border-primary-lighter bg-primary-subtle text-primary-darker hover:bg-primary-main hover:text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{o[lang] || o.en}</span>
                {o.path && <span aria-hidden="true">→</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
