
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
    `site-nav__link${isActive ? ' site-nav__link--active' : ''}`;

  const areaPersonaleClass = ({ isActive }: { isActive: boolean }) =>
    `site-header__cta-secondary${isActive ? ' site-header__cta-secondary--active' : ''}`;

  return (
    <header
      className={`site-header${scrolled || !isHome || isOpen ? ' site-header--scrolled' : ''}`}
    >
      <div className="page-container site-header__inner">
        <Link
          to="/"
          onClick={() => {
            closeMenu();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="site-brand"
        >
          <div className="site-brand__avatar">
            {!imgError ? (
              <img
                src={profileImg}
                alt=""
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-white font-bold text-sm tracking-tighter">IG</span>
            )}
          </div>
          <span className="site-brand__name">
            <span className="site-brand__name-ivan">Ivan</span>
            <span className="site-brand__name-gaeta"> Gaeta</span>
          </span>
        </Link>

        <div className="site-header__cluster">
          <nav className="site-nav" aria-label="Navigazione principale">
            <NavLink
              to="/"
              end
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={navLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/offerta-formativa"
              onClick={() => {
                closeMenu();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={navLinkClass}
            >
              Offerta formativa
            </NavLink>
            <NavLink
              to="/risorse"
              onClick={() => {
                closeMenu();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={navLinkClass}
            >
              Risorse gratuite
            </NavLink>
            <a
              href="#recensioni"
              onClick={(e) => handleSectionClick(e, 'recensioni')}
              className="site-nav__link"
            >
              Recensioni
            </a>
          </nav>

          <a
            href="#contatti"
            onClick={(e) => handleSectionClick(e, 'contatti')}
            className="site-header__cta-primary"
          >
            Contattami
          </a>
          <NavLink
            to="/login"
            onClick={() => {
              closeMenu();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={areaPersonaleClass}
          >
            <UserRound size={16} strokeWidth={2.25} aria-hidden />
            <span>Area personale</span>
          </NavLink>
        </div>

        <button
          type="button"
          className="site-header__menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="site-header__mobile-menu">
          <NavLink
            to="/"
            end
            onClick={() => {
              closeMenu();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="block px-3 py-3 text-lg font-semibold text-[#061735] hover:text-[#075bea]"
          >
            Home
          </NavLink>
          <NavLink
            to="/offerta-formativa"
            onClick={() => {
              closeMenu();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="block px-3 py-3 text-lg font-semibold text-[#061735] hover:text-[#075bea]"
          >
            Offerta formativa
          </NavLink>
          <NavLink
            to="/risorse"
            onClick={() => {
              closeMenu();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="block px-3 py-3 text-lg font-semibold text-[#061735] hover:text-[#075bea]"
          >
            Risorse gratuite
          </NavLink>
          <a
            href="#recensioni"
            onClick={(e) => handleSectionClick(e, 'recensioni')}
            className="block px-3 py-3 text-lg font-semibold text-[#061735] hover:text-[#075bea]"
          >
            Recensioni
          </a>
          <div className="pt-4 space-y-3">
            <a
              href="#contatti"
              onClick={(e) => handleSectionClick(e, 'contatti')}
              className="site-header__cta-primary w-full"
            >
              Contattami
            </a>
            <NavLink
              to="/login"
              onClick={() => {
                closeMenu();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={({ isActive }) =>
                `site-header__cta-secondary${isActive ? ' site-header__cta-secondary--active' : ''}`
              }
            >
              <UserRound size={20} strokeWidth={2.25} aria-hidden />
              <span>Area personale</span>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
