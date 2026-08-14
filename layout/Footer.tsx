
import React, { useState } from 'react';

interface FooterProps {
  setView: (view: 'home' | 'risorse') => void;
  onContact: () => void;
}

const Footer: React.FC<FooterProps> = ({ setView, onContact }) => {
  const [imgError, setImgError] = useState(false);
  
  // Immagine in public/ per funzionare anche in produzione (path assoluto da root)
  const profileImg = `${import.meta.env.BASE_URL}ivan_gaeta_profile.jpeg`;

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRisorseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setView('risorse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-16">
          
          {/* Colonna Identità e Bio */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center cursor-pointer group" onClick={handleHomeClick}>
              <div className="relative w-16 h-16 mr-4 overflow-hidden rounded-full border-2 border-blue-50 shadow-sm group-hover:border-blue-400 transition-colors bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                {!imgError ? (
                  <img 
                    src={profileImg}
                    alt="Ivan Gaeta"
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <span className="text-white font-bold text-xl tracking-tighter">IG</span>
                )}
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-blue-900">
                Ivan<span className="text-emerald-500"> Gaeta</span>
              </span>
            </div>
            
            <div className="max-w-2xl">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Laureato in Fisica (L-30).</h4>
              
              <div className="space-y-4 text-gray-500 text-[15px] leading-relaxed font-light">
                <p>
                  Offro supporto accademico strutturato in <span className="text-gray-900 font-medium">matematica e fisica</span> per test di Medicina ed esami universitari scientifici.
                </p>
                <p>
                  Il mio lavoro unisce il rigore delle discipline scientifiche a principi di studio basati sulle <span className="text-gray-900 font-medium">scienze cognitive</span>, con un’attenzione particolare alla comunicazione adattiva e al lato umano dello studio.
                </p>
                <p className="border-l-2 border-blue-50 pl-4 italic text-gray-400">
                  Accanto all’attività di tutoraggio, frequento la laurea magistrale in <span className="text-blue-600/70 not-italic font-medium">Astroparticle Physics</span>, mantenendo un contatto costante con il metodo e il livello di richiesta della formazione universitaria avanzata.
                </p>
              </div>
            </div>
          </div>

          {/* Colonne Link */}
          <div className="grid grid-cols-2 lg:col-span-2 gap-8 lg:border-l lg:border-gray-50 lg:pl-16">
            <div>
              <h5 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Link Rapidi</h5>
              <ul className="space-y-4 text-[15px] text-gray-500">
                <li><a href="#" onClick={handleHomeClick} className="hover:text-blue-600 transition-colors">Home</a></li>
                <li><a href="#" onClick={handleRisorseClick} className="hover:text-blue-600 transition-colors">Risorse gratuite</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onContact(); }} className="hover:text-blue-600 transition-colors font-semibold text-blue-600">Contattami</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Supporto</h5>
              <ul className="space-y-4 text-[15px] text-gray-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Termini Legali</a></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs tracking-wide">
          <p>{new Date().getFullYear()} Ivan Gaeta • Fisica & Matematica per l'Università</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
