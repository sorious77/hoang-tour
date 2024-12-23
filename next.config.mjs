/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        apiBaseUrl: process.env.API_BASE_URL
    }
};

export default nextConfig;
