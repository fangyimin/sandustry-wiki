"use client";

import type { GuidePage } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { getUi } from "@/lib/i18n/ui";

export function GuideArticle({ en, zh }: { en: GuidePage; zh?: GuidePage }) {
  const { locale } = useLanguage();
  const t = getUi(locale);
  const page = locale === "zh" && zh ? zh : en;

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
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
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
        {page.related && page.related.length > 0 ? (
          <aside className="mt-10 flex flex-wrap gap-3 text-sm">
            {page.related.map((slug) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="rounded-full border border-white/15 px-4 py-2 text-stone-200 hover:bg-white/5"
              >
                /{slug}
              </Link>
            ))}
          </aside>
        ) : null}
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
