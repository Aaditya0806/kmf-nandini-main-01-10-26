'use client';

import { useEffect } from 'react';
import {
  contactEventFor,
  isFileUrl,
  sectionFromPath,
  trackEvent,
  trackFileDownload,
} from '@/lib/analytics';

// Where on the page a link sits. A data-track-location attribute on the link
// or any ancestor wins; otherwise header / footer / content.
function locationOf(el) {
  const tagged = el.closest('[data-track-location]');
  if (tagged) return tagged.getAttribute('data-track-location');
  if (el.closest('header, nav')) return 'header';
  if (el.closest('footer')) return 'footer';
  return 'content';
}

// One delegated listener for every <a> on the site: file downloads and
// tel: / WhatsApp / mailto: clicks. Renders nothing.
export default function AnalyticsListener() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target instanceof Element ? e.target.closest('a[href]') : null;
      if (!a) return;
      const href = a.getAttribute('href') || '';

      const contactEvent = contactEventFor(href);
      if (contactEvent) {
        trackEvent(contactEvent, {
          location: locationOf(a),
          section: sectionFromPath(window.location.pathname),
        });
        return;
      }

      if (a.hasAttribute('download') || isFileUrl(href)) {
        trackFileDownload(href);
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
