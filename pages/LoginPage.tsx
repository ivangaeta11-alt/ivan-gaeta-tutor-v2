import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthProvider";
import { fetchProfileAndRoles } from "../lib/auth/userData";
import { supabase } from "../lib/supabase/client";
import { getPostLoginPath } from "../types/roles";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await signIn(email, password);
    if (result.error) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;

    if (!userId) {
      setError("Accesso non riuscito. Riprova.");
      setSubmitting(false);
      return;
    }

    const { roles } = await fetchProfileAndRoles(userId);
    navigate(getPostLoginPath(roles), { replace: true });
    setSubmitting(false);
  };

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 bg-gradient-to-b from-slate-50/80 to-white min-h-[70vh]">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Accedi alla tua area personale
          </h1>
          <p className="text-slate-500 font-light leading-relaxed">
            Studenti e collaboratori possono accedere da qui alla propria area riservata.
          </p>
          <div className="h-1 w-14 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-auto mt-6" />
        </div>

        <form
          onSubmit={(e) => void handleSubmit(e)}
          className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-5"
        >
          {error && (
            <div
              role="alert"
              className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@email.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-900/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Accesso in corso…" : "Accedi"}
          </button>
        </form>

        <div className="mt-6 space-y-3 text-center text-sm">
          <p>
            <Link to="/registrazione" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Sei uno studente? Crea un account
            </Link>
          </p>
          <p>
            <Link to="/collabora" className="font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              Vuoi collaborare? Scopri come
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
