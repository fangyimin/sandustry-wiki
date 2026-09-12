import type { GuidePage } from "@/lib/site";

export function sectionId(h2: string, index: number): string {
  const slug = h2
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/gi, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return slug || `section-${index}`;
}

export function estimateReadMinutes(page: GuidePage): number {
  const text = [
    page.description,
    page.note ?? "",
    ...page.sections.flatMap((s) => [s.h2, ...s.paragraphs]),
    ...(page.faq?.flatMap((f) => [f.q, f.a]) ?? []),
  ].join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 200));
}

export const learningPaths: Record<
  string,
  { slugs: string[]; labels: { en: string[]; zh: string[] } }
> = {
  guide: {
    slugs: ["demo", "guide", "automation"],
    labels: {
      en: ["Try demo", "Beginner guide", "Automation"],
      zh: ["试玩 Demo", "新手指南", "自动化"],
    },
  },
  automation: {
    slugs: ["guide", "automation", "water"],
    labels: {
      en: ["Beginner guide", "Automation", "Water basics"],
      zh: ["新手指南", "自动化", "水与流体"],
    },
  },
  demo: {
    slugs: ["demo", "guide", "automation"],
    labels: {
      en: ["Demo checklist", "Beginner guide", "Automation"],
      zh: ["Demo 清单", "新手指南", "自动化"],
    },
  },
};

export const midArticleCta: Record<
  string,
  { slug: string; en: { title: string; body: string }; zh: { title: string; body: string } }
> = {
  guide: {
    slug: "automation",
    en: {
      title: "Ready to stop hand-carrying?",
      body: "Once your first refine loop works, the next bottleneck is almost always belts and filters — not more digging.",
    },
    zh: {
      title: "不想再手搬了？",
      body: "第一条精炼环跑通后，下一个瓶颈几乎总是传送带与过滤器——而不是继续挖。",
    },
  },
  automation: {
    slug: "water",
    en: {
      title: "Fluids breaking your dry belts?",
      body: "Wet sand and floods ignore conveyor logic. Read water basics before scaling dig volume.",
    },
    zh: {
      title: "流体在搞乱你的干带？",
      body: "湿沙与洪水不吃传送带逻辑。扩大挖量前先看水与流体基础。",
    },
  },
  demo: {
    slug: "guide",
    en: {
      title: "Liked the demo loop?",
      body: "The full Early Access journey starts with the same dig–refine–automate habits — this guide walks the first hours.",
    },
    zh: {
      title: "Demo 循环对味？",
      body: "完整抢先体验仍是同一套挖—炼—自动化习惯——这篇指南带你过前几小时。",
    },
  },
};
