# Configurazione SEO

Il dominio configurato è `https://ivangaetatutor.com`. Se cambi dominio, aggiornalo in:

- **public/robots.txt** – riga `Sitemap:`
- **public/sitemap.xml** – tag `<loc>`
- **index.html** – Schema JSON-LD, proprietà `"url"`

Per Open Graph (`og:image`): se il social crawler non risolve il path relativo, usa l’URL completo dell’immagine (es. `https://ivangaetatutor.com/ivan_gaeta_profile.jpeg`).

Dopo il deploy, registra la sitemap in [Google Search Console](https://search.google.com/search-console).
