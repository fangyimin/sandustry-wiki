"use client";

import type { GuidePage } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { getUi } from "@/lib/i18n/ui";
import { site } from "@/lib/site";

type RelatedPage = { slug: string; title: string; description: string };

const inlineLinkPatterns: { pattern: RegExp; slug: string }[] = [
  { pattern: /Automation Tips/g, slug: "automation" },
  { pattern: /Water Basics/g, slug: "water" },
  { pattern: /Demo Guide/g, slug: "demo" },
  { pattern: /Quick Tips/g, slug: "tips" },
  { pattern: /Beginner Guide/g, slug: "guide" },
  { pattern: /Buildings hub \(\/modules\)/g, slug: "modules" },
  { pattern: /Release Date page/g, slug: "release-date" },
  { pattern: /Gameplay overview/g, slug: "gameplay" },
];

function renderParagraph(text: string) {
  const parts: (string | { slug: string; label: string })[] = [text];
  for (const { pattern, slug } of inlineLinkPatterns) {
    const next: (string | { slug: string; label: string })[] = [];
    for (const part of parts) {
      if (typeof part !== "string") {
        next.push(part);
        continue;
      }
      let lastIndex = 0;
      const copy = new RegExp(pattern.source, pattern.flags);
      for (const match of part.matchAll(copy)) {
        const index = match.index ?? 0;
        if (index > lastIndex) next.push(part.slice(lastIndex, index));
        next.push({ slug, label: match[0] });
        lastIndex = index + match[0].length;
      }
      if (lastIndex < part.length) next.push(part.slice(lastIndex));
    }
    parts.splice(0, parts.length, ...next);
  }

  return (
    <p>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <span key={`${part.slice(0, 12)}-${i}`}>{part}</span>
        ) : (
          <Link key={`${part.slug}-${i}`} href={`/${part.slug}`} className="font-medium text-[hsl(36_78%_62%)] hover:underline">
            {part.label}
          </Link>
        ),
      )}
    </p>
  );
}

export function GuideArticle({
  en,
  zh,
  slug,
  relatedPages = [],
}: {
  en: GuidePage;
  zh?: GuidePage;
  slug: string;
  relatedPages?: RelatedPage[];
}) {
  const { locale } = useLanguage();
  const t = getUi(locale);
  const page = locale === "zh" && zh ? zh : en;
  const nextPage = relatedPages[0];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-[hsl(36_78%_55%)]">
          <Link href="/" className="hover:underline">
            {t.common.homeCrumb}
          </Link>
          <span className="mx-2 text-stone-600">/</span>
          <span className="text-stone-400">{page.keyword}</span>
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-stone-100 md:text-5xl">
          {page.h1}
        </h1>
        <p className="mt-4 text-lg text-stone-300">{page.description}</p>
        {page.note ? (
          <p className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100/90">
            {page.note}
          </p>
        ) : null}
        <div className="prose-custom mt-10 space-y-10">
          {page.sections.map((section) => (
            <section key={section.h2}>
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-[hsl(36_78%_62%)]">{section.h2}</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-stone-300">
                {section.paragraphs.map((p) =>
                  locale === "en" ? (
                    <span key={p.slice(0, 24)}>{renderParagraph(p)}</span>
                  ) : (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
        {page.faq && page.faq.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[hsl(36_78%_62%)]">{t.common.faq}</h2>
            <div className="mt-6 space-y-6">
              {page.faq.map((item) => (
                <div key={item.q}>
                  <h3 className="text-base font-semibold text-stone-100">{item.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-400">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
        {relatedPages.length > 0 ? (
          <aside className="mt-12">
            <h2 className="font-[family-name:var(--font-display)] text-xl text-stone-100">{t.guide.continueReading}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedPages.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[hsl(36_78%_45%)] hover:bg-white/[0.06]"
                >
                  <div className="text-base font-semibold text-[hsl(36_78%_62%)]">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-stone-400">{item.description}</p>
                </Link>
              ))}
            </div>
          </aside>
        ) : null}
        <section className="mt-12 rounded-2xl border border-[hsl(36_78%_40%)]/40 bg-gradient-to-br from-[hsl(28_72%_28%)]/30 to-transparent px-5 py-6">
          <h2 className="font-[family-name:var(--font-display)] text-xl text-stone-50">
            {nextPage ? t.guide.nextTitle.replace("{title}", nextPage.title) : t.guide.keepExploring}
          </h2>
          <p className="mt-2 text-sm text-stone-400">{t.guide.nextDescription}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {nextPage ? (
              <Link
                href={`/${nextPage.slug}`}
                className="rounded-full bg-[hsl(28_72%_48%)] px-4 py-2 text-sm font-semibold text-stone-950 hover:bg-[hsl(36_78%_55%)]"
              >
                {t.guide.nextCta.replace("{title}", nextPage.title)} →
              </Link>
            ) : (
              <Link
                href="/guide"
                className="rounded-full bg-[hsl(28_72%_48%)] px-4 py-2 text-sm font-semibold text-stone-950 hover:bg-[hsl(36_78%_55%)]"
              >
                {t.footer.beginnerGuide} →
              </Link>
            )}
            {slug !== "demo" ? (
              <a
                href={site.links.demo}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-stone-200 hover:bg-white/5"
              >
                {t.guide.tryDemo}
              </a>
            ) : (
              <a
                href={site.links.steam}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-stone-200 hover:bg-white/5"
              >
                {t.nav.steam}
              </a>
            )}
          </div>
        </section>
        {page.sources && page.sources.length > 0 ? (
          <aside className="mt-12 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-400">{t.common.sources}</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-500">
              {page.sources.map((s) => (
                <li key={s}>
                  <a href={s} className="hover:text-stone-300" target="_blank" rel="noreferrer">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
