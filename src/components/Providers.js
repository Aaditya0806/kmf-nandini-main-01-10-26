'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { register } from 'swiper/element/bundle';
import { ParallaxProvider } from 'react-scroll-parallax';
import { pdfjs } from 'react-pdf';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MyContextProvider } from '@/context/headerContext';
import AnalyticsListener from '@/components/AnalyticsListener';
import IntentPopupLoader from '@/components/IntentPopupLoader';
import FloatingContact from '@/components/FloatingContact';
import AskNandiniLoader from '@/components/ask-nandini/AskNandiniLoader';

// Everything that used to run in the (client) root layout, unchanged, so the
// root layout can be a server component and export metadata.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();
register();

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MyContextProvider>
        <Header />
        <ParallaxProvider>
          {children}
          <AnalyticsListener />
          <IntentPopupLoader />
          <FloatingContact />
          <AskNandiniLoader />
          <SpeedInsights />
          <Analytics />
        </ParallaxProvider>
      </MyContextProvider>
    </QueryClientProvider>
  );
}
