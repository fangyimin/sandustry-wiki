import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/site";
import siteConfig from "@/config/site.json";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const contentRoutes = getAllGuides().map((g) => `/${g.slug}`);
  const staticRoutes = ["", "/modules", "/about", "/contact", "/privacy", ...contentRoutes];

  return staticRoutes.map((path) => ({
    url: path === "" ? `${siteUrl}/` : `${siteUrl}${path}/`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "/modules" ? 0.9 : 0.8,
  }));
}
