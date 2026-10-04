import Footer from '@/components/Footer';

// Server-rendered frame shared by the three form pages: hero band + content.
export function Hero({ title, intro, note }) {
  return (
    <section className="w-full bg-primary-gradient pt-44 pb-12 px-4 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-heading text-3xl md:text-5xl font-extrabold uppercase">{title}</h1>
        <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed">{intro}</p>
        {note && <p className="mt-3 font-semibold text-secondary-lighter">{note}</p>}
      </div>
    </section>
  );
}

export function Card({ title, intro, children, id }) {
  return (
    <section id={id} className="rounded-2xl border border-neutral-light1 bg-white p-5 shadow-sm md:p-8">
      {title && <h2 className="font-heading text-xl md:text-2xl font-extrabold uppercase text-primary-main">{title}</h2>}
      {intro && <p className="mt-2 text-sm text-gray-600">{intro}</p>}
      <div className={title || intro ? 'mt-5' : ''}>{children}</div>
    </section>
  );
}

export function InfoBox({ title, children }) {
  return (
    <aside className="rounded-2xl border-l-4 border-secondary-main bg-secondary-subtle p-5 text-sm text-gray-800">
      <h2 className="text-base font-bold text-primary-main">{title}</h2>
      <div className="mt-2 space-y-2">{children}</div>
    </aside>
  );
}

export default function PageShell({ hero, children, aside }) {
  return (
    <div className="w-full bg-[#F6F6F6]">
      {hero}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className={aside ? 'grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]' : ''}>
          <div className="space-y-8">{children}</div>
          {aside && <div className="space-y-6">{aside}</div>}
        </div>
      </div>
      <Footer />
    </div>
  );
}
