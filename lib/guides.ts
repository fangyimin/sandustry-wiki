import fs from "fs";
import path from "path";
import moduleNavData from "@/content/module-nav.json";
import type { ContentLocale, GuidePage } from "@/lib/site";

function contentDir(locale: ContentLocale = "en") {
  return path.join(process.cwd(), "content", locale);
}

export function getAllGuides(locale: ContentLocale = "en"): GuidePage[] {
  const dir = contentDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as GuidePage)
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getGuide(slug: string, locale: ContentLocale = "en"): GuidePage | undefined {
  const primary = path.join(contentDir(locale), `${slug}.json`);
  const fallback = path.join(contentDir("en"), `${slug}.json`);
  const file = fs.existsSync(primary) ? primary : fallback;
  if (!fs.existsSync(file)) return undefined;
  return JSON.parse(fs.readFileSync(file, "utf8")) as GuidePage;
}

export function getGuideSlugs(): string[] {
  return getAllGuides("en").map((g) => g.slug);
}

export const guides = getAllGuides();
export const moduleNav = moduleNavData;
