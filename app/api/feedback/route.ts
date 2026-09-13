import { sendFeedbackToFeishu } from "@/lib/feishu-feedback";
import siteConfig from "@/config/site.json";

export const runtime = "nodejs";

type Body = {
  helpful?: boolean;
  message?: string;
  pagePath?: string;
  pageTitle?: string;
  referrer?: string;
  website?: string;
};

function trim(s: unknown, max: number): string {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.website) {
    return Response.json({ ok: true });
  }

  const pagePath = trim(body.pagePath, 200) || "/";
  const message = trim(body.message, 500);
  const pageTitle = trim(body.pageTitle, 120);
  const referrer = trim(body.referrer, 500);

  const helpful = typeof body.helpful === "boolean" ? body.helpful : undefined;
  if (helpful === undefined && !message) {
    return Response.json({ error: "helpful or message is required" }, { status: 400 });
  }

  try {
    await sendFeedbackToFeishu({
      siteName: siteConfig.siteName,
      siteUrl: siteConfig.siteUrl,
      pagePath,
      pageTitle: pageTitle || undefined,
      helpful,
      message: message || undefined,
      referrer: referrer || undefined,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("feedback send failed:", err);
    return Response.json({ error: "Feedback service unavailable" }, { status: 503 });
  }
}
