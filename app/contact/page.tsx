import type { Metadata } from "next";
import { SiteInfoPage } from "@/components/SiteInfoPage";

export const metadata: Metadata = {
  title: "Contact Sandustry Wiki",
  description: "Contact the Sandustry Wiki maintainer for corrections, source questions, or content issues.",
};

export default function Page() {
  return (
    <SiteInfoPage
      h1="Contact"
      description="Reach out if a guide is outdated, a source link is broken, or you spot a factual error."
      sections={[
        {
          h2: "How to report an issue",
          paragraphs: [
            "Open an issue or discussion on the public GitHub repository: https://github.com/fangyimin/sandustry-wiki",
            "For game bugs, balance, or official support, use Steam discussions, the official Discord, or the Hooded Horse wiki — we cannot speak for the developer.",
          ],
        },
        {
          h2: "Response expectations",
          paragraphs: [
            "This is a small fan site. Corrections that cite Steam or official pages are prioritized.",
            "We do not sell codes, accounts, or in-game items.",
          ],
        },
      ]}
    />
  );
}
