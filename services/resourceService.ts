
import { Risorsa } from '../types/resource';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validazione variabili d'ambiente all'avvio
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    '⚠️ Variabili d\'ambiente Supabase mancanti!\n' +
    'Assicurati di aver configurato VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nel file .env'
  );
}

// Timeout per le richieste (10 secondi)
const FETCH_TIMEOUT = 10000;

/**
 * Crea una fetch con timeout
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number = FETCH_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Richiesta timeout: il server non risponde');
    }
    throw error;
  }
}

/**
 * Valida e normalizza i dati ricevuti dal DB
 */
function validateAndMapResource(row: Record<string, unknown>): Risorsa | null {
  // Validazione campi obbligatori
  if (!row.id || !row.title) {
    console.warn('Risorsa con dati incompleti ignorata:', row);
    return null;
  }

  const id = String(row.id);
  const title = String(row.title);
  
  // Validazione subject
  const validSubjects: Risorsa['subject'][] = ['Fisica', 'Matematica', 'Metodo di Studio'];
  const subject = validSubjects.includes(row.subject as Risorsa['subject'])
    ? (row.subject as Risorsa['subject'])
    : 'Metodo di Studio';

  // Validazione type
  const type: 'Video' | 'PDF' = 
    (row.type === 'Video' || row.type === 'video') ? 'Video' : 'PDF';

  // Costruzione URL con validazione
  let url = '';
  if (row.url && typeof row.url === 'string' && row.url.trim()) {
    url = row.url.trim();
  } else if (type === 'PDF' && row.file_path && typeof row.file_path === 'string') {
    const filePath = String(row.file_path).trim();
    if (SUPABASE_URL && filePath) {
      url = `${SUPABASE_URL}/storage/v1/object/public/resources/${filePath}`;
    }
  } else if (row.external_url && typeof row.external_url === 'string') {
    url = String(row.external_url).trim();
  }

  // Se non abbiamo un URL valido, la risorsa non è utilizzabile
  if (!url) {
    console.warn('Risorsa senza URL valido ignorata:', { id, title });
    return null;
  }

  return {
    id,
    title,
    subject,
    type,
    description: row.description ? String(row.description) : '',
    url,
  };
}

export const resourceService = {
  /**
   * Ottiene tutte le risorse pubbliche dalla tabella "Resources".
   * Mappa i campi del DB ai nomi utilizzati nel frontend.
   * @param signal - AbortSignal opzionale per cancellare la richiesta
   */
  async getAll(signal?: AbortSignal): Promise<Risorsa[]> {
    // Validazione variabili d'ambiente
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      throw new Error(
        'Configurazione Supabase mancante. Verifica le variabili d\'ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.'
      );
    }

    try {
      const response = await fetchWithTimeout(
        `${SUPABASE_URL}/rest/v1/resources?select=*&order=title.asc`,
        {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json'
          },
          signal,
        }
      );

      if (!response.ok) {
        let errorMessage = 'Errore nel recupero delle risorse';
        try {
          const err = await response.json();
          errorMessage = err.message || errorMessage;
        } catch {
          // Se la risposta non è JSON, usa il messaggio di default
          errorMessage = `Errore HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const rows = await response.json();

      // Validazione e mappatura con filtraggio di dati invalidi
      const resources = rows
        .map((row: Record<string, unknown>) => validateAndMapResource(row))
        .filter((resource: Risorsa | null): resource is Risorsa => resource !== null);

      return resources;
    } catch (error: unknown) {
      console.error("Errore recupero risorse:", error);
      
      // Messaggi di errore più specifici
      if (error instanceof Error) {
        if (error.name === 'AbortError' || error.message.includes('timeout')) {
          throw new Error('Timeout: il server non risponde. Verifica la connessione.');
        }
        throw error;
      }
      throw new Error('Errore sconosciuto durante il recupero delle risorse');
    }
  }
};
