/** @type {import('next').NextConfig} */

const path = require('path');

// Set BASE_PATH (e.g. '/~user') to serve the export from a subpath.
const basePath = process.env.BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
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
