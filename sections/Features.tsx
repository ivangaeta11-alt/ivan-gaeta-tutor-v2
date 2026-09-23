import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
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

        <div className="mt-12 flex justify-center">
          <Link
            to="/offerta-formativa"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 px-7 py-4 text-[15px] font-bold text-blue-600 bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200"
          >
            <span>Vedi tutta l'offerta formativa</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
