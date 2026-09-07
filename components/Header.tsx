import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(12,10,8,0.86)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-[family-name:var(--font-display)] text-lg tracking-wide text-[hsl(36_78%_62%)]">
          {site.name}
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm text-stone-300">
          {site.nav.map((item) => (
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
            Steam
          </a>
        </nav>
      </div>
    </header>
  );
}
