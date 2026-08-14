
import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingContact: React.FC = () => {
  return (
    <a 
      href="https://wa.me/393495519055" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] group flex items-center gap-3"
    >
      <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
        <span className="text-sm font-bold text-gray-700 whitespace-nowrap">Contattami ora</span>
      </div>
      <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(16,185,129,0.5)] hover:scale-110 hover:bg-emerald-600 transition-all duration-300">
        <MessageCircle className="w-8 h-8" />
      </div>
    </a>
  );
};

export default FloatingContact;
