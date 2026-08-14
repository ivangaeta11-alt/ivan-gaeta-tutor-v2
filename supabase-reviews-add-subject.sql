-- ============================================
-- Aggiungi la colonna subject alla tabella reviews
-- ============================================
-- Istruzioni: Supabase Dashboard > SQL Editor > New query > incolla e Run

ALTER TABLE public.reviews
ADD COLUMN IF NOT EXISTS subject TEXT;

-- (Puoi eseguire lo script più volte: IF NOT EXISTS evita errori se la colonna c'è già)
