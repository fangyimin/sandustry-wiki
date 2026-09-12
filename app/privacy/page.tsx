import { SiteInfoPage } from "@/components/SiteInfoPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy — Sandustry Wiki",
  description:
    "Privacy policy for playsandustry.online: analytics, cookies, and how visitor data is handled on this fan wiki.",
  path: "/privacy/",
});

const en = {
  h1: "Privacy Policy",
  description: "How playsandustry.online handles basic visitor data. Last updated: 2026-09-07.",
  sections: [
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
      paragraphs: ["Privacy questions: use the Contact page or the GitHub repository linked there."],
    },
  ],
};

const zh = {
  h1: "隐私政策",
  description: "playsandustry.online 如何处理基础访问数据。最近更新：2026-09-07。",
  sections: [
    {
      h2: "分析统计",
      paragraphs: [
        "我们可能使用 Google Analytics 4（测量 ID 通过环境变量配置）了解汇总流量，例如浏览量与大致地理位置。",
        "Google 可能按其政策设置 Cookie 或类似标识。你可通过 Google 账号设置与浏览器控件限制广告个性化。",
      ],
    },
    {
      h2: "托管与日志",
      paragraphs: [
        "站点托管于 Vercel（启用时 DNS 可能经 Cloudflare 或注册商）。这些服务商可能处理标准请求日志（IP、UA、时间戳）用于安全与交付。",
        "本站无账号系统，也不会故意收集姓名、邮箱或支付信息。",
      ],
    },
    {
      h2: "联系",
      paragraphs: ["隐私相关问题：请使用「联系」页或其中链接的 GitHub 仓库。"],
    },
  ],
};

export default function Page() {
  return <SiteInfoPage en={en} zh={zh} />;
}
