import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/GuideArticle";
import { getGuide, getGuideSlugs } from "@/lib/site";
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
  const page = getGuide(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
  };
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  if (siteConfig.reservedRoutes.includes(slug)) notFound();
  const page = getGuide(slug);
  if (!page) notFound();
  return <GuideArticle page={page} />;
}
