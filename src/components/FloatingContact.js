'use client';

import { usePathname } from 'next/navigation';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { CONTACT } from '@/lib/site';

const LABELS = {
  en: { whatsapp: 'Chat with Nandini customer care on WhatsApp', call: 'Call toll-free 1800 425 8030' },
  kn: { whatsapp: 'ನಂದಿನಿ ಗ್ರಾಹಕ ಸೇವೆಯೊಂದಿಗೆ ವಾಟ್ಸ್ಆ್ಯಪ್‌ನಲ್ಲಿ ಚಾಟ್ ಮಾಡಿ', call: 'ಟೋಲ್ ಫ್ರೀ 1800 425 8030 ಗೆ ಕರೆ ಮಾಡಿ' },
};

// Floating WhatsApp + toll-free buttons (same numbers as the contact page).
// Clicks are tracked by AnalyticsListener as click_whatsapp / click_to_call
// with location "floating_button".
export default function FloatingContact() {
  const pathname = usePathname() || '';
  const t = pathname === '/kn' || pathname.startsWith('/kn/') ? LABELS.kn : LABELS.en;
  // The contact page already lists these numbers (and its confirmation sits bottom-right).
  if (/^\/(en|kn)\/contact\/?$/.test(pathname)) return null;

  return (
    <div data-track-location="floating_button" className="fixed bottom-4 left-4 z-[900] flex flex-col gap-3 print:hidden">
      <a
        href={`https://wa.me/${CONTACT.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsapp}
        title={t.whatsapp}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main"
      >
        <FaWhatsapp size={26} aria-hidden="true" />
      </a>
      <a
        href={`tel:${CONTACT.tollFreeDial}`}
        aria-label={t.call}
        title={t.call}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-main text-white shadow-lg transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main"
      >
        <FaPhoneAlt size={20} aria-hidden="true" />
      </a>
    </div>
  );
}
