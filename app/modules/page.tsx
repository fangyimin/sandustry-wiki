import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { moduleNav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sandustry Buildings — Logistics & Production Overview",
  description:
    "Sandustry buildings hub: refining, conveyors, filters, fluids, and deeper tech roles from Steam Early Access marketing.",
};

export default function ModulesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm text-[hsl(36_78%_55%)]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2 text-stone-600">/</span>
          <span className="text-stone-400">sandustry buildings</span>
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-stone-50 md:text-5xl">
          Sandustry Buildings
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-stone-300">
          High-level roles from Steam store copy and official channels — shakers/refining, conveyors and launchers,
          filters, fluids, and deeper tech. Exact unlock order and stats stay on the official wiki during Early Access.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {moduleNav.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <h2 className="text-xl font-semibold text-[hsl(36_78%_62%)]">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-stone-400">{item.blurb}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <Link href="/automation" className="rounded-full bg-[hsl(28_72%_48%)] px-4 py-2 font-semibold text-stone-950">
            Automation tips
          </Link>
          <Link href="/water" className="rounded-full border border-white/15 px-4 py-2 text-stone-200">
            Water basics
          </Link>
          <Link href="/guide" className="rounded-full border border-white/15 px-4 py-2 text-stone-200">
            Beginner guide
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
