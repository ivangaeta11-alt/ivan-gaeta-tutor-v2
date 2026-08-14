import React from "react";
import type { Ambito } from "../features/offerta/ambiti";

interface AmbitoPageProps {
  ambito: Ambito;
  onContact: () => void;
}

const AmbitoPage: React.FC<AmbitoPageProps> = ({ ambito, onContact }) => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 px-6 bg-gradient-to-b from-slate-50/80 via-white to-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {ambito.pageTitle}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed">
            {ambito.intro}
          </p>
          <div className="h-1 w-14 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-auto mt-8" />
        </div>
      </section>

      {/* Metodologia */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Metodologia
          </h2>
          <p className="text-slate-500 leading-relaxed font-light text-lg">
            Contenuto in preparazione. Qui verrà descritto il metodo di lavoro specifico per questo ambito:
            struttura del percorso, approccio allo studio e modalità di accompagnamento.
          </p>
        </div>
      </section>

      {/* Offerta */}
      <section className="py-12 md:py-16 px-6 bg-slate-50/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Offerta
          </h2>
          <p className="text-slate-500 leading-relaxed font-light text-lg">
            Contenuto in preparazione. In questa sezione verranno distinte le modalità disponibili
            (ad esempio lezioni individuali, gruppi o pacchetti) e cosa include ciascun percorso.
          </p>
        </div>
      </section>

      {/* Prezzi */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Prezzi
          </h2>
          <p className="text-slate-500 leading-relaxed font-light text-lg">
            Contenuto in preparazione. Qui verranno indicati i riferimenti di prezzo e le eventuali
            formule di pacchetto per questo ambito.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 px-6 bg-gradient-to-b from-white to-slate-50/70">
        <div className="max-w-3xl mx-auto text-center">
          <button
            type="button"
            onClick={onContact}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all duration-200 shadow-md shadow-blue-900/20"
          >
            Chiedi informazioni
          </button>
        </div>
      </section>
    </div>
  );
};

export default AmbitoPage;
