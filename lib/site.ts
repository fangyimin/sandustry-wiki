import fs from "fs";
import path from "path";
import siteConfig from "@/config/site.json";
import moduleNavData from "@/content/module-nav.json";

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

const contentDir = path.join(process.cwd(), "content", "en");

export function getAllGuides(): GuidePage[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(contentDir, f), "utf8")) as GuidePage)
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getGuide(slug: string): GuidePage | undefined {
  const file = path.join(contentDir, `${slug}.json`);
  if (!fs.existsSync(file)) return undefined;
  return JSON.parse(fs.readFileSync(file, "utf8")) as GuidePage;
}

export function getGuideSlugs(): string[] {
  return getAllGuides().map((g) => g.slug);
}

/** Framework-facing site object (reads config layer). */
export const site = {
  name: siteConfig.siteName,
  url: siteConfig.siteUrl,
  links: siteConfig.links,
  nav: siteConfig.nav,
};

export const guides = getAllGuides();
export const moduleNav = moduleNavData;
