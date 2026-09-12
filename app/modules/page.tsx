import { ModulesPageClient } from "@/components/ModulesPageClient";
import moduleNavEn from "@/content/module-nav.json";
import moduleNavZh from "@/content/module-nav-zh.json";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sandustry Buildings — Logistics & Production Overview",
  description:
    "Sandustry buildings hub: refining, conveyors, filters, fluids, and deeper tech roles from Steam Early Access marketing.",
  path: "/modules/",
});

export default function ModulesPage() {
  return <ModulesPageClient enNav={moduleNavEn} zhNav={moduleNavZh} />;
}
