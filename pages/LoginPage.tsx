import React from "react";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auth reale non ancora implementata
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
          onSubmit={handleSubmit}
          className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-5"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
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
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-900/20"
          >
            Accedi
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

        {/* Demo only — remove when real auth lands */}
        <div className="mt-12 p-6 rounded-3xl border border-dashed border-amber-200 bg-amber-50/40">
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-800 mb-2">
            Accesso demo
          </h2>
          <p className="text-xs text-amber-700/80 font-light mb-5 leading-relaxed">
            Solo per sviluppo e test. Verrà rimosso con l&apos;autenticazione reale.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/area-personale/studente"
              onClick={() => window.scrollTo({ top: 0 })}
              className="w-full text-center py-3 rounded-xl bg-white border border-slate-200 font-semibold text-slate-800 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Entra come studente
            </Link>
            <Link
              to="/area-personale/promoter"
              onClick={() => window.scrollTo({ top: 0 })}
              className="w-full text-center py-3 rounded-xl bg-white border border-slate-200 font-semibold text-slate-800 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Entra come promoter
            </Link>
            <Link
              to="/area-personale/tutor"
              onClick={() => window.scrollTo({ top: 0 })}
              className="w-full text-center py-3 rounded-xl bg-white border border-slate-200 font-semibold text-slate-800 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Entra come tutor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
