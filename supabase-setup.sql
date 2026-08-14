-- ============================================
-- SETUP SUPABASE PER RISORSE
-- ============================================
-- 
-- Istruzioni:
-- 1. Vai su Supabase Dashboard > SQL Editor
-- 2. Esegui questo script completo
-- 3. Configura lo Storage (vedi istruzioni sotto)
-- 4. Copia URL e API Key nel file .env
--
-- ============================================

-- 1. CREA LA TABELLA resources
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    subject TEXT NOT NULL CHECK (subject IN ('Fisica', 'Matematica', 'Metodo di Studio')),
    type TEXT NOT NULL CHECK (type IN ('Video', 'PDF')),
    description TEXT,
    url TEXT,                    -- URL diretto (priorità massima)
    file_path TEXT,              -- Percorso file nello storage Supabase (per PDF)
    external_url TEXT,           -- URL esterno alternativo
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CREA INDICE per migliorare le performance delle query
CREATE INDEX IF NOT EXISTS idx_resources_subject ON public.resources(subject);
CREATE INDEX IF NOT EXISTS idx_resources_type ON public.resources(type);

-- 3. ABILITA ROW LEVEL SECURITY (RLS)
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- 4. CREA POLICY per permettere lettura pubblica (tutti possono leggere)
CREATE POLICY "Allow public read access"
    ON public.resources
    FOR SELECT
    USING (true);

-- 5. CREA POLICY per permettere inserimento (opzionale - solo se vuoi inserire da frontend)
-- ATTENZIONE: Rimuovi questa policy se non vuoi permettere inserimenti pubblici!
-- CREATE POLICY "Allow public insert"
--     ON public.resources
--     FOR INSERT
--     WITH CHECK (true);

-- 6. CREA POLICY per permettere eliminazione (opzionale - solo se vuoi eliminare da frontend)
-- ATTENZIONE: Rimuovi questa policy se non vuoi permettere eliminazioni pubbliche!
-- CREATE POLICY "Allow public delete"
--     ON public.resources
--     FOR DELETE
--     USING (true);

-- 7. CREA FUNZIONE per aggiornare updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. CREA TRIGGER per aggiornare updated_at
CREATE TRIGGER update_resources_updated_at
    BEFORE UPDATE ON public.resources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ESEMPI DI INSERIMENTO DATI
-- ============================================

-- Esempio 1: PDF con file nello storage Supabase
-- INSERT INTO public.resources (title, subject, type, description, file_path)
-- VALUES (
--     'Dispensa Meccanica Quantistica',
--     'Fisica',
--     'PDF',
--     'Dispensa completa sulla meccanica quantistica',
--     'dispense/meccanica-quantistica.pdf'
-- );

-- Esempio 2: Video con URL esterno
-- INSERT INTO public.resources (title, subject, type, description, url)
-- VALUES (
--     'Lezione su YouTube',
--     'Matematica',
--     'Video',
--     'Video lezione su integrali',
--     'https://www.youtube.com/watch?v=...'
-- );

-- Esempio 3: PDF con URL diretto
-- INSERT INTO public.resources (title, subject, type, description, url)
-- VALUES (
--     'Schemi di Studio',
--     'Metodo di Studio',
--     'PDF',
--     'Schemi utili per organizzare lo studio',
--     'https://example.com/schemi.pdf'
-- );
