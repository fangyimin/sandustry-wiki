"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/context";
import { getUi } from "@/lib/i18n/ui";

export function Footer() {
  const { locale } = useLanguage();
  const t = getUi(locale);

  return (
    <footer className="mt-20 border-t border-white/10 bg-black/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-lg text-[hsl(36_78%_62%)]">Sandustry Wiki</h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-400">{t.footer.about}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-300">{t.footer.official}</h3>
          <ul className="mt-3 space-y-2 text-sm text-stone-400">
            <li>
              <a className="hover:text-[hsl(36_78%_70%)]" href={site.links.website} target="_blank" rel="noreferrer">
                {t.footer.officialWiki}
              </a>
            </li>
            <li>
              <a className="hover:text-[hsl(36_78%_70%)]" href={site.links.discord} target="_blank" rel="noreferrer">
                {t.footer.discord}
              </a>
            </li>
            <li>
              <a className="hover:text-[hsl(36_78%_70%)]" href={site.links.youtube} target="_blank" rel="noreferrer">
                {t.footer.youtube}
              </a>
            </li>
            <li>
              <a className="hover:text-[hsl(36_78%_70%)]" href={site.links.demo} target="_blank" rel="noreferrer">
                {t.footer.steamDemo}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-300">{t.footer.guides}</h3>
          <ul className="mt-3 space-y-2 text-sm text-stone-400">
            <li>
              <Link className="hover:text-[hsl(36_78%_70%)]" href="/guide">
                {t.footer.beginnerGuide}
              </Link>
            </li>
            <li>
              <Link className="hover:text-[hsl(36_78%_70%)]" href="/modules">
                {t.footer.buildings}
              </Link>
            </li>
            <li>
              <Link className="hover:text-[hsl(36_78%_70%)]" href="/automation">
                {t.footer.automation}
              </Link>
            </li>
            <li>
              <Link className="hover:text-[hsl(36_78%_70%)]" href="/demo">
                {t.footer.demoGuide}
              </Link>
            </li>
            <li>
              <Link className="hover:text-[hsl(36_78%_70%)]" href="/tips">
                {t.footer.tips}
              </Link>
            </li>
            <li>
              <Link className="hover:text-[hsl(36_78%_70%)]" href="/water">
                {t.footer.water}
              </Link>
            </li>
            <li>
              <Link className="hover:text-[hsl(36_78%_70%)]" href="/slag">
                {t.footer.slag}
              </Link>
            </li>
            <li>
              <Link className="hover:text-[hsl(36_78%_70%)]" href="/gameplay">
                {t.footer.gameplay}
              </Link>
            </li>
            <li>
              <Link className="hover:text-[hsl(36_78%_70%)]" href="/release-date">
                {t.footer.releaseDate}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-stone-600">
        {t.footer.legal}
        <span className="mx-2">·</span>
        <Link className="hover:text-stone-400" href="/about">
          {t.footer.aboutLink}
        </Link>
        <span className="mx-2">·</span>
        <Link className="hover:text-stone-400" href="/contact">
          {t.footer.contactLink}
        </Link>
        <span className="mx-2">·</span>
        <Link className="hover:text-stone-400" href="/privacy">
          {t.footer.privacyLink}
        </Link>
      </div>
    </footer>
  );
}
