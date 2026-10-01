'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackPage404 } from '@/lib/analytics';

const TEXT = {
  en: {
    heading: 'Page not found',
    body: "Sorry, we couldn't find that page. It may have moved or the link may be old. These might help:",
    title: 'Page not found | KMF Nandini',
    home: 'Go to home page',
    links: [
      { href: '/our-product', label: 'Nandini Products' },
      { href: '/careers', label: 'Careers & Recruitment' },
      { href: '/blog/notification', label: 'Notifications & Tenders' },
      { href: '/contact', label: 'Contact Us' },
    ],
  },
  kn: {
    heading: 'ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ',
    body: 'ಕ್ಷಮಿಸಿ, ನೀವು ಹುಡುಕುತ್ತಿರುವ ಪುಟ ಲಭ್ಯವಿಲ್ಲ. ಅದು ಸ್ಥಳಾಂತರಗೊಂಡಿರಬಹುದು ಅಥವಾ ಲಿಂಕ್ ಹಳೆಯದಾಗಿರಬಹುದು. ಇವು ಸಹಾಯ ಮಾಡಬಹುದು:',
    title: 'ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ | ಕಹಾಮ ನಂದಿನಿ',
    home: 'ಮುಖಪುಟಕ್ಕೆ ಹೋಗಿ',
    links: [
      { href: '/our-product', label: 'ನಂದಿನಿ ಉತ್ಪನ್ನಗಳು' },
      { href: '/careers', label: 'ಉದ್ಯೋಗಾವಕಾಶಗಳು / ನೇಮಕಾತಿ' },
      { href: '/blog/notification', label: 'ಅಧಿಸೂಚನೆಗಳು ಮತ್ತು ಟೆಂಡರ್‌ಗಳು' },
      { href: '/contact', label: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ' },
    ],
  },
};

export default function NotFoundContent() {
  const pathname = usePathname() || '';
  const lang = pathname === '/kn' || pathname.startsWith('/kn/') ? 'kn' : 'en';
  const t = TEXT[lang];

  useEffect(() => {
    document.title = t.title;
    trackPage404();
  }, [t.title]);

  return (
    <section lang={lang} className="w-full min-h-screen bg-[#F6F6F6] pt-44 pb-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-heading text-7xl md:text-8xl font-extrabold text-primary-main">404</p>
        <h1 className="mt-4 font-heading text-2xl md:text-3xl font-bold text-gray-900">{t.heading}</h1>
        <p className="mt-4 text-base md:text-lg text-gray-700">{t.body}</p>

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {t.links.map((l) => (
            <li key={l.href}>
              <Link
                href={`/${lang}${l.href}`}
                className="block w-full rounded-lg bg-white shadow-md border-b-2 border-primary-main px-4 py-4 font-semibold text-gray-900 hover:bg-primary-main hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main"
              >
                {l.label} →
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={`/${lang}`}
          className="inline-block mt-8 bg-primary-gradient text-white px-6 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main"
        >
          {t.home}
        </Link>
      </div>
    </section>
  );
}
