# 🚀 Guida Setup Supabase per Risorse

Questa guida ti spiega passo passo come configurare Supabase per far funzionare la pagina delle risorse.

## 📋 Prerequisiti

- Account Supabase (gratuito): https://supabase.com
- Progetto Supabase creato

---

## 🔧 Step 1: Creare la Tabella

1. Vai sul **Dashboard Supabase** del tuo progetto
2. Apri il menu **SQL Editor** (icona `</>` nella sidebar)
3. Clicca su **New Query**
4. Copia e incolla il contenuto del file `supabase-setup.sql`
5. Clicca su **Run** (o premi `Ctrl+Enter`)

✅ La tabella `resources` è stata creata con tutte le policy necessarie!

---

## 🔐 Step 2: Configurare le Variabili d'Ambiente

1. Nel Dashboard Supabase, vai su **Settings** (icona ingranaggio) > **API**
2. Trova la sezione **Project URL** e copia l'URL
3. Trova la sezione **Project API keys** e copia la chiave **`anon` `public`** (non la `service_role`!)

4. Nel tuo progetto, crea/modifica il file `.env` nella root:

```env
VITE_SUPABASE_URL=https://tuo-progetto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **IMPORTANTE**: 
- Usa la chiave `anon public`, NON la `service_role` (che è privata)
- Non committare il file `.env` nel repository (dovrebbe essere già nel `.gitignore`)

---

## 📦 Step 3: Configurare Storage (Opzionale - solo per PDF)

Se vuoi caricare PDF nello storage di Supabase invece di usare URL esterni:

### 3.1 Creare il Bucket

1. Vai su **Storage** nella sidebar
2. Clicca su **New bucket**
3. Nome bucket: `resources` (deve essere esattamente questo nome!)
4. **Public bucket**: ✅ Sì (deve essere pubblico per permettere il download)
5. Clicca su **Create bucket**

### 3.2 Configurare le Policy del Bucket

1. Clicca sul bucket `resources` appena creato
2. Vai su **Policies**
3. Clicca su **New Policy**
4. Seleziona **For full customization**, poi **Create policy from scratch**
5. Nome policy: `Allow public read access`
6. Policy definition:

```sql
CREATE POLICY "Allow public read access"
ON storage.objects
FOR SELECT
USING (bucket_id = 'resources');
```

7. Clicca su **Review** e poi **Save policy**

✅ Ora puoi caricare PDF nel bucket e usarli nelle risorse!

### 3.3 Caricare un PDF

1. Vai su **Storage** > **resources**
2. Clicca su **Upload file**
3. Carica il tuo PDF
4. **IMPORTANTE**: Ricorda il percorso del file (es: `dispense/fisica-1.pdf`)

### 3.4 Inserire una Risorsa con File Storage

Nel SQL Editor, esegui:

```sql
INSERT INTO public.resources (title, subject, type, description, file_path)
VALUES (
    'Dispensa di Fisica',
    'Fisica',
    'PDF',
    'Descrizione della dispensa',
    'dispense/fisica-1.pdf'  -- <-- percorso del file caricato
);
```

---

## 📝 Step 4: Inserire Dati di Test

### Opzione A: Tramite SQL Editor

Esegui nel SQL Editor:

```sql
-- Esempio: Video YouTube
INSERT INTO public.resources (title, subject, type, description, url)
VALUES (
    'Lezione di Matematica',
    'Matematica',
    'Video',
    'Video lezione su YouTube',
    'https://www.youtube.com/watch?v=VIDEO_ID'
);

