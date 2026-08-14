const RESEND_API = "https://api.resend.com/emails";

export async function sendEmail(options: {
  subject: string;
  html: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const to = Deno.env.get("NOTIFY_EMAIL") ?? "ivangaetatutor@gmail.com";
  const from =
    Deno.env.get("FROM_EMAIL") ?? "Ivan Gaeta <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("RESEND_API_KEY non configurata");
    return { ok: false, error: "RESEND_API_KEY mancante" };
  }

  const response = await fetch(RESEND_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: options.subject,
      html: options.html,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("Errore Resend:", err);
    return { ok: false, error: err };
  }

  return { ok: true };
}

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-webhook-secret",
};
