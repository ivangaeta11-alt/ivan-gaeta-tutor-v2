import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { mapAuthError } from "../../lib/auth/errors";
import { fetchProfileAndRoles } from "../../lib/auth/userData";
import { isSupabaseConfigured, supabase } from "../../lib/supabase/client";
import type { Profile } from "../../types/supabase/database.types";
import type { UserRole } from "../../types/roles";

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  roles: UserRole[];
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  const applyUserData = useCallback(
    async (user: User | null | undefined) => {
      if (!user) {
        setProfile(null);
        setRoles([]);
        return;
      }
      const data = await fetchProfileAndRoles(user.id);
      setProfile(data.profile);
      setRoles(data.roles);
    },
    []
  );

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    let active = true;

    const init = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!active) return;

      if (error) {
        console.error("Errore sessione:", error.message);
      }

      setSession(data.session);
      await applyUserData(data.session?.user);
      if (active) setLoading(false);
    };

    void init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      await applyUserData(nextSession?.user);
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [applyUserData]);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      return {
        error:
          "Servizio di accesso non configurato. Contatta l'amministratore del sito.",
      };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      return { error: mapAuthError(error.message) };
    }

    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
    setRoles([]);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      roles,
      loading,
      signIn,
      signOut,
    }),
    [session, profile, roles, loading, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve essere usato dentro AuthProvider");
  }
  return context;
}
