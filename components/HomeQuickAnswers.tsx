import Link from "next/link";

type QuickAnswers = {
  title: string;
  intro?: string;
  items: { q: string; a: string; href: string }[];
};

export function HomeQuickAnswers({ block }: { block: QuickAnswers }) {
  if (!block.items?.length) return null;
  return (
    <section className="border-y border-white/10 bg-black/25">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-stone-50 md:text-3xl">
          {block.title}
        </h2>
        {block.intro ? <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-400">{block.intro}</p> : null}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {block.items.map((item) => (
            <Link
              key={item.q}
              href={item.href}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[hsl(36_78%_45%)] hover:bg-white/[0.06]"
            >
              <div className="text-sm font-semibold text-[hsl(36_78%_62%)]">{item.q}</div>
              <p className="mt-2 text-sm leading-6 text-stone-300">{item.a}</p>
              <span className="mt-3 inline-block text-xs font-medium text-stone-500">Read more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
