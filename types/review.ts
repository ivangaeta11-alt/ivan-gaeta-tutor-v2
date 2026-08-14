/** Campi della tabella Supabase `reviews` esistente */
export interface Review {
  id: string;
  author_name: string;
  rating: number;
  content: string;
  approved: boolean;
  created_at: string;
  /** Aggiungi con: ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS subject TEXT; */
  subject?: string | null;
}

export interface ReviewCreate {
  author_name: string;
  rating: number;
  content: string;
  /** Materia scritta liberamente dall'utente */
  subject?: string | null;
}
