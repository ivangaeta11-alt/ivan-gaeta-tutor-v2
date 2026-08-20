
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
    <section className="relative pt-24 pb-4 lg:pt-28 lg:pb-5 overflow-hidden bg-white">
      {/* Sfondo con gradiente soft */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/80 via-white to-white" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[480px] bg-gradient-to-b from-blue-100/40 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(410px,480px)] lg:gap-x-16 xl:gap-x-20 lg:gap-y-0 lg:items-center">
          {/* Badge */}
          <div className="order-1 lg:col-start-1 lg:row-start-1 flex justify-center lg:justify-start mb-4 sm:mb-5 lg:mb-5">
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-blue-50/90 border border-blue-100 text-blue-700 shadow-sm gap-2 ring-1 ring-blue-50">
              <GraduationCap className="w-4 h-4 text-blue-600" aria-hidden />
              <span className="text-sm font-semibold">Tutor STEM</span>
            </div>
          </div>

          {/* Titolo */}
          <h1 className="order-2 lg:col-start-1 lg:row-start-2 max-w-4xl mx-auto lg:mx-0 text-center lg:text-left text-[2.125rem] sm:text-5xl lg:text-[3.75rem] font-extrabold text-slate-900 leading-[1.08] mb-5 sm:mb-6 tracking-tight">
            Percorsi strutturati in <br className="hidden lg:block" />
            <span className="gradient-text">Matematica e Fisica</span>
          </h1>

          {/* Sottotitolo */}
          <p className="order-3 lg:col-start-1 lg:row-start-3 text-lg sm:text-xl lg:text-2xl text-slate-500 font-light max-w-3xl mx-auto lg:mx-0 text-center lg:text-left mb-7 sm:mb-8 leading-relaxed">
            Percorsi guidati di Matematica e Fisica per il{' '}
            <span className="font-semibold text-slate-700">semestre filtro</span> di Medicina, i test{' '}
            <span className="font-semibold text-slate-700">TOLC</span>, l&apos;università e le scuole superiori.
          </p>

          {/* CTA */}
          <div className="order-4 lg:col-start-1 lg:row-start-4 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center max-w-md sm:max-w-none mx-auto lg:mx-0">
            <a
              href="#contatti"
              onClick={(e) => scrollToSection(e, 'contatti')}
              className="hero-cta inline-flex items-center justify-center w-full sm:w-[320px] h-14 px-6 text-lg font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/25 group transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <MessageCircle className="mr-2 w-5 h-5 text-emerald-200 shrink-0 group-hover:scale-105 transition-transform" aria-hidden />
              <span>Prenota una consulenza</span>
              <ArrowRight className="ml-2 w-5 h-5 shrink-0 group-hover:translate-x-0.5 transition-transform" aria-hidden />
            </a>
            <button
              type="button"
              onClick={onNavigateRisorse}
              className="hero-cta inline-flex items-center justify-center w-full sm:w-[320px] h-14 px-6 text-lg font-bold text-blue-600 bg-white border-2 border-blue-600 rounded-2xl hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 transition-all duration-300 group transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <BookOpen className="mr-2 w-5 h-5 text-blue-600 shrink-0 group-hover:scale-105 transition-transform" aria-hidden />
              <span>Esplora le risorse gratuite</span>
            </button>
          </div>

          {/* Fotografia */}
          <div className="order-5 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-end-5 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[440px] lg:w-[440px] shrink-0">
              <div
                className="absolute -inset-3 sm:-inset-4 bg-gradient-to-br from-blue-200/35 via-emerald-100/25 to-teal-100/30 rounded-[1.75rem] blur-2xl -z-10"
                aria-hidden
              />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200/70 shadow-lg shadow-slate-900/[0.07]">
                <img
                  src="/homepage_pic.png"
                  alt="Ivan Gaeta, tutor di Matematica e Fisica"
                  width={1122}
                  height={1402}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Fascia di fiducia */}
          <div
            className="order-6 lg:col-span-2 lg:row-start-5 mt-8 sm:mt-10 pt-6 sm:pt-7 border-t border-slate-100"
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
