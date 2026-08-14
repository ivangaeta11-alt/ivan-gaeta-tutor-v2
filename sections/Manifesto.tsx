
import React from 'react';
import { Quote } from 'lucide-react';

const Manifesto: React.FC = () => {
  return (
    <section className="pt-8 pb-8 md:pt-10 md:pb-10 bg-white px-6 relative overflow-hidden">
      {/* Elementi decorativi di sfondo per coerenza visiva */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-4xl mx-auto">
        {/* Header della sezione - Centrato come Method e Features */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            La mia visione didattica
          </h2>
          <div className="h-1 w-12 bg-indigo-500 rounded-full mx-auto"></div>
        </div>

        <div className="relative text-center">
          {/* Icone Quote come elementi grafici discreti */}
          <div className="flex justify-center mb-8">
            <Quote size={48} className="text-blue-100 rotate-180" strokeWidth={1.5} />
          </div>

          <div className="space-y-8 max-w-3xl mx-auto">
            <p className="text-xl md:text-3xl text-slate-700 leading-tight font-light italic">
              "Ogni concetto è comprensibile, con i giusti modelli mentali. Il mio lavoro consiste nel fornirti gli strumenti per arrivare, nel modo più efficiente possibile, dove arriveresti comunque con le tue forze, ma limitando al massimo la frustrazione."
            </p>
            
            <div className="h-px w-16 bg-slate-100 mx-auto"></div>

            <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-light">
              L'obiettivo non è solo superare l'esame, ma acquisire basi solide e sviluppare un 
              <span className="text-blue-600 font-medium"> ragionamento scientifico efficace</span> che 
              diventi uno strumento permanente nel tuo percorso accademico e professionale.
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <Quote size={48} className="text-blue-50" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
