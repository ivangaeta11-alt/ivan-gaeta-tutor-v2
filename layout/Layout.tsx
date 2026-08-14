import React from 'react';

// Layout components (same folder)
import Navbar from './Navbar';
import Footer from './Footer';

// Sections (different folder)
import FloatingContact from '../sections/FloatingContact';

interface LayoutProps {
  children: React.ReactNode;
  onContact: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  onContact
}) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer onContact={onContact} />
      <FloatingContact />
    </div>
  );
};

export default Layout;
