
import React from 'react';
import {
  ArrowRight,
  MessageCircle,
  GraduationCap,
  BookOpen,
  Users,
  Layers,
  FileText,
  Target,
  ClipboardCheck,
} from 'lucide-react';

interface HeroProps {
  onNavigateRisorse: () => void;
}

const TRUST_ITEMS = [
  { icon: Users, label: '30+ studenti seguiti' },
  { icon: Layers, label: 'Percorsi individuali e di gruppo' },
  { icon: FileText, label: 'Materiali ed esercizi inclusi' },
] as const;

const PORTRAIT_SRC = `${import.meta.env.BASE_URL}homepage_pic_transparent.png`;
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
    <section className="hero" aria-labelledby="hero-title">
      <div className="page-container">
        <div className="hero-main">
          <div className="hero-copy">
            <div className="hero-badge">
              <GraduationCap aria-hidden />
              <span>Tutor STEM</span>
            </div>

            <h1 className="hero-title" id="hero-title">
              <span>Percorsi strutturati in</span>
              <span className="hero-title-gradient">Matematica e Fisica</span>
            </h1>

            <p className="hero-description">
              Percorsi guidati di Matematica e Fisica per il{' '}
              <strong>semestre filtro</strong> di Medicina, i test{' '}
              <strong>TOLC</strong>, l&apos;università e le scuole superiori.
            </p>

            <div className="hero-actions">
              <a
                href="#contatti"
                onClick={(e) => scrollToSection(e, 'contatti')}
                className="hero-primary-action"
              >
                <MessageCircle className="hero-icon-whatsapp" size={22} aria-hidden />
                <span>Prenota una consulenza</span>
                <ArrowRight className="hero-primary-action__arrow" size={20} aria-hidden />
              </a>
              <button
                type="button"
                onClick={onNavigateRisorse}
                className="hero-secondary-action"
              >
                <BookOpen size={22} aria-hidden />
                <span>Esplora le risorse gratuite</span>
              </button>
            </div>
          </div>

          <div className="hero-portrait-stage">
            <div className="hero-portrait-accent" aria-hidden />
            <div className="hero-portrait-panel" aria-hidden>
              <span className="hero-portrait-panel__node hero-portrait-panel__node--1" />
              <span className="hero-portrait-panel__node hero-portrait-panel__node--2" />
              <span className="hero-portrait-panel__node hero-portrait-panel__node--3" />
            </div>
            <img
              className="hero-portrait-subject"
              src={PORTRAIT_SRC}
              alt="Ivan Gaeta, tutor di Matematica e Fisica"
              width={PORTRAIT_WIDTH}
              height={PORTRAIT_HEIGHT}
              fetchPriority="high"
              decoding="async"
            />
            <div className="hero-floating-card hero-floating-card--custom" aria-hidden>
              <Target className="hero-floating-card__icon-teal" />
              <span>Percorsi su misura</span>
            </div>
            <div className="hero-floating-card hero-floating-card--students" aria-hidden>
              <ClipboardCheck className="hero-floating-card__icon-blue" />
              <span>Medicina e TOLC</span>
            </div>
          </div>
        </div>

        <div className="hero-trust" aria-label="Punti di forza">
          {TRUST_ITEMS.map(({ icon: Icon, label }, index) => (
            <div
              key={label}
              className={`hero-trust-item${index > 0 ? ' hero-trust-item--divided' : ''}`}
            >
              <Icon aria-hidden />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
