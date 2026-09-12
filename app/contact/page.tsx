import { SiteInfoPage } from "@/components/SiteInfoPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Sandustry Wiki",
  description: "Contact the Sandustry Wiki maintainer for corrections, source questions, or content issues.",
  path: "/contact/",
});

const en = {
  h1: "Contact",
  description: "Reach out if a guide is outdated, a source link is broken, or you spot a factual error.",
  sections: [
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
  ],
};

const zh = {
  h1: "联系我们",
  description: "若攻略过时、来源链接失效，或发现事实错误，欢迎联系。",
  sections: [
    {
      h2: "如何反馈问题",
      paragraphs: [
        "请在公开 GitHub 仓库提交 issue 或 discussion：https://github.com/fangyimin/sandustry-wiki",
        "游戏 Bug、平衡或官方支持，请走 Steam 讨论区、官方 Discord 或 Hooded Horse Wiki — 我们不能代表开发组发言。",
      ],
    },
    {
      h2: "回复预期",
      paragraphs: [
        "这是小型粉丝站。引用 Steam 或官方页面的勘误会优先处理。",
        "我们不出售兑换码、账号或游戏内物品。",
      ],
    },
  ],
};

export default function Page() {
  return <SiteInfoPage en={en} zh={zh} />;
}
