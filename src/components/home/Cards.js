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

// Quick-link tile.
export function QuickLink({ icon, title, href }) {
  return (
    <Link href={href} className="group flex flex-col items-center gap-3 rounded-2xl border border-neutral-light1 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-main hover:shadow-md md:p-6">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-subtle text-primary-main transition-colors group-hover:bg-primary-main group-hover:text-white md:h-20 md:w-20">{icon}</span>
      <span className="text-xs font-semibold text-gray-800 md:text-base">{title}</span>
    </Link>
  );
}
