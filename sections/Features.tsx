
import React from 'react';
import { Microscope, PencilRuler, GraduationCap, School, ArrowUpRight } from 'lucide-react';

interface FeaturesProps {
  onNavigate: () => void;
}

const features = [
  {
    title: "Semestre Filtro Medicina",
    description: "Preparazione specifica per il modulo di Fisica. Superiamo gli sbarramenti del primo anno con esercizi mirati e ripasso teorico strutturato.",
    icon: <Microscope className="w-6 h-6" />,
    color: "blue",
    accent: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    title: "Preparazione TOLC",
    description: "Logica, Matematica e Fisica per i test d'ingresso (MED, VET, S, I). Strategie di risoluzione rapida per massimizzare il punteggio.",
    icon: <PencilRuler className="w-6 h-6" />,
    color: "emerald",
    accent: "bg-emerald-50 text-emerald-600 border-emerald-100"
  },
  {
    title: "Esami Universitari",
    description: "Analisi I e II, Fisica Generale e Statistica. Supporto per facoltà STEM con un focus rigoroso sul metodo di studio scientifico.",
    icon: <GraduationCap className="w-6 h-6" />,
    color: "indigo",
    accent: "bg-indigo-50 text-indigo-600 border-indigo-100"
  },
  {
    title: "Studenti delle superiori",
    description: "Supporto in Matematica e Fisica per tutto il percorso delle superiori. Consolidamento delle basi e preparazione alla maturità e ai test d'ingresso universitari.",
    icon: <School className="w-6 h-6" />,
    color: "amber",
    accent: "bg-amber-50 text-amber-600 border-amber-100"
  }
];

const Features: React.FC<FeaturesProps> = ({ onNavigate }) => {
  return (
    <section id="servizi" className="pt-10 pb-10 md:pt-12 md:pb-12 bg-gradient-to-b from-slate-50/70 to-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Ambiti di intervento</h2>
          <div className="h-1 w-14 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="group relative p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={onNavigate}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border transition-transform duration-300 group-hover:scale-105 ${f.accent}`}>
                {f.icon}
              </div>
              
              <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                {f.title}
              </h4>
              
              <p className="text-slate-500 leading-relaxed font-light text-[17px] mb-8">
                {f.description}
              </p>

              <div className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                <span>Chiedi informazioni</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              {/* Elemento decorativo discreto nell'angolo */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                 <div className={`w-12 h-12 rounded-full border-4 border-current ${f.color === 'blue' ? 'text-blue-200' : f.color === 'emerald' ? 'text-emerald-200' : f.color === 'indigo' ? 'text-indigo-200' : 'text-amber-200'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
