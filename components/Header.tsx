"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/context";
import { getUi } from "@/lib/i18n/ui";

export function Header() {
  const { locale, setLocale } = useLanguage();
  const t = getUi(locale);
  const nextLocale = locale === "zh" ? "en" : "zh";

  const nav = [
    { href: "/", label: t.nav.home },
    { href: "/guide", label: t.nav.guide },
    { href: "/modules", label: t.nav.buildings },
    { href: "/automation", label: t.nav.automation },
    { href: "/demo", label: t.nav.demo },
    { href: "/release-date", label: t.nav.eaDate },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(12,10,8,0.86)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-[family-name:var(--font-display)] text-lg tracking-wide text-[hsl(36_78%_62%)]">
          {site.name}
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 text-sm text-stone-300 sm:gap-x-4">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[hsl(36_78%_70%)]">
              {item.label}
            </Link>
          ))}
          <a
            href={site.links.steam}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[hsl(28_72%_48%)] px-3 py-1.5 font-medium text-stone-950 hover:bg-[hsl(36_78%_55%)]"
          >
            {t.nav.steam}
          </a>
          <button
            type="button"
            aria-label={t.langAria}
            onClick={() => setLocale(nextLocale)}
            className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 font-semibold text-stone-100 hover:border-[hsl(36_78%_45%)] hover:bg-white/10"
          >
            {locale === "zh" ? t.langSwitchToEn : t.langSwitchToZh}
          </button>
        </nav>
      </div>
    </header>
  );
}
