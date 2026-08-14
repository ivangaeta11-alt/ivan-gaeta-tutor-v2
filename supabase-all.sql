-- ============================================
-- SETUP COMPLETO SUPABASE – Sito tutor
-- ============================================
--
-- Esegui in Supabase Dashboard > SQL Editor (Run)
-- Script idempotente: puoi rieseguirlo senza errori gravi
--
-- Include:
--   - resources (pagina Risorse)
--   - messages (form contatti)
--   - reviews (recensioni)
--
-- Dopo l'esecuzione:
--   1. Configura i webhook email (vedi EMAIL_NOTIFICATIONS_SETUP.md)
--   2. Imposta VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nel .env
--
-- ============================================

-- ============================================
-- RESOURCES
-- ============================================

CREATE TABLE IF NOT EXISTS public.resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    subject TEXT NOT NULL CHECK (subject IN ('Fisica', 'Matematica', 'Metodo di Studio')),
    type TEXT NOT NULL CHECK (type IN ('Video', 'PDF')),
    description TEXT,
    url TEXT,
    file_path TEXT,
    external_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_resources_subject ON public.resources(subject);
CREATE INDEX IF NOT EXISTS idx_resources_type ON public.resources(type);

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON public.resources;
CREATE POLICY "Allow public read access"
    ON public.resources
    FOR SELECT
    USING (true);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_resources_updated_at ON public.resources;
CREATE TRIGGER update_resources_updated_at
    BEFORE UPDATE ON public.resources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- MESSAGES (form contatti)
-- ============================================

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    obiettivo TEXT NOT NULL,
    messaggio TEXT NOT NULL,
    letto BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_letto ON public.messages(letto) WHERE letto = false;

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert messages" ON public.messages;
CREATE POLICY "Allow public insert messages"
    ON public.messages
    FOR INSERT
    WITH CHECK (true);

-- ============================================
-- REVIEWS (recensioni)
-- ============================================

CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    author_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content TEXT NOT NULL,
    approved BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.reviews
ADD COLUMN IF NOT EXISTS subject TEXT;

CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON public.reviews(approved) WHERE approved = true;

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Allow public read approved reviews" ON public.reviews;

CREATE POLICY "Allow public insert reviews"
    ON public.reviews
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public read approved reviews"
    ON public.reviews
    FOR SELECT
    USING (approved = true);
