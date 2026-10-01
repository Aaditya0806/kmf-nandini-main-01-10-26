import './globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './page.module.css';
import logo from '@/images/logo/logo.png';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'rodal/lib/rodal.css';
import 'react-photo-view/dist/react-photo-view.css';

import Script from 'next/script';
import Providers from '@/components/Providers';
import { GA_ID, GTM_ID } from '@/lib/analytics';
import { SITE_URL } from '@/lib/site';
import { buildMetadata, PAGES } from '@/lib/seo';
import { jsonLdString, organizationJsonLd } from '@/lib/jsonld';

// Metadata for "/" (the English home page at the root URL). Pages under
// /[locale] override all of it in their own layouts.
const home = buildMetadata({ locale: 'en', route: '', ...PAGES[''].en });
export const metadata = {
  ...home,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/', languages: { en: '/en', kn: '/kn', 'x-default': '/' } },
  openGraph: { ...home.openGraph, url: '/' },
};

// Server component. All client-side providers and hooks live in Providers.
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href={logo.src} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(organizationJsonLd()) }}
        />
      </head>

      <body className="relative">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Providers>{children}</Providers>

        {GTM_ID ? (
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
`
            }}
          />
        ) : (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}');
`
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
