import type { Locale } from "@/lib/i18n/context";

export const ui = {
  en: {
    nav: {
      home: "Home",
      guide: "Guide",
      buildings: "Buildings",
      automation: "Automation",
      demo: "Demo",
      eaDate: "EA Date",
      steam: "Steam",
    },
    langSwitchToZh: "中文",
    langSwitchToEn: "EN",
    langAria: "Switch language",
    footer: {
      about:
        "Independent fan guide for Sandustry. Facts from Steam, Hooded Horse wiki, and official community channels — no invented recipes.",
      official: "Official",
      guides: "Guides",
      officialWiki: "Official Wiki",
      discord: "Official Discord",
      youtube: "Sandustry YouTube",
      steamDemo: "Steam Demo",
      beginnerGuide: "Beginner Guide",
      buildings: "Buildings",
      automation: "Automation",
      demoGuide: "Demo Guide",
      legal: "Fan-made · Not affiliated with Lantto Games or Hooded Horse",
      aboutLink: "About",
      contactLink: "Contact",
      privacyLink: "Privacy",
    },
    home: {
      watchYoutube: "Watch on YouTube",
      guidesHeading: "Guides",
      guidesIntro:
        "First-batch pages for Sandustry EA. Cross-check the official Hooded Horse wiki for patch-sensitive numbers.",
    },
    modules: {
      crumb: "sandustry buildings",
      title: "Sandustry Buildings",
      intro:
        "High-level roles from Steam store copy and official channels — shakers/refining, conveyors and launchers, filters, fluids, and deeper tech. Exact unlock order and stats stay on the official wiki during Early Access.",
      automationCta: "Automation tips",
      waterCta: "Water basics",
      guideCta: "Beginner guide",
    },
    common: {
      homeCrumb: "Home",
      siteCrumb: "Site",
      sources: "Sources",
      faq: "FAQ",
    },
  },
  zh: {
    nav: {
      home: "首页",
      guide: "新手指南",
      buildings: "建筑",
      automation: "自动化",
      demo: "Demo",
      eaDate: "EA 日期",
      steam: "Steam",
    },
    langSwitchToZh: "中文",
    langSwitchToEn: "EN",
    langAria: "切换语言",
    footer: {
      about:
        "独立的 Sandustry 粉丝指南站。事实来自 Steam、Hooded Horse 官方 Wiki 与官方社区渠道 — 不编造配方。",
      official: "官方",
      guides: "攻略",
      officialWiki: "官方 Wiki",
      discord: "官方 Discord",
      youtube: "Sandustry YouTube",
      steamDemo: "Steam Demo",
      beginnerGuide: "新手指南",
      buildings: "建筑",
      automation: "自动化",
      demoGuide: "Demo 指南",
      legal: "粉丝站 · 与 Lantto Games / Hooded Horse 无关",
      aboutLink: "关于",
      contactLink: "联系",
      privacyLink: "隐私",
    },
    home: {
      watchYoutube: "在 YouTube 观看",
      guidesHeading: "攻略目录",
      guidesIntro: "面向 Sandustry 抢先体验的第一批页面。补丁敏感数值请对照 Hooded Horse 官方 Wiki。",
    },
    modules: {
      crumb: "sandustry 建筑",
      title: "Sandustry 建筑总览",
      intro:
        "来自 Steam 商店文案与官方渠道的高层角色说明：筛选/精炼、传送带与发射器、过滤器、流体，以及更深层科技。具体解锁顺序与数值在抢先体验期间以官方 Wiki 为准。",
      automationCta: "自动化技巧",
      waterCta: "水与流体",
      guideCta: "新手指南",
    },
    common: {
      homeCrumb: "首页",
      siteCrumb: "站点",
      sources: "来源",
      faq: "常见问题",
    },
  },
} as const;

export function getUi(locale: Locale) {
  return ui[locale];
}
