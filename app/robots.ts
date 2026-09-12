import type { MetadataRoute } from "next";
import siteConfig from "@/config/site.json";

const base = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
