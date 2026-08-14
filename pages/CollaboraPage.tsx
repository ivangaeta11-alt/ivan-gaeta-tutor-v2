import React from "react";
import { Link } from "react-router-dom";

const CollaboraPage: React.FC = () => {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 bg-gradient-to-b from-slate-50/80 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Collabora con me
          </h1>
          <p className="text-lg text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
            Puoi contribuire alla crescita del progetto come promoter oppure come tutor.
          </p>
          <div className="h-1 w-14 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div
            id="promoter"
            className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border bg-emerald-50 text-emerald-600 border-emerald-100 text-xl font-bold">
              P
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Promoter</h2>
            <p className="text-slate-500 leading-relaxed font-light text-[17px] mb-8">
              Promuovi i percorsi formativi e ricevi una commissione sugli studenti acquisiti tramite il tuo referral.
            </p>
            <a
              href="#promoter"
              onClick={scrollTo("promoter")}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Scopri il ruolo
            </a>
          </div>

          <div
            id="tutor"
            className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border bg-blue-50 text-blue-600 border-blue-100 text-xl font-bold">
              T
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Tutor</h2>
            <p className="text-slate-500 leading-relaxed font-light text-[17px] mb-8">
              Collabora nell&apos;erogazione delle lezioni seguendo studenti o gruppi assegnati.
            </p>
            <a
              href="#tutor"
              onClick={scrollTo("tutor")}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Scopri il ruolo
            </a>
          </div>
        </div>

        <p className="text-center text-slate-500 font-light leading-relaxed max-w-2xl mx-auto mb-8">
          L&apos;accesso effettivo come promoter o tutor richiede approvazione. La candidatura e
          l&apos;onboarding saranno disponibili nelle prossime versioni.
        </p>

        <p className="text-center">
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Torna all&apos;accesso
          </Link>
        </p>
      </div>
    </section>
  );
};

export default CollaboraPage;
