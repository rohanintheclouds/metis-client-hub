/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Client logos are fetched from Clearbit/logo.dev as a graceful enhancement.
    remotePatterns: [
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "img.logo.dev" },
    ],
  },
};

export default nextConfig;
