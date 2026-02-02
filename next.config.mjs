/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'standalone', // Optional: simpler for Vercel to handle if standard build fails
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com', 'flagcdn.com'], // Added flagcdn just in case
    },
};

export default nextConfig;
