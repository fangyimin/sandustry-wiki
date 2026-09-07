import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/GuideArticle";
import { getGuide, getGuideSlugs } from "@/lib/guides";
import siteConfig from "@/config/site.json";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const reserved = new Set(siteConfig.reservedRoutes);
  return getGuideSlugs()
    .filter((slug) => !reserved.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getGuide(slug, "en");
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
  };
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  if (siteConfig.reservedRoutes.includes(slug)) notFound();
  const en = getGuide(slug, "en");
  if (!en) notFound();
  const zh = getGuide(slug, "zh");
  return <GuideArticle en={en} zh={zh} />;
}
