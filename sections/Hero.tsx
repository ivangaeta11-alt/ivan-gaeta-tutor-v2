
import React from 'react';
import { ArrowRight, MessageCircle, GraduationCap, BookOpen } from 'lucide-react';

interface HeroProps {
  onNavigateRisorse: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateRisorse }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-28 pb-6 lg:pt-36 lg:pb-8 overflow-hidden bg-white">
      {/* Sfondo con gradiente soft */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/80 via-white to-white" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[480px] bg-gradient-to-b from-blue-100/40 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge Tutor STEM */}
        <div className="mb-12 flex flex-col items-center">
          <div className="mb-6 inline-flex items-center px-5 py-2 rounded-full bg-blue-50/90 border border-blue-100 text-blue-700 shadow-sm gap-2 ring-1 ring-blue-50">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold">Tutor STEM</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
          Percorsi strutturati in <br />
          <span className="gradient-text">Matematica e Fisica</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 font-light max-w-3xl mx-auto mb-8 leading-relaxed">
          Studio STEM guidato per il <span className="font-semibold text-slate-700">semestre filtro</span> di Medicina, i test <span className="font-semibold text-slate-700">TOLC</span>, <br className="hidden md:block" />
          i primi anni delle facoltà scientifiche e <span className="font-semibold text-slate-700">gli studenti delle superiori</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <a 
            href="#contatti" 
            onClick={(e) => scrollToSection(e, 'contatti')}
            className="hero-cta inline-flex items-center justify-center w-full sm:w-[320px] h-14 px-6 text-lg font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/25 group transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
          >
            <MessageCircle className="mr-2 w-5 h-5 text-emerald-200 shrink-0 group-hover:scale-105 transition-transform" />
            <span>Prenota una consulenza</span>
            <ArrowRight className="ml-2 w-5 h-5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <button 
            onClick={onNavigateRisorse}
            className="hero-cta inline-flex items-center justify-center w-full sm:w-[320px] h-14 px-6 text-lg font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/25 group transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
          >
            <BookOpen className="mr-2 w-5 h-5 text-emerald-200 shrink-0 group-hover:scale-105 transition-transform" />
            <span>Risorse gratuite</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
