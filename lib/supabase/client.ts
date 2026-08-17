import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../types/supabase/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.VITE_SUPABASE_ANON_KEY;

let client: SupabaseClient<Database> | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseKey);
}

function getSupabaseClient(): SupabaseClient<Database> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase non configurato: imposta VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY."
    );
  }

  if (!client) {
    client = createClient<Database>(supabaseUrl!, supabaseKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return client;
}

/**
 * Client lazy: non crasha all'avvio se le variabili env mancano
 * (es. build di produzione senza VITE_* o .env.local assente in locale).
 */
export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop) {
    const instance = getSupabaseClient();
    const value = instance[prop as keyof SupabaseClient<Database>];
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(instance)
      : value;
  },
});

if (!isSupabaseConfigured()) {
  console.warn(
    "Supabase non configurato: imposta VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY in .env.local (dev) o nelle variabili del hosting (produzione)."
  );
}
