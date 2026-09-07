import type { Metadata } from "next";
import { SiteInfoPage } from "@/components/SiteInfoPage";

export const metadata: Metadata = {
  title: "About Sandustry Wiki",
  description:
    "About this fan-made Sandustry wiki: sources, independence from the developer, and how we publish guide content.",
};

export default function Page() {
  return (
    <SiteInfoPage
      h1="About Sandustry Wiki"
      description="Independent fan documentation for Sandustry — not an official Lantto Games or Hooded Horse site."
      sections={[
        {
          h2: "What this site is",
          paragraphs: [
            "Sandustry Wiki collects beginner guides, demo notes, automation tips, and FAQ-style pages so players can find answers faster than scrolling Steam discussions alone.",
            "We prioritize facts from Steam, the official Hooded Horse Sandustry wiki, Discord, Reddit, and YouTube. Where information is thin or patch-sensitive (exact ratios, unlock tables), pages say so instead of inventing details.",
            "Competition note: an official wiki and other fan sites already exist. This project focuses on clear English SEO landing pages and practical first-hour guidance.",
          ],
        },
        {
          h2: "Affiliation",
          paragraphs: [
            "This project is fan-made and unaffiliated with Lantto Games or Hooded Horse. For authoritative building stats and recipes, use the official wiki and in-game tooltips.",
          ],
        },
      ]}
    />
  );
}
