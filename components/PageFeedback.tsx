"use client";

import { useLanguage } from "@/lib/i18n/context";
import { getUi } from "@/lib/i18n/ui";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = {
  pageTitle?: string;
  siteName: string;
};

export function PageFeedback({ pageTitle, siteName }: Props) {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const t = getUi(locale).feedback;
  const [showNote, setShowNote] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(helpful: boolean) {
    setStatus("sending");
    try {
      const res = await fetch("/api/feedback/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          helpful,
          message: message.trim() || undefined,
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
          onClick={() => submit(true)}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-stone-100 hover:bg-white/10 disabled:opacity-50"
        >
          {t.yes}
        </button>
        <button
          type="button"
          disabled={status === "sending"}
          onClick={() => setShowNote(true)}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-stone-100 hover:bg-white/10 disabled:opacity-50"
        >
          {t.no}
        </button>
      </div>
      {showNote ? (
        <div className="mt-4 space-y-3">
          <label className="block text-sm text-stone-400" htmlFor="page-feedback-note">
            {t.noteLabel}
          </label>
          <textarea
            id="page-feedback-note"
            rows={2}
            maxLength={500}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.notePlaceholder}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-stone-200 placeholder:text-stone-600 focus:border-[hsl(36_78%_45%)] focus:outline-none"
          />
          <button
            type="button"
            disabled={status === "sending"}
            onClick={() => submit(false)}
            className="rounded-full bg-[hsl(28_72%_48%)] px-4 py-2 text-sm font-semibold text-stone-950 hover:bg-[hsl(36_78%_55%)] disabled:opacity-50"
          >
            {status === "sending" ? t.sending : t.send}
          </button>
        </div>
      ) : null}
      {status === "error" ? <p className="mt-3 text-sm text-amber-300/90">{t.error}</p> : null}
    </aside>
  );
}
