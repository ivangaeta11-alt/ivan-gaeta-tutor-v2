import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, escapeHtml, sendEmail } from "../_shared/email.ts";

interface WebhookPayload {
  type?: string;
  table?: string;
  record?: {
    nome?: string;
    email?: string;
    obiettivo?: string;
    messaggio?: string;
    created_at?: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const webhookSecret = Deno.env.get("WEBHOOK_SECRET");
  if (webhookSecret && req.headers.get("x-webhook-secret") !== webhookSecret) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const payload = (await req.json()) as WebhookPayload;

    if (payload.type !== "INSERT" || payload.table !== "messages" || !payload.record) {
      return new Response(JSON.stringify({ skipped: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { nome, email, obiettivo, messaggio, created_at } = payload.record;

    const result = await sendEmail({
      subject: `Nuovo messaggio da ${nome ?? "visitatore"}`,
      html: `
        <h2>Nuovo messaggio dal form contatti</h2>
        <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Obiettivo:</strong> ${escapeHtml(obiettivo)}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${escapeHtml(messaggio).replaceAll("\n", "<br>")}</p>
        <hr>
        <p style="color:#64748b;font-size:12px;">Ricevuto il ${escapeHtml(created_at)}</p>
      `,
    });

    return new Response(JSON.stringify(result), {
      status: result.ok ? 200 : 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
