/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['cdn.sforum.vn','localhost'],
    },
    output: 'standalone'
    
};

module.exports = nextConfig;
