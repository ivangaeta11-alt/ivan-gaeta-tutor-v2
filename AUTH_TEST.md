# Test autenticazione V2

Guida rapida per provare login, ruoli e dashboard protette sul progetto Supabase collegato.

## 1. Variabili ambiente (locale)

Il file `.env.local` (non committato) deve contenere:

```env
VITE_SUPABASE_URL=https://cprfpozwjdijlmfovbeg.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<publishable key da Supabase Dashboard → Settings → API>
```

Riavvia il dev server dopo ogni modifica:

```bash
npm run dev
```

## 2. Utenti di prova

Seed applicato su Supabase (`supabase/seed/auth_test_users.sql`).

**Password comune (solo test):** `DemoV2!Test2026`

| Email | Ruolo/i | Esito atteso dopo login |
|-------|---------|-------------------------|
| `studente.demo@example.com` | student | Dashboard studente |
| `tutor.demo@example.com` | tutor | Dashboard tutor |
| `promoter.demo@example.com` | promoter | Dashboard promoter |
| `multi.demo@example.com` | tutor + promoter | Schermata scelta area |
| `pending.demo@example.com` | *(nessuno)* | Account in attesa |

## 3. Checklist test manuale

1. Apri `/login` senza sessione → form visibile.
2. Prova credenziali errate → messaggio comprensibile.
3. Login studente → `/area-personale/studente`, header con nome/email reali.
4. Refresh pagina → sessione mantenuta.
5. Studente che apre `/area-personale/tutor` → redirect alla propria area.
6. Logout → torna a `/login`.
7. Login `pending.demo@example.com` → `/area-personale/in-attesa`.
8. Login `multi.demo@example.com` → `/area-personale/selezione-area`.

## 4. Deploy (sito pubblicato)

Configura **le stesse due variabili** `VITE_*` nel pannello del provider di hosting e rideploy.

## 5. Ri-seed utenti (opzionale)

Riesegui `supabase/seed/auth_test_users.sql` nel SQL Editor Supabase (idempotente).
