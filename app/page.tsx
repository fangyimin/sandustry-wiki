import type { Metadata } from "next";
import { HomePageClient } from "@/components/HomePageClient";
import homeEn from "@/lib/home.json";
import homeZh from "@/lib/home-zh.json";

export const metadata: Metadata = {
  title: homeEn.home.meta.title,
  description: homeEn.home.meta.description,
};

export default function HomePage() {
  return <HomePageClient en={homeEn} zh={homeZh} />;
}
