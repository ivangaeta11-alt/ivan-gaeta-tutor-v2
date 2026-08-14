import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ambiti } from "./ambiti";

const AmbitoTiles: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {ambiti.map((f) => {
        const Icon = f.icon;
        return (
          <Link
            key={f.slug}
            to={f.path}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group relative block p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border transition-transform duration-300 group-hover:scale-105 ${f.accent}`}
            >
              <Icon className="w-6 h-6" />
            </div>

            <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
              {f.tileTitle}
            </h4>

            <p className="text-slate-500 leading-relaxed font-light text-[17px] mb-8">
              {f.description}
            </p>

            <div className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
              <span>Chiedi informazioni</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>

            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
              <div
                className={`w-12 h-12 rounded-full border-4 border-current ${
                  f.color === "blue"
                    ? "text-blue-200"
                    : f.color === "emerald"
                      ? "text-emerald-200"
                      : f.color === "indigo"
                        ? "text-indigo-200"
                        : "text-amber-200"
                }`}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AmbitoTiles;
