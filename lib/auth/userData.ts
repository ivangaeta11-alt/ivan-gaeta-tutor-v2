import { supabase } from "../supabase/client";
import type { Profile } from "../../types/supabase/database.types";
import type { UserRole } from "../../types/roles";

export async function fetchProfileAndRoles(userId: string): Promise<{
  profile: Profile | null;
  roles: UserRole[];
}> {
  const [profileResult, rolesResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
    supabase.from("user_roles").select("role").eq("user_id", userId),
  ]);

  if (profileResult.error) {
    console.error("Errore caricamento profilo:", profileResult.error.message);
  }
  if (rolesResult.error) {
    console.error("Errore caricamento ruoli:", rolesResult.error.message);
  }

  return {
    profile: profileResult.data ?? null,
    roles: (rolesResult.data ?? []).map((row) => row.role as UserRole),
  };
}
