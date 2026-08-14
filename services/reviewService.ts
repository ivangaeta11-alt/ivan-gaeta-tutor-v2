import type { Review, ReviewCreate } from '../types/review';

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

function mapRow(row: Record<string, unknown>): Review {
  return {
    id: String(row.id ?? ''),
    author_name: String(row.author_name ?? ''),
    rating: Number(row.rating) || 0,
    content: String(row.content ?? ''),
    approved: Boolean(row.approved),
    created_at: String(row.created_at ?? ''),
    subject: row.subject != null ? String(row.subject) : null,
  };
}

export const reviewService = {
  /** Recensioni approvate, ordinate per data (più recenti prima) */
  async getApproved(signal?: AbortSignal): Promise<Review[]> {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      throw new Error(
        'Configurazione Supabase mancante. Verifica VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.'
      );
    }
    const url = `${SUPABASE_URL}/rest/v1/reviews?approved=eq.true&order=created_at.desc&select=*`;
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      signal,
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error((err as { message?: string }).message ?? `Errore ${response.status}`);
    }
    const rows = await response.json();
    return (Array.isArray(rows) ? rows : []).map((r: Record<string, unknown>) => mapRow(r));
  },

  /** Invia una nuova recensione (sarà visibile dopo approvazione) */
  async create(data: ReviewCreate): Promise<Review> {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      throw new Error(
        'Configurazione Supabase mancante. Verifica VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.'
      );
    }
    const body: Record<string, unknown> = {
      author_name: data.author_name.trim(),
      rating: Math.min(5, Math.max(1, data.rating)),
      content: data.content.trim(),
    };
    if (data.subject != null && data.subject !== '') {
      body.subject = data.subject;
    }
    const response = await fetchWithTimeout(`${SUPABASE_URL}/rest/v1/reviews`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error((err as { message?: string }).message ?? `Errore ${response.status}`);
    }
    const rows = await response.json();
    const one = Array.isArray(rows) ? rows[0] : rows;
    return mapRow(one ?? body);
  },
};
