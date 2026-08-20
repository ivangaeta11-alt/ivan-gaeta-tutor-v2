
import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingContact: React.FC = () => {
  return (
    <a 
      href="https://wa.me/393495519055" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-7 right-7 z-[100] group flex items-center gap-3"
    >
      <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
        <span className="text-sm font-bold text-gray-700 whitespace-nowrap">Contattami ora</span>
      </div>
      <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-[0_8px_24px_-5px_rgba(16,185,129,0.45)] hover:scale-105 hover:bg-emerald-600 transition-all duration-300">
        <MessageCircle className="w-7 h-7" aria-hidden />
      </div>
    </a>
  );
};

export default FloatingContact;
