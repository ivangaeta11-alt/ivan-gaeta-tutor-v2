
import React from 'react';
import { ArrowRight, MessageCircle, GraduationCap, BookOpen, Users, Layers, FileText } from 'lucide-react';

interface HeroProps {
  onNavigateRisorse: () => void;
}

const TRUST_ITEMS = [
  { icon: Users, label: '30+ studenti seguiti' },
  { icon: Layers, label: 'Percorsi individuali e di gruppo' },
  { icon: FileText, label: 'Materiali ed esercizi inclusi' },
] as const;

const Hero: React.FC<HeroProps> = ({ onNavigateRisorse }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 pb-3 lg:pt-24 lg:pb-4 overflow-hidden bg-white">
      {/* Sfondo con gradiente soft */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/80 via-white to-white" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[480px] bg-gradient-to-b from-blue-100/40 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-12 xl:gap-x-16 lg:items-center">
          {/* Gruppo testuale compatto */}
          <div className="order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-blue-50/90 border border-blue-100 text-blue-700 shadow-sm gap-2 ring-1 ring-blue-50 mb-8">
              <GraduationCap className="w-4 h-4 text-blue-600" aria-hidden />
              <span className="text-sm font-semibold">Tutor STEM</span>
            </div>

            <h1 className="text-[2.125rem] sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 leading-[1.08] mb-10 tracking-tight">
              Percorsi strutturati in <br className="hidden lg:block" />
              <span className="gradient-text">Matematica e Fisica</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-slate-500 font-light max-w-xl lg:max-w-[32rem] mb-9 leading-relaxed">
              Percorsi guidati di Matematica e Fisica per il{' '}
              <span className="font-semibold text-slate-700">semestre filtro</span> di Medicina, i test{' '}
              <span className="font-semibold text-slate-700">TOLC</span>, l&apos;università e le scuole superiori.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start w-full sm:w-auto">
              <a
                href="#contatti"
                onClick={(e) => scrollToSection(e, 'contatti')}
                className="hero-cta inline-flex items-center justify-center h-14 px-5 text-lg font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/25 group transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap w-full max-w-sm mx-auto sm:mx-0 sm:w-auto"
              >
                <MessageCircle className="mr-2 w-5 h-5 text-emerald-200 shrink-0 group-hover:scale-105 transition-transform" aria-hidden />
                <span>Prenota una consulenza</span>
                <ArrowRight className="ml-2 w-5 h-5 shrink-0 group-hover:translate-x-0.5 transition-transform" aria-hidden />
              </a>
              <button
                type="button"
                onClick={onNavigateRisorse}
                className="hero-cta inline-flex items-center justify-center h-14 px-5 text-lg font-bold text-blue-600 bg-white border-2 border-blue-600 rounded-2xl hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 transition-all duration-300 group transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap w-full max-w-sm mx-auto sm:mx-0 sm:w-auto"
              >
                <BookOpen className="mr-2 w-5 h-5 text-blue-600 shrink-0 group-hover:scale-105 transition-transform" aria-hidden />
                <span>Esplora le risorse gratuite</span>
              </button>
            </div>
          </div>

          {/* Fotografia */}
          <div className="order-2 flex justify-center lg:justify-end mt-8 lg:mt-0 lg:self-center">
            <div className="w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[460px] aspect-[4/5] max-h-[65vh] rounded-[30px] overflow-hidden border border-slate-200/50 shadow-md shadow-slate-900/[0.06]">
              <img
                src="/homepage_pic.png"
                alt="Ivan Gaeta, tutor di Matematica e Fisica"
                width={1122}
                height={1402}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-[center_18%]"
              />
            </div>
          </div>

          {/* Fascia di fiducia */}
          <div
            className="order-3 lg:col-span-2 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100"
            aria-label="Punti di forza"
          >
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 lg:gap-8 text-sm text-slate-600">
              {TRUST_ITEMS.map(({ icon: Icon, label }, index) => (
                <React.Fragment key={label}>
                  {index > 0 && (
                    <span
                      className="hidden sm:inline-block w-px h-4 bg-slate-200 shrink-0"
                      aria-hidden
                    />
                  )}
                  <span className="inline-flex items-center gap-2">
                    <Icon className="w-4 h-4 text-blue-600 shrink-0" aria-hidden />
                    <span>{label}</span>
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
