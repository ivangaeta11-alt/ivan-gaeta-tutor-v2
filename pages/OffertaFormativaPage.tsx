import React from "react";
import AmbitoTiles from "../features/offerta/AmbitoTiles";

const OffertaFormativaPage: React.FC = () => {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-slate-50/70 to-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Offerta formativa
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
            Percorsi di Matematica e Fisica pensati per obiettivi e livelli diversi.
          </p>
          <div className="h-1 w-14 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-auto mt-6" />
        </div>

        <AmbitoTiles />
      </div>
    </section>
  );
};

export default OffertaFormativaPage;
