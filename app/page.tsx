import { HomePageClient } from "@/components/HomePageClient";
import { JsonLd } from "@/components/JsonLd";
import homeEn from "@/lib/home.json";
import homeZh from "@/lib/home-zh.json";
import { buildMetadata, siteUrl } from "@/lib/seo";
import siteConfig from "@/config/site.json";

export const metadata = buildMetadata({
  title: homeEn.home.meta.title,
  description: homeEn.home.meta.description,
  path: "/",
});

export default function HomePage() {
  const guideItems = homeEn.guides.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: g.title,
    url: `${siteUrl}/${g.slug}/`,
  }));

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.siteName,
            url: `${siteUrl}/`,
            description: siteConfig.seo.description,
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Sandustry Wiki Guides",
            itemListElement: guideItems,
          },
        ]}
      />
      <HomePageClient en={homeEn} zh={homeZh} />
    </>
  );
}
