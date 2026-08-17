import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../types/supabase/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "Supabase non configurato: imposta VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY in .env.local"
  );
}

export const supabase = createClient<Database>(
  supabaseUrl ?? "",
  supabaseKey ?? "",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseKey);
}
