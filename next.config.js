/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['media.hcmtax.gov.vn', 'media.npr.org','127.0.0.1:8080'],
        remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8080',
        pathname: '/uploads/**',
      },
    ],
    },
    output: 'standalone'
};

module.exports = nextConfig;
