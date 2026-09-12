"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { getUi } from "@/lib/i18n/ui";

export function GuideStickyNext({
  nextSlug,
  nextTitle,
}: {
  nextSlug?: string;
  nextTitle?: string;
}) {
  const { locale } = useLanguage();
  const t = getUi(locale);
  if (!nextSlug || !nextTitle) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0b0f12]/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
        <p className="min-w-0 truncate text-sm text-stone-400">{t.guide.nextTitle.replace("{title}", nextTitle)}</p>
        <Link
          href={`/${nextSlug}`}
          className="shrink-0 rounded-full bg-[hsl(28_72%_48%)] px-4 py-2 text-sm font-semibold text-stone-950"
        >
          →
        </Link>
      </div>
    </div>
  );
}
