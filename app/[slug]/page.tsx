import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/GuideArticle";
import { JsonLd } from "@/components/JsonLd";
import { getGuide, getGuideSlugs } from "@/lib/guides";
import { buildMetadata, siteUrl } from "@/lib/seo";
import siteConfig from "@/config/site.json";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const reserved = new Set(siteConfig.reservedRoutes);
  return getGuideSlugs()
    .filter((slug) => !reserved.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = getGuide(slug, "en");
  if (!page) return {};
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/${slug}/`,
    ogType: "article",
  });
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  if (siteConfig.reservedRoutes.includes(slug)) notFound();
  const en = getGuide(slug, "en");
  if (!en) notFound();
  const zh = getGuide(slug, "zh");

  const relatedPages = (en.related ?? [])
    .map((relatedSlug) => {
      const page = getGuide(relatedSlug, "en");
      if (!page) return null;
      return { slug: relatedSlug, title: page.h1, description: page.description };
    })
    .filter((item): item is { slug: string; title: string; description: string } => item !== null);

  const pageUrl = `${siteUrl}/${slug}/`;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: en.h1, item: pageUrl },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: en.h1,
    description: en.description,
    url: pageUrl,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: siteConfig.siteName, url: `${siteUrl}/` },
  };

  const faqLd =
    en.faq && en.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: en.faq.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={articleLd} />
      {faqLd ? <JsonLd data={faqLd} /> : null}
      <GuideArticle en={en} zh={zh} slug={slug} relatedPages={relatedPages} />
    </>
  );
}
