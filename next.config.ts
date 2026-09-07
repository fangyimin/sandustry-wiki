import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === "true";

// Custom domain (playsandustry.online) on Vercel — no GitHub Pages basePath.
const nextConfig: NextConfig = {
  ...(isGhPages ? { output: "export" as const } : {}),
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
