-- ============================================
-- DATI DI ESEMPIO - 9 RISORSE FAKE
-- ============================================
-- 
-- Esegui questo script nel SQL Editor di Supabase
-- per popolare la tabella con dati di esempio
--
-- ============================================

-- Pulisci eventuali dati esistenti (opzionale - commenta se vuoi mantenere i dati)
-- DELETE FROM public.resources;

-- ============================================
-- FISICA (3 risorse)
-- ============================================

-- 1. PDF Fisica - con URL esterno
INSERT INTO public.resources (title, subject, type, description, url)
VALUES (
    'Dispensa Meccanica Quantistica',
    'Fisica',
    'PDF',
    'Dispensa completa sulla meccanica quantistica con esercizi e soluzioni. Copre i principi fondamentali, l''equazione di Schrödinger e le applicazioni pratiche.',
    'https://example.com/pdf/fisica-meccanica-quantistica.pdf'
);

-- 2. Video Fisica - YouTube
INSERT INTO public.resources (title, subject, type, description, url)
VALUES (
    'Lezione Elettromagnetismo',
    'Fisica',
    'Video',
    'Video lezione completa sull''elettromagnetismo: campo elettrico, campo magnetico, onde elettromagnetiche e applicazioni pratiche.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
);

-- 3. PDF Fisica - con file_path (storage Supabase)
INSERT INTO public.resources (title, subject, type, description, file_path)
VALUES (
    'Formulario Fisica Generale',
    'Fisica',
    'PDF',
    'Formulario completo con tutte le formule principali di fisica generale: meccanica, termodinamica, elettromagnetismo e ottica.',
    'dispense/fisica-formulario.pdf'
);

-- ============================================
-- MATEMATICA (3 risorse)
-- ============================================

-- 4. PDF Matematica - con URL esterno
INSERT INTO public.resources (title, subject, type, description, url)
VALUES (
    'Esercizi di Analisi Matematica',
    'Matematica',
    'PDF',
    'Raccolta di esercizi svolti su limiti, derivate e integrali. Include soluzioni dettagliate passo-passo per ogni esercizio.',
    'https://example.com/pdf/matematica-analisi-esercizi.pdf'
);

-- 5. Video Matematica - YouTube
INSERT INTO public.resources (title, subject, type, description, url)
VALUES (
    'Corso Completo Algebra Lineare',
    'Matematica',
    'Video',
    'Serie di video lezioni sull''algebra lineare: vettori, matrici, sistemi lineari, autovalori e autovettori. Perfetto per preparare l''esame.',
    'https://www.youtube.com/watch?v=kjBOesZCoqc'
);

-- 6. PDF Matematica - con file_path (storage Supabase)
INSERT INTO public.resources (title, subject, type, description, file_path)
VALUES (
    'Schemi Geometria Analitica',
    'Matematica',
    'PDF',
    'Schemi riassuntivi di geometria analitica: rette, coniche, trasformazioni geometriche. Utile per ripasso veloce prima dell''esame.',
    'dispense/matematica-geometria-schemi.pdf'
);

-- ============================================
-- METODO DI STUDIO (3 risorse)
-- ============================================

-- 7. PDF Metodo di Studio - con URL esterno
INSERT INTO public.resources (title, subject, type, description, url)
VALUES (
    'Guida Tecniche di Memoria',
    'Metodo di Studio',
    'PDF',
    'Guida pratica alle tecniche di memorizzazione: metodo dei loci, mappe mentali, ripetizione spaziata. Migliora la tua capacità di ricordare.',
    'https://example.com/pdf/metodo-tecniche-memoria.pdf'
);

-- 8. Video Metodo di Studio - YouTube
INSERT INTO public.resources (title, subject, type, description, url)
VALUES (
    'Come Organizzare lo Studio Universitario',
    'Metodo di Studio',
    'Video',
    'Video tutorial su come organizzare efficacemente lo studio universitario: pianificazione settimanale, gestione del tempo, tecniche di lettura veloce.',
    'https://www.youtube.com/watch?v=9bZkp7q19f0'
);

-- 9. PDF Metodo di Studio - con file_path (storage Supabase)
INSERT INTO public.resources (title, subject, type, description, file_path)
VALUES (
    'Template Piano di Studio',
    'Metodo di Studio',
    'PDF',
    'Template editabile per creare il tuo piano di studio personalizzato. Include tabelle per organizzare materie, orari e obiettivi settimanali.',
    'template/metodo-piano-studio.pdf'
);

-- ============================================
-- VERIFICA
-- ============================================
-- 
-- Per verificare che i dati siano stati inseriti correttamente:
-- 
-- SELECT 
--     id,
--     title,
--     subject,
--     type,
--     CASE 
--         WHEN url IS NOT NULL THEN url
--         WHEN file_path IS NOT NULL THEN 'Storage: ' || file_path
--         WHEN external_url IS NOT NULL THEN external_url
--         ELSE 'Nessun URL'
--     END as resource_url
-- FROM public.resources
-- ORDER BY subject, type;
-- 
-- Dovresti vedere 9 righe:
-- - 3 risorse Fisica (2 PDF, 1 Video)
-- - 3 risorse Matematica (2 PDF, 1 Video)
-- - 3 risorse Metodo di Studio (2 PDF, 1 Video)
--
-- ============================================
