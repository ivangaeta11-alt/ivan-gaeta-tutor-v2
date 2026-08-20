
import React from 'react';
import Hero from '../sections/Hero';
import Method from '../sections/Method';
import Features from '../sections/Features';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';

interface HomePageProps {
  onNavigateRisorse: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateRisorse }) => {
  return (
    <>
      <Hero 
        onNavigateRisorse={onNavigateRisorse} 
      />
      <Method />
      <Features />
      <Testimonials />
      <Contact />
    </>
  );
};

export default HomePage;
