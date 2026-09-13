"use client";

import { useLanguage } from "@/lib/i18n/context";
import { getUi } from "@/lib/i18n/ui";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = {
  pageTitle?: string;
  siteName: string;
};

function ratingClass(active: boolean) {
  return active
    ? "border-[hsl(36_78%_45%)] bg-[hsl(28_72%_48%)]/20 text-[hsl(36_78%_62%)]"
    : "border-white/15 bg-white/5 text-stone-100 hover:bg-white/10";
}

export function PageFeedback({ pageTitle, siteName }: Props) {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const t = getUi(locale).feedback;
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const canSubmit = helpful !== null || message.trim().length > 0;

  async function submit(nextHelpful?: boolean | null) {
    const rating = nextHelpful === undefined ? helpful : nextHelpful;
    const note = message.trim();
    if ((rating === null && !note) || status === "sending") return;

    setStatus("sending");
    try {
      const res = await fetch("/api/feedback/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          helpful: rating === null ? undefined : rating,
          message: note || undefined,
          pagePath: pathname || "/",
          pageTitle,
          referrer: typeof document !== "undefined" ? document.referrer : "",
          website: "",
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <aside className="mt-12 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-100/90">
        {t.thanks.replace("{site}", siteName)}
      </aside>
    );
  }

  return (
    <aside className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5">
      <h2 className="text-base font-semibold text-stone-100">{t.title}</h2>
      <p className="mt-1 text-sm text-stone-500">{t.subtitle}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={status === "sending"}
          onClick={() => {
            setHelpful(true);
            submit(true);
          }}
          className={`rounded-full border px-4 py-2 text-sm font-medium disabled:opacity-50 ${ratingClass(helpful === true)}`}
        >
          {t.yes}
        </button>
        <button
          type="button"
          disabled={status === "sending"}
          onClick={() => {
            setHelpful(false);
            submit(false);
          }}
          className={`rounded-full border px-4 py-2 text-sm font-medium disabled:opacity-50 ${ratingClass(helpful === false)}`}
        >
          {t.no}
        </button>
      </div>
      <div className="mt-4 space-y-3">
        <label className="block text-sm text-stone-400" htmlFor="page-feedback-note">
          {t.noteLabel}
        </label>
        <textarea
          id="page-feedback-note"
          rows={3}
          maxLength={500}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.notePlaceholder}
          className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-stone-200 placeholder:text-stone-600 focus:border-[hsl(36_78%_45%)] focus:outline-none"
        />
        <button
          type="button"
          disabled={!canSubmit || status === "sending"}
          onClick={() => submit()}
          className="rounded-full bg-[hsl(28_72%_48%)] px-4 py-2 text-sm font-semibold text-stone-950 hover:bg-[hsl(36_78%_55%)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "sending" ? t.sending : t.send}
        </button>
      </div>
      {status === "error" ? <p className="mt-3 text-sm text-amber-300/90">{t.error}</p> : null}
    </aside>
  );
}
