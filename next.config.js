/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['cdn.sforum.vn'],
    },
    output: 'standalone'
    
};

module.exports = nextConfig;
