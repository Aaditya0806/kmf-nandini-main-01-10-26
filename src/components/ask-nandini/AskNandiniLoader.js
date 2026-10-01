'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  trackChatOpen,
  trackChatMessage,
  trackChatTool,
  trackChatLink,
  trackChatFeedback,
  trackChatFallback,
} from '@/lib/analytics';

// Kill switch: NEXT_PUBLIC_ASK_NANDINI=on to show the assistant (then redeploy).
// When off, this renders nothing and the chat code is never downloaded.
const ENABLED = process.env.NEXT_PUBLIC_ASK_NANDINI === 'on';

// The widget opens by itself, but only after the page has loaded and the
// browser is idle, so it never delays the page (LCP) or shifts its layout.
const Panel = dynamic(() => import('./AskNandiniPanel'), { ssr: false });
const DELAY_MS = 2000;

export default function AskNandiniLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ENABLED) return;
    let idle;
    const start = () => {
      idle = 'requestIdleCallback' in window ? window.requestIdleCallback(() => setReady(true), { timeout: 3000 }) : setTimeout(() => setReady(true), 0);
    };
    const t = setTimeout(() => (document.readyState === 'complete' ? start() : window.addEventListener('load', start, { once: true })), DELAY_MS);
    return () => {
      clearTimeout(t);
      window.removeEventListener('load', start);
      if (idle && 'cancelIdleCallback' in window) window.cancelIdleCallback(idle);
    };
  }, []);

  // Chat events -> GA4 (no message text, no personal data).
  const onEvent = useCallback((type, p = {}) => {
    if (type === 'open') trackChatOpen(p.trigger);
    else if (type === 'done') trackChatMessage(p.lang, p.turn);
    else if (type === 'tool') trackChatTool(p.tool);
    else if (type === 'link') trackChatLink(p.path);
    else if (type === 'feedback') trackChatFeedback(p.value);
    else if (type === 'fallback') trackChatFallback(p.reason);
  }, []);

  if (!ENABLED || !ready) return null;
  return <Panel onEvent={onEvent} />;
}
