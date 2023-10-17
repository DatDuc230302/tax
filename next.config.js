/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [''],
    },
    server: {
        http: {
            port: 80,
        },
    },
};

module.exports = nextConfig;
