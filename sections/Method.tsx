
import React from 'react';
import { ShieldCheck, Repeat, Binary, UserCircle } from 'lucide-react';

const methods = [
  {
    title: "Rigore e Logica",
    description: "Insegnare non significa trasmettere formule, ma fornire gli strumenti per derivarle. Durante il percorso, ogni concetto viene scomposto nelle sue basi logiche per eliminare lo studio a memoria, tipico delle preparazioni frettolose.",
    icon: <Binary className="w-6 h-6 text-blue-600" />
  },
  {
    title: "Continuità Didattica",
    description: "Non offro lezioni isolate o interventi d'emergenza. Propongo percorsi di accompagnamento volti a sviluppare un'autonomia di pensiero che resti utile allo studente anche dopo il superamento dell'ostacolo immediato.",
    icon: <Repeat className="w-6 h-6 text-blue-600" />
  },
  {
    title: "La Prospettiva della Fisica",
    description: "In qualità di studente magistrale in Fisica, applico la metodologia della ricerca e del problem solving scientifico alla didattica. Questo permette di affrontare anche i problemi meno convenzionali dei test.",
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />
  },
  {
    title: "Personalizzazione",
    description: "Ogni studente ha un background differente. Il primo colloquio serve a individuare le lacune pregresse e a definire un calendario realistico e commisurato agli obiettivi accademici prefissati.",
    icon: <UserCircle className="w-6 h-6 text-blue-600" />
  }
];

const Method: React.FC = () => {
  return (
    <section id="metodo" className="pt-10 pb-10 md:pt-12 md:pb-12 bg-white px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Il metodo di lavoro</h2>
          <div className="h-1 w-12 bg-blue-600 rounded-full mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {methods.map((m, i) => (
            <div key={i} className="group p-8 rounded-3xl border border-slate-100 bg-slate-50/20 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-50 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {m.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{m.title}</h3>
              <p className="text-slate-500 leading-relaxed font-light text-lg">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Method;
