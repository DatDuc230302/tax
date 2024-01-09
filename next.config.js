/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['cdn.sforum.vn', 'http://128.199.226.117:9999', '128.199.226.117'],
    },
    output: 'standalone',
};

module.exports = nextConfig;
