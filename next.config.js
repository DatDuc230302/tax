/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['media.hcmtax.gov.vn', 'media.npr.org','0.tcp.ap.ngrok.io'],
    },
};

module.exports = nextConfig;
