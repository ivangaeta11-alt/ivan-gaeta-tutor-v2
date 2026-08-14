# Notifiche email (form contatti + nuove recensioni)

Il sito salva già i dati su Supabase. Le email partono **automaticamente** tramite **Edge Functions** + **Database Webhooks** + **Resend**.

Destinatario predefinito: **ivangaetatutor@gmail.com**

---

## Panoramica

| Evento | Quando | Funzione |
|--------|--------|----------|
| Nuovo messaggio contatto | INSERT su `messages` | `notify-contact` |
| Nuova recensione | INSERT su `reviews` (quando uno studente la invia) | `notify-new-review` |

---

## 1. Account Resend (invio email)

1. Crea un account su [resend.com](https://resend.com)
2. Vai su **API Keys** e crea una chiave
3. Per i test puoi usare il mittente `onboarding@resend.dev` (solo verso l’email del tuo account Resend)
4. Per la produzione verifica il dominio **ivangaetatutor.com** in Resend e usa un mittente tipo `contatti@ivangaetatutor.com`

---

## 2. Supabase CLI (una tantum)

Installa la CLI: [supabase.com/docs/guides/cli](https://supabase.com/docs/guides/cli)

```bash
supabase login
supabase link --project-ref TUO_PROJECT_REF
```

Il **Project ref** lo trovi in Supabase Dashboard → Settings → General.

---

## 3. Secrets delle Edge Functions

In Supabase Dashboard → **Edge Functions** → **Secrets**, oppure da terminale:

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxx
supabase secrets set NOTIFY_EMAIL=ivangaetatutor@gmail.com
supabase secrets set FROM_EMAIL="Ivan Gaeta <contatti@ivangaetatutor.com>"
supabase secrets set WEBHOOK_SECRET=una-stringa-lunga-e-casuale
```

- `NOTIFY_EMAIL`: dove ricevi le notifiche
- `FROM_EMAIL`: mittente (dopo aver verificato il dominio su Resend)
- `WEBHOOK_SECRET`: opzionale ma consigliato, per proteggere i webhook

---

## 4. Deploy delle funzioni

Dalla root del progetto:

```bash
supabase functions deploy notify-contact
supabase functions deploy notify-new-review
```

---

## 5. Database Webhooks

Supabase Dashboard → **Database** → **Webhooks** → **Create a new hook**

### Webhook A – Messaggi contatto

- **Name:** `notify-contact`
- **Table:** `messages`
- **Events:** `INSERT`
- **Type:** Supabase Edge Function → `notify-contact`
- **HTTP Headers** (se usi `WEBHOOK_SECRET`):
  - `x-webhook-secret`: stesso valore del secret

### Webhook B – Nuova recensione

- **Name:** `notify-new-review`
- **Table:** `reviews`
- **Events:** `INSERT`
- **Type:** Supabase Edge Function → `notify-new-review`
- **HTTP Headers:** stesso header `x-webhook-secret`

Ricevi l’email **appena uno studente invia** la recensione dal sito, così puoi approvarla dall’admin.

---

## 6. Verifica

1. Invia un messaggio dal form contatti → dovresti ricevere l’email
2. Invia una recensione dal sito → dovresti ricevere l’email con i dettagli

Log delle funzioni: Supabase Dashboard → **Edge Functions** → seleziona la funzione → **Logs**

---

## Note

- Il frontend **non** invia email direttamente (sicurezza: la API key resta solo su Supabase)
- Se Resend è in modalità test, le email possono arrivare solo all’indirizzo verificato su Resend
- Per usare `@ivangaetatutor.com` come mittente, verifica il dominio su Resend e aggiorna `FROM_EMAIL`
