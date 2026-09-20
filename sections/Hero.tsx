
import React from 'react';
import {
  ArrowRight,
  MessageCircle,
  BookOpen,
  GraduationCap,
  Users,
  Layers,
  FileText,
} from 'lucide-react';

interface HeroProps {
  onNavigateRisorse: () => void;
}

const TRUST_ITEMS = [
  { icon: Users, label: '30+ studenti seguiti' },
  { icon: Layers, label: 'Percorsi individuali e di gruppo' },
  { icon: FileText, label: 'Materiali ed esercizi inclusi' },
] as const;

const LANDING_BG_SRC = `${import.meta.env.BASE_URL}landing-background.jpg`;
const LANDING_BG_WIDTH = 3822;
const LANDING_BG_HEIGHT = 1635;

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
      <div className="hero-visual">
        <img
          className="hero-visual__image"
          src={LANDING_BG_SRC}
          alt=""
          width={LANDING_BG_WIDTH}
          height={LANDING_BG_HEIGHT}
          fetchPriority="high"
          decoding="async"
        />

        <div className="page-container hero-visual__container">
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
        </div>
      </div>

      <div className="hero-trust" aria-label="Punti di forza">
        <div className="page-container hero-trust__inner">
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
