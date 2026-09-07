import type { Metadata } from "next";
import { SiteInfoPage } from "@/components/SiteInfoPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Sandustry Wiki",
  description:
    "Privacy policy for playsandustry.online: analytics, cookies, and how visitor data is handled on this fan wiki.",
};

export default function Page() {
  return (
    <SiteInfoPage
      h1="Privacy Policy"
      description="How playsandustry.online handles basic visitor data. Last updated: 2026-09-07."
      sections={[
        {
          h2: "Analytics",
          paragraphs: [
            "We may use Google Analytics 4 (measurement ID configured via environment variable) to understand aggregate traffic such as page views and approximate geography.",
            "Google may set cookies or use similar identifiers according to their policies. You can limit ad personalization through Google account settings and browser controls.",
          ],
        },
        {
          h2: "Hosting and logs",
          paragraphs: [
            "The site is hosted on Vercel (and DNS may use Cloudflare or the registrar when enabled). Those providers may process standard request logs (IP, user agent, timestamps) for security and delivery.",
            "We do not run an account system and do not intentionally collect names, emails, or payment data on this wiki.",
          ],
        },
        {
          h2: "Contact",
          paragraphs: [
            "Privacy questions: use the Contact page or the GitHub repository linked there.",
          ],
        },
      ]}
    />
  );
}
