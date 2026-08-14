# Script SQL Supabase

Esegui gli script nel **SQL Editor** di Supabase (Dashboard → SQL → New query → incolla → Run).

---

## Quale script usare

| File | Quando usarlo |
|------|----------------|
| **`supabase-all.sql`** | Setup completo in un colpo solo (risorse + messaggi + recensioni) |
| **`supabase-setup.sql`** | Solo tabella `resources` (pagina Risorse) |
| **`supabase-messaggi.sql`** | Solo tabella `messages` (form contatti) |
| **`supabase-reviews.sql`** | Solo tabella `reviews` (recensioni) |
| **`supabase-reviews-add-subject.sql`** | Solo colonna `subject` su `reviews` (se la tabella esiste già) |
| **`supabase-sample-data.sql`** | Dati di esempio per le risorse |

---

## Ordine consigliato (prima installazione)

1. `supabase-all.sql` **oppure** i singoli script nell’ordine: setup → messaggi → reviews  
2. Configura Storage per i PDF (vedi `SUPABASE_SETUP.md`)  
3. Webhook email (non SQL): vedi `EMAIL_NOTIFICATIONS_SETUP.md`

---

## Tabelle

### `messages`
| Colonna | Tipo | Note |
|---------|------|------|
| id | UUID | PK |
| nome | TEXT | |
| email | TEXT | |
| obiettivo | TEXT | |
| messaggio | TEXT | |
| letto | BOOLEAN | default false |
| created_at | TIMESTAMPTZ | |

**Policy:** INSERT pubblico (form sito).

### `reviews`
| Colonna | Tipo | Note |
|---------|------|------|
| id | UUID | PK |
| author_name | TEXT | |
| rating | INTEGER | 1–5 |
| content | TEXT | |
| subject | TEXT | materia (opzionale) |
| approved | BOOLEAN | default false |
| created_at | TIMESTAMPTZ | |

**Policy:** INSERT pubblico; SELECT solo se `approved = true`.

### `resources`
Vedi `SUPABASE_SETUP.md`.

---

## Admin

Le policy per **leggere/approvare** messaggi e recensioni dall’admin vanno configurate con autenticazione Supabase (utente admin o `service_role` nell’app admin). Gli script del sito pubblico permettono solo inserimento (e lettura recensioni approvate).
