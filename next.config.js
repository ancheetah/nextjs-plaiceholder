const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.BUNDLE_ANALYZE,
})

module.exports = bundleAnalyzer({
  images: {
    domains: ['cdn.builder.io'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // this will allow site to be framed under builder.io for wysiwyg editing
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors https://*.builder.io https://builder.io',
          },
        ],
      },
    ]
  },
  env: {
    // expose env to the browser
    BUILDER_PUBLIC_KEY: '492b9fb8f843430fba67137f1f8ec68d',
  },
})
