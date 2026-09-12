"use client";

import type { GuidePage } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideStickyNext } from "@/components/GuideStickyNext";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { getUi } from "@/lib/i18n/ui";
import { site } from "@/lib/site";
import { estimateReadMinutes, learningPaths, midArticleCta, sectionId } from "@/lib/guide-utils";

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
  { pattern: /Slag & Processing/g, slug: "slag" },
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
  const readMin = estimateReadMinutes(page);
  const path = learningPaths[slug];
  const midCta = midArticleCta[slug];
  const midTarget = midCta ? relatedPages.find((p) => p.slug === midCta.slug) : undefined;
  const tocItems = [
    ...page.sections.map((s, i) => ({ id: sectionId(s.h2, i), label: s.h2 })),
    ...(page.faq?.length ? [{ id: "faq", label: t.common.faq }] : []),
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-10">
          <article className="min-w-0 max-w-3xl lg:max-w-none">
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
            <p className="mt-3 text-sm text-stone-500">
              {t.guide.readTime.replace("{min}", String(readMin))} · {page.sections.length} {t.guide.sections}
            </p>
            {path ? (
              <nav className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4" aria-label={t.guide.pathLabel}>
                <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(36_78%_55%)]">{t.guide.pathLabel}</p>
                <ol className="mt-3 flex flex-wrap gap-2">
                  {path.slugs.map((stepSlug, i) => {
                    const active = stepSlug === slug;
                    const label = locale === "zh" ? path.labels.zh[i] : path.labels.en[i];
                    return (
                      <li key={stepSlug} className="flex items-center gap-2 text-sm">
                        {i > 0 ? <span className="text-stone-600">→</span> : null}
                        {active ? (
                          <span className="rounded-full bg-[hsl(28_72%_48%)]/20 px-3 py-1 font-medium text-[hsl(36_78%_62%)]">
                            {label}
                          </span>
                        ) : (
                          <Link href={`/${stepSlug}`} className="rounded-full border border-white/10 px-3 py-1 text-stone-300 hover:bg-white/5">
                            {label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            ) : null}
            {page.note ? (
              <p className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100/90">
                {page.note}
              </p>
            ) : null}
            <nav className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 lg:hidden" aria-label={t.guide.onThisPage}>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">{t.guide.onThisPage}</p>
              <ul className="mt-2 space-y-1 text-sm">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-stone-300 hover:text-[hsl(36_78%_62%)]">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="prose-custom mt-10 space-y-10">
              {page.sections.map((section, index) => (
                <section key={section.h2} id={sectionId(section.h2, index)} className="scroll-mt-24">
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
                  {index === 2 && midCta && midTarget ? (
                    <aside className="mt-8 rounded-2xl border border-[hsl(36_78%_40%)]/50 bg-[hsl(28_72%_18%)]/40 px-5 py-5">
                      <h3 className="text-lg font-semibold text-stone-100">
                        {locale === "zh" ? midCta.zh.title : midCta.en.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-stone-300">
                        {locale === "zh" ? midCta.zh.body : midCta.en.body}
                      </p>
                      <Link
                        href={`/${midTarget.slug}`}
                        className="mt-4 inline-flex rounded-full bg-[hsl(28_72%_48%)] px-4 py-2 text-sm font-semibold text-stone-950 hover:bg-[hsl(36_78%_55%)]"
                      >
                        {midTarget.title} →
                      </Link>
                    </aside>
                  ) : null}
                </section>
              ))}
            </div>
            {page.faq && page.faq.length > 0 ? (
              <section id="faq" className="mt-12 scroll-mt-24">
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-[hsl(36_78%_62%)]">{t.common.faq}</h2>
                <div className="mt-6 space-y-6">
                  {page.faq.map((item) => (
                    <div key={item.q} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4">
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
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">{t.guide.onThisPage}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="leading-snug text-stone-400 hover:text-[hsl(36_78%_62%)]">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <GuideStickyNext nextSlug={nextPage?.slug} nextTitle={nextPage?.title} />
      <Footer />
    </div>
  );
}
