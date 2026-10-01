// Analytics IDs. Set NEXT_PUBLIC_GTM_ID to switch the site to Google Tag Manager
// (GA4 is then loaded from inside GTM). Without it, GA4 is loaded directly.
// Only one of the two is ever loaded, so visits are not counted twice.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-164VVDS7P1';

// All GA4 events go through this file. page_view is NOT sent from here: GA4
// enhanced measurement ("page changes based on browser history events") handles
// client-side navigation. Never pass personal data (name, phone, email, message).

// Events fired before gtag is ready (e.g. page_404 on a direct visit, where the
// page hydrates before the afterInteractive GA scripts run) wait here briefly.
const pending = [];
let flushTimer = null;

function flushPending(triesLeft) {
  if (typeof window.gtag === 'function') {
    while (pending.length) {
      const [name, params] = pending.shift();
      try {
        window.gtag('event', name, params);
      } catch (e) {
        // ignore
      }
    }
    flushTimer = null;
  } else if (triesLeft > 0) {
    flushTimer = window.setTimeout(() => flushPending(triesLeft - 1), 250);
  } else {
    pending.length = 0; // GA blocked or not loading: drop quietly
    flushTimer = null;
  }
}

// Send a named event (e.g. generate_lead) to GA4 through whichever install is active.
// With GTM, create a "Custom Event" trigger with the same event name.
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return;

  try {
    if (GTM_ID) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: name, ...params });
    } else if (typeof window.gtag === 'function' && !pending.length) {
      window.gtag('event', name, params);
    } else {
      pending.push([name, params]);
      if (!flushTimer) flushPending(40); // up to ~10s
    }
  } catch (e) {
    // Analytics must never break the page.
  }
}

const FILE_EXT = /\.(pdf|docx?|xlsx?|pptx?|zip|csv)$/i;

function safeUrl(href) {
  try {
    return new URL(href, window.location.href);
  } catch (e) {
    return null;
  }
}

// "https://…/uploads/Tender_123_ab12cd.pdf?x=1" -> "Tender_123_ab12cd.pdf"
export function fileNameFromUrl(href) {
  const url = safeUrl(href);
  if (!url) return '';
  const last = url.pathname.split('/').filter(Boolean).pop() || '';
  try {
    return decodeURIComponent(last);
  } catch (e) {
    return last;
  }
}

// "/kn/blog/notification" -> "blog/notification"; "/en" -> "home"
export function sectionFromPath(pathname = '') {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] === 'en' || parts[0] === 'kn') parts.shift();
  return parts.join('/') || 'home';
}

export function isFileUrl(href) {
  const url = safeUrl(href);
  return !!url && FILE_EXT.test(url.pathname);
}

export function trackFileDownload(href, section) {
  if (!href) return;
  trackEvent('file_download', {
    file_name: fileNameFromUrl(href),
    section: section || sectionFromPath(window.location.pathname),
  });
}

// Classify a clicked link. Only the kind of link is sent, never the number/address.
export function contactEventFor(href = '') {
  const h = href.trim().toLowerCase();
  if (h.startsWith('tel:')) return 'click_to_call';
  if (h.startsWith('mailto:')) return 'click_email';
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|(www\.)?whatsapp\.com)\//.test(h)) return 'click_whatsapp';
  return null;
}

export const trackLead = (formCategory) =>
  trackEvent('generate_lead', { form_category: formCategory || 'none' });

// Also counted on the admin page (/admin/ask-nandini) via our own endpoint;
// sendBeacon still delivers when the visitor is navigating away.
export function countClick(event, value = '') {
  if (typeof window === 'undefined') return;
  try {
    const body = JSON.stringify({ event, value });
    if (!(navigator.sendBeacon && navigator.sendBeacon('/api/site-event', new Blob([body], { type: 'application/json' }))))
      fetch('/api/site-event', { method: 'POST', body, keepalive: true, headers: { 'content-type': 'application/json' } }).catch(() => {});
  } catch (e) {
    // never affects the page
  }
}

export const trackIntentSelected = (intent) => {
  trackEvent('intent_selected', { intent });
  countClick('intent_selected', intent);
};
export const trackIntentDismissed = () => {
  trackEvent('intent_dismissed');
  countClick('intent_dismissed');
};

// Velozity credit link clicks. location: 'footer' | 'chat'
export const trackCreditClick = (location) => {
  trackEvent('credit_click', { location });
  countClick('credit_click', location);
};

export const trackCareerViewJob = (jobId, jobTitle) =>
  trackEvent('career_view_job', { job_id: jobId, job_title: jobTitle });
export const trackCareerApplyClick = (jobId, jobTitle) =>
  trackEvent('career_apply_click', { job_id: jobId, job_title: jobTitle });

export function trackPage404() {
  if (typeof window === 'undefined') return;
  // Only the referring host is sent; full referrer URLs can carry query-string data.
  const ref = document.referrer ? safeUrl(document.referrer) : null;
  trackEvent('page_404', {
    missing_path: window.location.pathname,
    referrer: ref ? ref.host : '(direct)',
  });
}

// Ask Nandini chat. Never sends message text.
// trigger: 'auto' (widget opened itself on page load) or 'user' (visitor opened it)
export const trackChatOpen = (trigger = 'user') =>
  trackEvent('chat_open', { section: sectionFromPath(window.location.pathname), trigger });
export const trackChatMessage = (lang, turn) => trackEvent('chat_message_sent', { lang: lang || 'unknown', turn });
export const trackChatTool = (tool) => trackEvent('chat_tool_used', { tool });
export const trackChatLink = (path) => trackEvent('chat_link_click', { path });
export const trackChatFeedback = (value) => trackEvent('chat_feedback', { value });
export const trackChatFallback = (reason) => trackEvent('chat_fallback', { reason });
