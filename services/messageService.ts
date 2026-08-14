const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const FETCH_TIMEOUT = 10000;

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number = FETCH_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
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

export interface MessageCreate {
  nome: string;
  email: string;
  obiettivo: string;
  messaggio: string;
}

export const messageService = {
  /** Invia un messaggio dal form di contatto (inserisce in messages) */
  async send(data: MessageCreate): Promise<void> {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      throw new Error(
        'Configurazione Supabase mancante. Verifica VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.'
      );
    }
    const body = {
      nome: data.nome.trim(),
      email: data.email.trim(),
      obiettivo: data.obiettivo.trim(),
      messaggio: data.messaggio.trim(),
    };
    const response = await fetchWithTimeout(`${SUPABASE_URL}/rest/v1/messages`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error((err as { message?: string }).message ?? `Errore ${response.status}`);
    }
  },
};
