const ANALYTICS_CHAT_ID = "oc_72cbc6c974d078549844c6bb2df353c5";

export type FeedbackPayload = {
  siteName: string;
  siteUrl: string;
  pagePath: string;
  pageTitle?: string;
  helpful: boolean;
  message?: string;
  referrer?: string;
};

function buildMarkdown(payload: FeedbackPayload): string {
  const rating = payload.helpful ? "👍 有帮助" : "👎 需改进";
  const pageUrl = `${payload.siteUrl.replace(/\/$/, "")}${payload.pagePath.startsWith("/") ? payload.pagePath : `/${payload.pagePath}`}`;
  const lines = [
    `**站点反馈** · ${payload.siteName}`,
    "",
    `- **评价**: ${rating}`,
    `- **页面**: ${payload.pageTitle ? `${payload.pageTitle} · ` : ""}${pageUrl}`,
  ];
  if (payload.referrer) lines.push(`- **来源**: ${payload.referrer}`);
  if (payload.message?.trim()) lines.push(`- **留言**: ${payload.message.trim()}`);
  return lines.join("\n");
}

async function sendViaWebhook(webhook: string, markdown: string): Promise<void> {
  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      msg_type: "text",
      content: { text: markdown },
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Feishu webhook failed (${res.status}): ${body.slice(0, 200)}`);
  }
  const data = (await res.json()) as { code?: number; msg?: string; StatusCode?: number };
  if (data.code !== undefined && data.code !== 0) {
    throw new Error(`Feishu webhook error: ${data.msg ?? data.code}`);
  }
  if (data.StatusCode !== undefined && data.StatusCode !== 0) {
    throw new Error(`Feishu webhook error: StatusCode ${data.StatusCode}`);
  }
}

async function tenantToken(appId: string, appSecret: string): Promise<string> {
  const res = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
  });
  const data = (await res.json()) as { code: number; msg: string; tenant_access_token?: string };
  if (data.code !== 0 || !data.tenant_access_token) {
    throw new Error(`Feishu auth failed: ${data.msg}`);
  }
  return data.tenant_access_token;
}

async function sendViaOpenApi(appId: string, appSecret: string, chatId: string, markdown: string): Promise<void> {
  const token = await tenantToken(appId, appSecret);
  const card = JSON.stringify({
    config: { wide_screen_mode: true },
    header: {
      title: { tag: "plain_text", content: "站点用户反馈" },
      template: "blue",
    },
    elements: [{ tag: "div", text: { tag: "lark_md", content: markdown } }],
  });
  const res = await fetch(
    `https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receive_id: chatId,
        msg_type: "interactive",
        content: card,
      }),
    },
  );
  const data = (await res.json()) as { code: number; msg: string };
  if (data.code !== 0) {
    throw new Error(`Feishu im message failed: ${data.msg}`);
  }
}

export async function sendFeedbackToFeishu(payload: FeedbackPayload): Promise<void> {
  const markdown = buildMarkdown(payload);
  const webhook = process.env.FEISHU_FEEDBACK_WEBHOOK?.trim();
  if (webhook) {
    await sendViaWebhook(webhook, markdown);
    return;
  }
  const appId = process.env.LARK_APP_ID?.trim();
  const appSecret = process.env.LARK_APP_SECRET?.trim();
  const chatId = process.env.FEISHU_ANALYTICS_CHAT_ID?.trim() || ANALYTICS_CHAT_ID;
  if (appId && appSecret) {
    await sendViaOpenApi(appId, appSecret, chatId, markdown);
    return;
  }
  throw new Error("Missing FEISHU_FEEDBACK_WEBHOOK or LARK_APP_ID/LARK_APP_SECRET");
}
