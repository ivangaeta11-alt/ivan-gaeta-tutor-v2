
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

/** Intrinsic size of public/homepage_pic_transparent.png */
const PORTRAIT_WIDTH = 1254;
const PORTRAIT_HEIGHT = 1254;

const Hero: React.FC<HeroProps> = ({ onNavigateRisorse }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 pb-4 min-[1180px]:pt-[5.5rem] min-[1180px]:pb-5 overflow-x-hidden bg-white">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/70 via-white to-white" />
      <div className="absolute top-8 left-[18%] w-[520px] h-[420px] bg-blue-100/35 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-16 right-[12%] w-[380px] h-[380px] bg-teal-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="min-[1180px]:w-fit min-[1180px]:max-w-full min-[1180px]:mx-auto">
          <div className="flex flex-col min-[1180px]:flex-row min-[1180px]:items-center min-[1180px]:justify-center min-[1180px]:gap-10 xl:gap-14 gap-y-8">
            {/* Gruppo testuale */}
            <div className="flex flex-col items-center min-[1180px]:items-start text-center min-[1180px]:text-left min-[1180px]:max-w-[34rem] shrink-0">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-100/80 text-blue-700 shadow-sm gap-2 mb-7">
                <GraduationCap className="w-4 h-4 text-blue-600" aria-hidden />
                <span className="text-sm font-semibold tracking-wide">Tutor STEM</span>
              </div>

              <h1 className="text-[2.125rem] sm:text-[2.75rem] min-[1180px]:text-[3.25rem] font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
                Percorsi strutturati in <br className="hidden min-[1180px]:block" />
                <span className="gradient-text">Matematica e Fisica</span>
              </h1>

              <p className="text-lg sm:text-xl min-[1180px]:text-[1.35rem] text-slate-500 font-light max-w-xl min-[1180px]:max-w-[31rem] mb-8 leading-[1.65]">
                Percorsi guidati di Matematica e Fisica per il{' '}
                <span className="font-semibold text-slate-700">semestre filtro</span> di Medicina, i test{' '}
                <span className="font-semibold text-slate-700">TOLC</span>, l&apos;università e le scuole superiori.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center min-[1180px]:justify-start w-full sm:w-auto">
                <a
                  href="#contatti"
                  onClick={(e) => scrollToSection(e, 'contatti')}
                  className="hero-cta inline-flex items-center justify-center h-[3.25rem] px-5 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md shadow-blue-900/15 hover:shadow-lg hover:shadow-blue-900/20 group transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap w-full max-w-sm mx-auto sm:mx-0 sm:w-auto"
                >
                  <MessageCircle className="mr-2 w-5 h-5 text-emerald-200 shrink-0 group-hover:scale-105 transition-transform" aria-hidden />
                  <span>Prenota una consulenza</span>
                  <ArrowRight className="ml-2 w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                </a>
                <button
                  type="button"
                  onClick={onNavigateRisorse}
                  className="hero-cta inline-flex items-center justify-center h-[3.25rem] px-5 text-base font-bold text-blue-600 bg-white border-2 border-blue-600/90 rounded-xl hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 transition-all duration-300 group transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap w-full max-w-sm mx-auto sm:mx-0 sm:w-auto"
                >
                  <BookOpen className="mr-2 w-5 h-5 text-blue-600 shrink-0 group-hover:scale-105 transition-transform" aria-hidden />
                  <span>Esplora le risorse gratuite</span>
                </button>
              </div>
            </div>

            {/* Ritratto */}
            <div className="flex justify-center min-[1180px]:justify-start shrink-0 mt-2 min-[1180px]:mt-0">
              <div className="hero-portrait">
                <div className="hero-portrait-background" aria-hidden />
                <img
                  className="hero-portrait-subject"
                  src={`${import.meta.env.BASE_URL}homepage_pic_transparent.png`}
                  alt="Ivan Gaeta, tutor di Matematica e Fisica"
                  width={PORTRAIT_WIDTH}
                  height={PORTRAIT_HEIGHT}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Fascia di fiducia */}
          <div
            className="mt-7 sm:mt-8 pt-5 border-t border-slate-200/70"
            aria-label="Punti di forza"
          >
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-5 min-[1180px]:gap-7 text-sm text-slate-600">
              {TRUST_ITEMS.map(({ icon: Icon, label }, index) => (
                <React.Fragment key={label}>
                  {index > 0 && (
                    <span
                      className="hidden sm:inline-block w-px h-3.5 bg-slate-200/90 shrink-0"
                      aria-hidden
                    />
                  )}
                  <span className="inline-flex items-center gap-2">
                    <Icon className="w-4 h-4 text-blue-600/90 shrink-0" aria-hidden />
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