-- Esempio: PDF con URL esterno
INSERT INTO public.resources (title, subject, type, description, url)
VALUES (
    'Schemi di Studio',
    'Metodo di Studio',
    'PDF',
    'Schemi utili per organizzare lo studio',
    'https://example.com/schemi.pdf'
);
```

### Opzione B: Tramite Table Editor

1. Vai su **Table Editor** nella sidebar
2. Seleziona la tabella `resources`
3. Clicca su **Insert** > **Insert row**
4. Compila i campi:
   - `title`: Titolo della risorsa
   - `subject`: `Fisica`, `Matematica`, o `Metodo di Studio`
   - `type`: `Video` o `PDF`
   - `description`: (opzionale) Descrizione
   - `url`: URL diretto (per video o PDF esterni)
   - `file_path`: (opzionale) Percorso file nello storage (solo per PDF)
   - `external_url`: (opzionale) URL alternativo

---

## ✅ Verifica che Tutto Funzioni

1. Avvia il progetto: `npm run dev`
2. Vai alla pagina **Risorse**
3. Dovresti vedere le risorse caricate nel database!

Se vedi un errore:
- ✅ Controlla che le variabili d'ambiente siano corrette nel file `.env`
- ✅ Verifica che la tabella `resources` esista nel database
- ✅ Controlla che le policy RLS siano attive e permettano la lettura pubblica
- ✅ Apri la console del browser per vedere eventuali errori dettagliati

---

## 🔒 Sicurezza

### Policy RLS Attuali:
- ✅ **SELECT**: Pubblico (tutti possono leggere)
- ❌ **INSERT**: Disabilitato (non puoi inserire da frontend)
- ❌ **DELETE**: Disabilitato (non puoi eliminare da frontend)

### Se Vuoi Permettere Inserimento/Eliminazione da Frontend:

⚠️ **ATTENZIONE**: Questo permette a chiunque di modificare il database!

Nel SQL Editor, esegui:

```sql
-- Permettere inserimento pubblico
CREATE POLICY "Allow public insert"
    ON public.resources
    FOR INSERT
    WITH CHECK (true);

-- Permettere eliminazione pubblica
CREATE POLICY "Allow public delete"
    ON public.resources
    FOR DELETE
    USING (true);
```

**Raccomandazione**: Per produzione, usa autenticazione Supabase e crea policy più restrittive basate sugli utenti autenticati.

---

## 📚 Struttura Tabella

| Campo | Tipo | Obbligatorio | Descrizione |
|-------|------|--------------|-------------|
| `id` | UUID | ✅ | ID univoco (generato automaticamente) |
| `title` | TEXT | ✅ | Titolo della risorsa |
| `subject` | TEXT | ✅ | `Fisica`, `Matematica`, o `Metodo di Studio` |
| `type` | TEXT | ✅ | `Video` o `PDF` |
| `description` | TEXT | ❌ | Descrizione opzionale |
| `url` | TEXT | ❌ | URL diretto (priorità massima) |
| `file_path` | TEXT | ❌ | Percorso file nello storage Supabase |
| `external_url` | TEXT | ❌ | URL esterno alternativo |
| `created_at` | TIMESTAMP | ✅ | Data creazione (automatica) |
| `updated_at` | TIMESTAMP | ✅ | Data aggiornamento (automatica) |

### Logica URL (priorità):
1. Se esiste `url` → usa quello
2. Altrimenti, se `type = 'PDF'` e esiste `file_path` → costruisce URL storage Supabase
3. Altrimenti, se esiste `external_url` → usa quello

---

## 🆘 Troubleshooting

### Errore: "Configurazione Supabase mancante"
- Verifica che il file `.env` esista nella root del progetto
- Controlla che le variabili siano scritte correttamente: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
- Riavvia il server di sviluppo dopo aver modificato `.env`

### Errore: "Errore HTTP 401" o "permission denied"
- Verifica che la policy RLS "Allow public read access" sia attiva
- Controlla di aver copiato la chiave `anon public` e non la `service_role`

### Errore: "Errore HTTP 404"
- Verifica che la tabella si chiami esattamente `resources` (minuscolo)
- Controlla che la tabella esista nel database

### Le risorse non si vedono
- Apri la console del browser (F12) e controlla eventuali errori
- Verifica che ci siano dati nella tabella `resources` (Table Editor)
- Controlla che i campi `subject` e `type` abbiano valori validi

---

## 📞 Supporto

Se hai problemi, controlla:
- [Documentazione Supabase](https://supabase.com/docs)
- Console del browser per errori dettagliati
- Logs di Supabase Dashboard > Logs
