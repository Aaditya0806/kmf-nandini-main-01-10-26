import { NextResponse } from 'next/server';

// Only /en/... and /kn/... are real pages (plus the password-protected /admin). A path whose first segment is
// anything else (e.g. /xyz, /xyz/contact) used to render the home page with a
// bogus locale and a 200. Rewrite it to a path that matches no route, so Next
// serves the normal not-found page with a 404 status, fully server-rendered.
// Redirects in next.config.js (e.g. /careers) run before this.
export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return adminAuth(request);
  return NextResponse.rewrite(new URL('/en/__not-found__', request.url));
}

// /admin/* (Ask Nandini admin page): HTTP Basic auth from server env vars.
// Without ASK_NANDINI_ADMIN_USER / ASK_NANDINI_ADMIN_PASSWORD it stays a 404.
function adminAuth(request) {
  const user = process.env.ASK_NANDINI_ADMIN_USER;
  const pass = process.env.ASK_NANDINI_ADMIN_PASSWORD;
  if (!user || !pass) return NextResponse.rewrite(new URL('/en/__not-found__', request.url));

  const [scheme, encoded] = (request.headers.get('authorization') || '').split(' ');
  if (scheme === 'Basic' && encoded) {
    try {
      const decoded = atob(encoded);
      const i = decoded.indexOf(':');
      if (i > 0 && safeEqual(decoded.slice(0, i), user) & safeEqual(decoded.slice(i + 1), pass)) {
        const res = NextResponse.next();
        res.headers.set('X-Robots-Tag', 'noindex, nofollow');
        res.headers.set('Cache-Control', 'no-store');
        return res;
      }
    } catch (e) {
      // malformed header: fall through to 401
    }
  }
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Ask Nandini admin", charset="UTF-8"' },
  });
}

// Constant-time comparison (no early exit on the first differing character).
function safeEqual(a, b) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

export const config = {
  // Runs only for: non-empty paths, first segment not en/kn/_next/api, no file
  // extension (so /robots.txt, /sitemap.xml and /public files are untouched).
  matcher: ['/((?!en(?:/|$)|kn(?:/|$)|_next/|api/|[^?]*\\.).+)'],
};
