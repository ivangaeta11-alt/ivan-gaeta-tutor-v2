
import React from 'react';
import Hero from '../sections/Hero';
import Manifesto from '../sections/Manifesto';
import Method from '../sections/Method';
import Features from '../sections/Features';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';

interface HomePageProps {
  onNavigateRisorse: () => void;
  onNavigateContact: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateRisorse, onNavigateContact }) => {
  return (
    <>
      <Hero 
        onNavigateRisorse={onNavigateRisorse} 
      />
      <Manifesto />
      <Method />
      <Features onNavigate={onNavigateContact} />
      <Testimonials />
      <Contact />
    </>
  );
};

export default HomePage;
