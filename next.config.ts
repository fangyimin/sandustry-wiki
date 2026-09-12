import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === "true";

// Custom domain (playsandustry.online) on Vercel — no GitHub Pages basePath.
const nextConfig: NextConfig = {
  ...(isGhPages ? { output: "export" as const } : {}),
  images: { unoptimized: true },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.playsandustry.online" }],
        destination: "https://playsandustry.online/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
