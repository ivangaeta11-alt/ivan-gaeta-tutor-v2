import React from 'react';

// Layout components (same folder)
import Navbar from './Navbar';
import Footer from './Footer';
import DashboardFooter from './DashboardFooter';

// Sections (different folder)
import FloatingContact from '../sections/FloatingContact';

export type LayoutVariant = 'public' | 'dashboard';

interface LayoutProps {
  children: React.ReactNode;
  onContact?: () => void;
  /** Public site shows promo footer + WhatsApp; dashboard shows minimal footer only. */
  variant?: LayoutVariant;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  onContact,
  variant = 'public',
}) => {
  const isDashboard = variant === 'dashboard';

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <Navbar />

      <main className="flex-grow overflow-x-hidden">
        {children}
      </main>
      
      {isDashboard ? (
        <DashboardFooter />
      ) : (
        <>
          <Footer onContact={onContact!} />
          <FloatingContact />
        </>
      )}
    </div>
  );
};

export default Layout;
