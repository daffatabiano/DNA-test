/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'images.unsplash.com',
            'assets.aceternity.com',
            'https://www.svgrepo.com',
        ],
    },
};

export default nextConfig;
