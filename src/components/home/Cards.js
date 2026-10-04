'use client';

import Link from 'next/link';

// "Explore" carousel card: image with the label always visible at the bottom
// (previously the label only appeared on hover, which does not work on touch screens).
export function FeatureCard({ imgUrl, title, href }) {
  return (
    <Link href={href} className="group relative m-auto block h-52 w-full max-w-72 overflow-hidden rounded-2xl bg-white md:h-96 md:max-w-96" style={{ boxShadow: '0px 11px 49px 0px rgba(0, 0, 0, 0.15)' }}>
      <img loading="lazy" decoding="async" src={imgUrl} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-12 text-left">
        <span className="inline-block rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary-main md:text-sm">{title}</span>
      </span>
    </Link>
  );
}

// Quick-link card: icon, title, one-line description, arrow. `featured` = large image card.
export function QuickLink({ icon, title, desc, href, featured = false, image, className = '' }) {
  if (featured) {
    return (
      <Link href={href} className="group relative col-span-2 flex min-h-[260px] flex-col justify-end overflow-hidden rounded-3xl bg-primary-darker p-6 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 md:row-span-2 md:min-h-0 md:p-8">
        {image && <img loading="lazy" decoding="async" src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />}
        <span className="absolute inset-0 bg-gradient-to-t from-primary-darker via-primary-darker/40 to-transparent" aria-hidden="true" />
        <span className="relative">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-main text-primary-darker">{icon}</span>
          <span className="mt-4 block font-heading text-xl uppercase leading-tight md:text-3xl">{title}</span>
          <span className="mt-2 block max-w-sm text-sm text-white/85 md:text-base">{desc}</span>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-secondary-lighter">
            <span>→</span>
          </span>
        </span>
      </Link>
    );
  }
  return (
    <Link href={href} className={`group flex flex-col gap-3 rounded-3xl border border-neutral-light1 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-main hover:shadow-lg ${className}`}>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-subtle text-primary-main transition-colors group-hover:bg-primary-main group-hover:text-white md:h-12 md:w-12">{icon}</span>
      <span className="block text-sm font-bold leading-snug text-gray-900 md:text-base">{title}</span>
      <span className="block text-xs leading-relaxed text-neutral-dark2 md:text-sm">{desc}</span>
      <span className="mt-auto text-sm font-bold text-primary-main transition-transform group-hover:translate-x-1" aria-hidden="true">
        →
      </span>
    </Link>
  );
}
