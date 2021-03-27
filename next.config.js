/**
 * when next build command is run with ANALYZE=true env variable
 * this outputs 2 files - client.html and server.html to the <distDir>/analyze/ folder
 */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  pageExtensions: ['page.js', 'page.jsx', 'page.ts', 'page.tsx'],
  webpack: function webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });

    return config;
  },
});
