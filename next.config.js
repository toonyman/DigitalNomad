/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com', 'flagcdn.com'],
    },
    // Ensure the output directory is standard
    distDir: '.next',
};

module.exports = nextConfig;
