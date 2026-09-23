import React from "react";
import AmbitoTiles from "../features/offerta/AmbitoTiles";

const Features: React.FC = () => {
  return (
    <section id="servizi" className="pt-10 pb-10 md:pt-12 md:pb-12 bg-gradient-to-b from-slate-50/70 to-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Ambiti di intervento</h2>
          <div className="h-1 w-14 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-auto" />
        </div>

        <AmbitoTiles />
      </div>
    </section>
  );
};

export default Features;
