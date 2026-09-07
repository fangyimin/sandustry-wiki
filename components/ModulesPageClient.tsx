"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useLanguage } from "@/lib/i18n/context";
import { getUi } from "@/lib/i18n/ui";

type NavItem = { title: string; blurb: string };

export function ModulesPageClient({ enNav, zhNav }: { enNav: NavItem[]; zhNav: NavItem[] }) {
  const { locale } = useLanguage();
  const t = getUi(locale);
  const moduleNav = locale === "zh" ? zhNav : enNav;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm text-[hsl(36_78%_55%)]">
          <Link href="/" className="hover:underline">
            {t.common.homeCrumb}
          </Link>
          <span className="mx-2 text-stone-600">/</span>
          <span className="text-stone-400">{t.modules.crumb}</span>
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-stone-50 md:text-5xl">
          {t.modules.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-stone-300">{t.modules.intro}</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {moduleNav.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-xl font-semibold text-[hsl(36_78%_62%)]">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-stone-400">{item.blurb}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <Link href="/automation" className="rounded-full bg-[hsl(28_72%_48%)] px-4 py-2 font-semibold text-stone-950">
            {t.modules.automationCta}
          </Link>
          <Link href="/water" className="rounded-full border border-white/15 px-4 py-2 text-stone-200">
            {t.modules.waterCta}
          </Link>
          <Link href="/guide" className="rounded-full border border-white/15 px-4 py-2 text-stone-200">
            {t.modules.guideCta}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
