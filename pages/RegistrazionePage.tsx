import React from "react";
import { Link } from "react-router-dom";

const RegistrazionePage: React.FC = () => {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 bg-gradient-to-b from-slate-50/80 to-white min-h-[60vh]">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Registrazione studente
        </h1>
        <p className="text-slate-500 font-light leading-relaxed text-lg mb-8">
          La registrazione online sarà disponibile a breve.
        </p>
        <div className="h-1 w-14 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-auto mb-10" />
        <Link
          to="/login"
          className="inline-flex font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Torna all&apos;accesso
        </Link>
      </div>
    </section>
  );
};

export default RegistrazionePage;
