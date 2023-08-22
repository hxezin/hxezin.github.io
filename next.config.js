/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  basePath: '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
