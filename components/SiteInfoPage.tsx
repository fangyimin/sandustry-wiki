import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type Props = {
  h1: string;
  description: string;
  sections: { h2: string; paragraphs: string[] }[];
};

export function SiteInfoPage({ h1, description, sections }: Props) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-[hsl(36_78%_55%)]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2 text-stone-600">/</span>
          <span className="text-stone-400">Site</span>
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-stone-100 md:text-5xl">
          {h1}
        </h1>
        <p className="mt-4 text-lg text-stone-300">{description}</p>
        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section key={section.h2}>
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-[hsl(36_78%_62%)]">
                {section.h2}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-stone-300">
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
