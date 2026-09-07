import siteConfig from "@/config/site.json";

export type GuidePage = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  h1: string;
  sections: { h2: string; paragraphs: string[] }[];
  note?: string;
  sources?: string[];
  faq?: { q: string; a: string }[];
  related?: string[];
};

export type ContentLocale = "en" | "zh";

/** Framework-facing site object (reads config layer). Safe for client components. */
export const site = {
  name: siteConfig.siteName,
  url: siteConfig.siteUrl,
  links: siteConfig.links,
  nav: siteConfig.nav,
};
