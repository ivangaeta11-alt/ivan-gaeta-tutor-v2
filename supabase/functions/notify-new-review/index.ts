import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, escapeHtml, sendEmail } from "../_shared/email.ts";

interface ReviewRecord {
  author_name?: string;
  rating?: number;
  content?: string;
  subject?: string | null;
  created_at?: string;
}

interface WebhookPayload {
  type?: string;
  table?: string;
  record?: ReviewRecord;
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

    if (payload.type !== "INSERT" || payload.table !== "reviews" || !payload.record) {
      return new Response(JSON.stringify({ skipped: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { author_name, rating, content, subject } = payload.record;
    const stars = "★".repeat(Math.min(5, Math.max(0, Number(rating) || 0)));

    const result = await sendEmail({
      subject: `Nuova recensione da ${author_name ?? "studente"}`,
      html: `
        <h2>Nuova recensione ricevuta</h2>
        <p><strong>Nome:</strong> ${escapeHtml(author_name)}</p>
        <p><strong>Materia:</strong> ${escapeHtml(subject || "—")}</p>
        <p><strong>Valutazione:</strong> ${stars} (${escapeHtml(rating)}/5)</p>
        <p><strong>Testo:</strong></p>
        <p>${escapeHtml(content).replaceAll("\n", "<br>")}</p>
        <hr>
        <p style="color:#64748b;font-size:12px;">Puoi approvarla dall'admin quando vuoi pubblicarla in homepage.</p>
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
