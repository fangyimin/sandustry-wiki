import type { Metadata } from "next";
import siteConfig from "@/config/site.json";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl;

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).href;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  ogType = "website",
}: {
  title: string;
  description: string;
  path?: string;
  ogType?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.siteName,
      type: ogType,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export { siteUrl };
