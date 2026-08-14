-- ============================================
-- TABELLA messages (form di contatto)
-- ============================================
-- Esegui in Supabase Dashboard > SQL Editor

-- 1. Tabella
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    obiettivo TEXT NOT NULL,
    messaggio TEXT NOT NULL,
    letto BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Indici
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_letto ON public.messages(letto) WHERE letto = false;

-- 3. RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert messages" ON public.messages;

-- Il form contatti può inserire senza autenticazione
CREATE POLICY "Allow public insert messages"
    ON public.messages
    FOR INSERT
    WITH CHECK (true);

-- Lettura/update/delete per l'admin: configura policy con auth (service role o utente admin)
