"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/context";
import { getUi } from "@/lib/i18n/ui";

type HomeData = typeof import("@/lib/home.json");

const startHrefs = ["/guide", "/automation", "/modules", "/demo"] as const;

const guideGridEn = [
  { href: "/guide", title: "Beginner Guide", desc: "Dig, refine, early logistics." },
  { href: "/tips", title: "Quick Tips", desc: "Habits that save rebuild time." },
  { href: "/automation", title: "Automation", desc: "Belts, filters, factory flow." },
  { href: "/modules", title: "Buildings", desc: "High-level building roles." },
  { href: "/water", title: "Water Basics", desc: "Wet sand, floods, pipes." },
  { href: "/slag", title: "Slag & Processing", desc: "Byproduct bottlenecks." },
  { href: "/demo", title: "Demo", desc: "Free Steam demo checklist." },
  { href: "/release-date", title: "EA Date", desc: "August 13, 2026 and roadmap." },
  { href: "/gameplay", title: "Gameplay", desc: "Loop, genre, who it is for." },
];

const guideGridZh = [
  { href: "/guide", title: "新手指南", desc: "挖掘、精炼、早期物流。" },
  { href: "/tips", title: "快速技巧", desc: "减少推倒重来的习惯。" },
  { href: "/automation", title: "自动化", desc: "传送带、过滤器与工厂流。" },
  { href: "/modules", title: "建筑", desc: "高层建筑角色说明。" },
  { href: "/water", title: "水与流体", desc: "湿沙、淹水与管道。" },
  { href: "/slag", title: "炉渣与加工", desc: "副产物堵塞处理。" },
  { href: "/demo", title: "Demo", desc: "免费 Steam Demo 清单。" },
  { href: "/release-date", title: "EA 日期", desc: "2026-08-13 与路线图。" },
  { href: "/gameplay", title: "玩法", desc: "循环、类型与适合谁。" },
];

export function HomePageClient({ en, zh }: { en: HomeData; zh: HomeData }) {
  const { locale } = useLanguage();
  const t = getUi(locale);
  const data = locale === "zh" ? zh : en;
  const h = data.home;
  const guideGrid = locale === "zh" ? guideGridZh : guideGridEn;
  const startLinks = startHrefs.map((href, i) => ({ href, ...h.start.cards[i] }));

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-14">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[hsl(36_78%_55%)]">{h.hero.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[1.05] text-stone-50 md:text-7xl">
            {h.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">{h.hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/guide"
              className="rounded-full bg-[hsl(28_72%_48%)] px-5 py-2.5 text-sm font-semibold text-stone-950 hover:bg-[hsl(36_78%_55%)]"
            >
              {h.hero.primaryCta}
            </Link>
            <Link
              href="/automation"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-stone-100 hover:bg-white/10"
            >
              {h.hero.secondaryCta}
            </Link>
            <a
              href={site.links.demo}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-stone-200 hover:bg-white/5"
            >
              {h.hero.tertiaryCta}
            </a>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {h.hero.stats.map((stat) => (
              <div
                key={stat}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-stone-200"
              >
                {stat}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-stone-500">
            {h.hero.videoLabel}:{" "}
            <a className="text-[hsl(36_78%_62%)] hover:underline" href={site.links.trailer} target="_blank" rel="noreferrer">
              {t.home.watchYoutube}
            </a>
          </p>
        </section>

        <section className="border-y border-white/10 bg-black/20">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <p className="text-sm uppercase tracking-[0.18em] text-[hsl(36_78%_55%)]">{h.start.eyebrow}</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-stone-50 md:text-4xl">
              {h.start.title}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {startLinks.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[hsl(36_78%_45%)] hover:bg-white/[0.06]"
                >
                  <div className="text-xs font-semibold text-[hsl(36_78%_55%)]">0{card.number}</div>
                  <div className="mt-3 text-lg font-semibold text-stone-100">{card.title}</div>
                  <p className="mt-2 text-sm leading-6 text-stone-400">{card.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-stone-50 md:text-4xl">{h.aboutGame.title}</h2>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-7 text-stone-300">
            {h.aboutGame.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {h.aboutGame.stats.map((row) => (
              <div key={row.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                <div className="text-xs uppercase tracking-wide text-stone-500">{row.label}</div>
                <div className="mt-2 text-sm font-medium text-stone-100">{row.value}</div>
              </div>
            ))}
          </div>
          <Link href="/#guides" className="mt-8 inline-flex text-sm font-semibold text-[hsl(36_78%_62%)] hover:underline">
            {h.aboutGame.cta} →
          </Link>
        </section>

        <section id="guides" className="border-y border-white/10 bg-black/25 scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-stone-50">{t.home.guidesHeading}</h2>
            <p className="mt-3 max-w-2xl text-stone-400">{t.home.guidesIntro}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guideGrid.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-[hsl(36_78%_45%)]"
                >
                  <div className="text-lg font-semibold text-stone-100">{item.title}</div>
                  <p className="mt-2 text-sm text-stone-400">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-3xl border border-[hsl(36_78%_40%)]/40 bg-gradient-to-br from-[hsl(28_72%_28%)]/40 to-transparent px-6 py-10 md:px-10">
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-stone-50">{h.finalCta.title}</h2>
            <p className="mt-4 max-w-2xl text-stone-300">{h.finalCta.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/guide"
                className="rounded-full bg-[hsl(28_72%_48%)] px-5 py-2.5 text-sm font-semibold text-stone-950"
              >
                {h.finalCta.primary}
              </Link>
              <a
                href={site.links.steam}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-stone-100"
              >
                {h.finalCta.secondary}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
