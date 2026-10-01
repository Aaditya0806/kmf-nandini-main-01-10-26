/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Basic security headers. frame-ancestors only limits who may embed THIS site
  // in a frame; YouTube/Maps/PDF iframes inside our pages are unaffected.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },

  // 301s for dead or guessed URLs only. Every existing page URL is untouched.
  // Keep in sync with docs/REDIRECTS.md.
  async redirects() {
    const r = (source, destination) => ({ source, destination, statusCode: 301 });
    return [
      r('/careers', '/en/careers'),
      r('/recruitment', '/en/careers'),
      r('/about', '/en/about/company-profile'),
      r('/contact', '/en/contact'),
      r('/en/contact-us', '/en/contact'),
      r('/kn/contact-us', '/kn/contact'),
      r('/en-IN', '/en'),
      r('/en-IN/:path*', '/en/:path*'),
      r('/kn-IN', '/kn'),
      r('/kn-IN/:path*', '/kn/:path*'),
    ];
  },

  webpack: (config) => {
    config.resolve.alias.canvas = false;

    // NOTE: this rule previously sat in an object literal that also declared
    // `test: /\.(mp4|webm)$/` and a second `use` key. Duplicate keys mean the
    // later ones win, so only the PDF rule below was ever active. Videos are
    // referenced by path from /public and never imported, so no video rule is
    // needed. Kept as-is to preserve existing build output exactly.
    config.module.rules.push({
      test: /\.(pdf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'pdfs/',
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
