import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/AuthProvider";

const AccountPendingPage: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 bg-gradient-to-b from-slate-50/80 to-white min-h-[70vh]">
      <div className="max-w-lg mx-auto text-center">
        <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <h1 className="text-2xl font-extrabold text-slate-900 mb-3">
            Account in attesa di abilitazione
          </h1>
          <p className="text-slate-500 font-light leading-relaxed mb-2">
            Il tuo account{" "}
            <span className="font-medium text-slate-700">{user?.email}</span> è
            stato creato correttamente, ma non ha ancora un ruolo assegnato.
          </p>
          <p className="text-slate-500 font-light leading-relaxed mb-8">
            Contatta l&apos;amministratore per l&apos;abilitazione. Riceverai
            accesso all&apos;area personale non appena un ruolo sarà associato
            al tuo profilo.
          </p>
          <button
            type="button"
            onClick={() => void signOut()}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-colors"
          >
            Esci
          </button>
        </div>
        <p className="mt-6 text-sm text-slate-400">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            ← Torna alla home
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AccountPendingPage;
