import React from 'react';

// Layout components (same folder)
import Navbar from './Navbar';
import Footer from './Footer';

// Sections (different folder)
import FloatingContact from '../sections/FloatingContact';

interface LayoutProps {
  children: React.ReactNode;
  currentView: 'home' | 'risorse';
  setView: (view: 'home' | 'risorse') => void;
  onContact: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  currentView,
  setView,
  onContact
}) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar setView={setView} currentView={currentView} />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer setView={setView} onContact={onContact} />
      <FloatingContact />
    </div>
  );
};

export default Layout;

