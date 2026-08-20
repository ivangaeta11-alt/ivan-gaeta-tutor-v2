
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, UserRound } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imgError, setImgError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  
  // Immagine in public/ per funzionare anche in produzione (path assoluto da root)
  const profileImg = `${import.meta.env.BASE_URL}ivan_gaeta_profile.jpeg`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleSectionClick = (e: React.MouseEvent<HTMLElement>, target: string) => {
    e.preventDefault();
    closeMenu();

    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors font-medium ${isActive ? 'text-blue-600' : 'hover:text-blue-600'}`;

  const areaPersonaleClass = ({ isActive }: { isActive: boolean }) =>
    [
      'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-200',
      'border shadow-sm',
      isActive
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-emerald-900/5'
        : 'bg-white/90 text-slate-700 border-slate-200 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/80 hover:shadow-md hover:shadow-emerald-900/10',
    ].join(' ');

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || !isHome || isOpen ? 'glass-morphism shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center cursor-pointer group">
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
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <NavLink to="/" end onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={navLinkClass}>Home</NavLink>
              <NavLink to="/offerta-formativa" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={navLinkClass}>Offerta formativa</NavLink>
              <NavLink to="/risorse" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={navLinkClass}>Risorse gratuite</NavLink>
              <a href="#recensioni" onClick={(e) => handleSectionClick(e, 'recensioni')} className="transition-colors font-medium hover:text-blue-600">Recensioni</a>
              <a 
                href="#contatti" 
                onClick={(e) => handleSectionClick(e, 'contatti')}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md shadow-blue-900/20 font-bold"
              >
                Contattami
              </a>
              <NavLink
                to="/login"
                onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={areaPersonaleClass}
              >
                <UserRound className="w-4 h-4 shrink-0" strokeWidth={2.25} />
                <span>Area personale</span>
              </NavLink>
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
          <NavLink to="/" end onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="block px-3 py-2 text-lg font-semibold text-gray-700 hover:text-blue-600">Home</NavLink>
          <NavLink to="/offerta-formativa" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="block px-3 py-2 text-lg font-semibold text-gray-700 hover:text-blue-600">Offerta formativa</NavLink>
          <NavLink to="/risorse" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="block px-3 py-2 text-lg font-semibold text-gray-700 hover:text-blue-600">Risorse gratuite</NavLink>
          <a href="#recensioni" onClick={(e) => handleSectionClick(e, 'recensioni')} className="block px-3 py-2 text-lg font-semibold text-gray-700 hover:text-blue-600">Recensioni</a>
          <div className="pt-4">
            <a 
              href="#contatti" 
              onClick={(e) => handleSectionClick(e, 'contatti')}
              className="block w-full text-center bg-blue-600 text-white px-5 py-6 rounded-2xl font-bold shadow-lg shadow-blue-200"
            >
              Contattami
            </a>
          </div>
          <NavLink
            to="/login"
            onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={({ isActive }) =>
              [
                'flex items-center justify-center gap-2 w-full text-center px-5 py-4 rounded-2xl font-bold transition-all duration-200 border',
                isActive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/80',
              ].join(' ')
            }
          >
            <UserRound className="w-5 h-5 shrink-0" strokeWidth={2.25} />
            <span>Area personale</span>
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
