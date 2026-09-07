import type { Metadata } from "next";
import { SiteInfoPage } from "@/components/SiteInfoPage";

export const metadata: Metadata = {
  title: "About Sandustry Wiki",
  description:
    "About this fan-made Sandustry wiki: sources, independence from the developer, and how we publish guide content.",
};

const en = {
  h1: "About Sandustry Wiki",
  description: "Independent fan documentation for Sandustry — not an official Lantto Games or Hooded Horse site.",
  sections: [
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
  ],
};

const zh = {
  h1: "关于 Sandustry Wiki",
  description: "独立的 Sandustry 粉丝文档站 — 并非 Lantto Games 或 Hooded Horse 官方站点。",
  sections: [
    {
      h2: "本站是什么",
      paragraphs: [
        "Sandustry Wiki 整理新手指南、Demo 说明、自动化技巧与 FAQ，方便玩家比翻 Steam 讨论区更快找到答案。",
        "我们优先采用 Steam、Hooded Horse 官方 Sandustry Wiki、Discord、Reddit 与 YouTube 中的事实。信息不足或随补丁变化处（精确配比、解锁表）会标明，而不是编造细节。",
        "说明：官方 Wiki 与其他粉丝站已存在。本项目侧重清晰的落地页与第一小时实用指引。",
      ],
    },
    {
      h2: "从属关系",
      paragraphs: [
        "本项目为粉丝制作，与 Lantto Games / Hooded Horse 无关。权威建筑数值与配方请以官方 Wiki 与游戏内提示为准。",
      ],
    },
  ],
};

export default function Page() {
  return <SiteInfoPage en={en} zh={zh} />;
}
