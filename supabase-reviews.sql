-- ============================================
-- TABELLA reviews (recensioni studenti)
-- ============================================
-- Esegui in Supabase Dashboard > SQL Editor
-- Compatibile con tabella esistente: aggiunge colonne/policy mancanti

-- 1. Tabella (se non esiste)
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    author_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content TEXT NOT NULL,
    approved BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Colonna materia (testo libero, opzionale)
ALTER TABLE public.reviews
ADD COLUMN IF NOT EXISTS subject TEXT;

-- 3. Indici
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON public.reviews(approved) WHERE approved = true;

-- 4. RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Rimuovi policy omonime se riesegui lo script
DROP POLICY IF EXISTS "Allow public insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Allow public read approved reviews" ON public.reviews;

-- Chiunque può inviare una recensione dal sito
CREATE POLICY "Allow public insert reviews"
    ON public.reviews
    FOR INSERT
    WITH CHECK (true);

-- In homepage si vedono solo le recensioni approvate
CREATE POLICY "Allow public read approved reviews"
    ON public.reviews
    FOR SELECT
    USING (approved = true);

-- Lettura/update/delete per l'admin: configura policy con auth (service role o utente admin)
