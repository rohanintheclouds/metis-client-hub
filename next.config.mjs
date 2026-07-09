// When STATIC_EXPORT=1 (GitHub Pages CI) the app builds as a fully static site
// under /metis-client-hub. Normal `next build` (local / Vercel) keeps the
// dynamic API routes and server features.
const isExport = process.env.STATIC_EXPORT === "1";
const repo = "metis-client-hub";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "img.logo.dev" },
    ],
  },
  ...(isExport
    ? {
        output: "export",
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
