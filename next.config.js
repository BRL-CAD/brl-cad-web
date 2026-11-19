/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'bestpractices.coreinfrastructure.org' },
      { protocol: 'https', hostname: 'github.com' },
    ],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
