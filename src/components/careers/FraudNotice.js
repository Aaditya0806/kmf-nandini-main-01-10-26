import Link from 'next/link';

// "Beware of fake recruitment" panel. Server-rendered, no client JS.
export default function FraudNotice({ t, lang }) {
  return (
    <aside
      aria-labelledby="fraud-title"
      className="w-full rounded-lg border-l-4 border-red-600 bg-red-50 p-5 md:p-6 text-gray-900"
    >
      <h2 id="fraud-title" className="flex items-center gap-2 text-lg md:text-xl font-bold text-red-700">
        <span aria-hidden="true">⚠</span> {t.fraudTitle}
      </h2>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-sm md:text-base">
        {t.fraudPoints.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <p className="mt-3 text-sm md:text-base">
        {t.fraudReport}{' '}
        <Link href={`/${lang}/contact`} className="font-semibold text-primary-main underline">
          {t.fraudContact}
        </Link>
      </p>
    </aside>
  );
}
