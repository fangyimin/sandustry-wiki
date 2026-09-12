import type { MetadataRoute } from "next";
import siteConfig from "@/config/site.json";
import { getGuideSlugs } from "@/lib/guides";

const base = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl;
const staticRoutes = ["", "modules", "about", "contact", "privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const guides = getGuideSlugs()
    .filter((slug) => !siteConfig.reservedRoutes.includes(slug))
    .map((slug) => ({
      url: `${base}/${slug}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: slug === "guide" ? 0.95 : 0.85,
    }));

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...staticRoutes.slice(1).map((route) => ({
      url: `${base}/${route}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...guides,
  ];
}
