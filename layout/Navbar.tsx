
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  setView: (view: 'home' | 'risorse') => void;
  currentView: 'home' | 'risorse';
}

const Navbar: React.FC<NavbarProps> = ({ setView, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  // Immagine in public/ per funzionare anche in produzione (path assoluto da root)
  const profileImg = `${import.meta.env.BASE_URL}ivan_gaeta_profile.jpeg`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>, target: 'home' | 'risorse' | string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (target === 'home' || target === 'risorse') {
      setView(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentView !== 'home') {
        setView('home');
        setTimeout(() => {
          const element = document.getElementById(target);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(target);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || currentView !== 'home' || isOpen ? 'glass-morphism shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer group" onClick={(e) => handleLinkClick(e, 'home')}>
            <div className="relative w-12 h-12 mr-3 overflow-hidden rounded-full border-2 border-blue-400 shadow-sm group-hover:border-blue-600 transition-all bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
              {!imgError ? (
                <img 
                  src={profileImg}
                  alt="Ivan Gaeta"
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="text-white font-bold text-sm tracking-tighter">IG</span>
              )}
            </div>
            <span className="text-xl font-bold tracking-tight text-blue-900">Ivan<span className="text-emerald-500"> Gaeta</span></span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <a href="#" onClick={(e) => handleLinkClick(e, 'home')} className={`transition-colors font-medium ${currentView === 'home' ? 'text-blue-600' : 'hover:text-blue-600'}`}>Home</a>
              <a href="#" onClick={(e) => handleLinkClick(e, 'risorse')} className={`transition-colors font-medium ${currentView === 'risorse' ? 'text-blue-600' : 'hover:text-blue-600'}`}>Risorse gratuite</a>
              <a href="#recensioni" onClick={(e) => handleLinkClick(e, 'recensioni')} className="hover:text-blue-600 transition-colors font-medium text-gray-600">Recensioni</a>
              <a 
                href="#contatti" 
                onClick={(e) => handleLinkClick(e, 'contatti')}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md shadow-blue-900/20 font-bold"
              >
                Contattami
              </a>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-2xl absolute w-full left-0 top-full p-6 space-y-4 animate-in slide-in-from-top-4 duration-200 border-t border-gray-100">
          <a href="#" onClick={(e) => handleLinkClick(e, 'home')} className="block px-3 py-2 text-lg font-semibold text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" onClick={(e) => handleLinkClick(e, 'risorse')} className="block px-3 py-2 text-lg font-semibold text-gray-700 hover:text-blue-600">Risorse gratuite</a>
          <a href="#recensioni" onClick={(e) => handleLinkClick(e, 'recensioni')} className="block px-3 py-2 text-lg font-semibold text-gray-700 hover:text-blue-600">Recensioni</a>
          <div className="pt-4">
            <a 
              href="#contatti" 
              onClick={(e) => handleLinkClick(e, 'contatti')}
              className="block w-full text-center bg-blue-600 text-white px-5 py-6 rounded-2xl font-bold shadow-lg shadow-blue-200"
            >
              Contattami
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
