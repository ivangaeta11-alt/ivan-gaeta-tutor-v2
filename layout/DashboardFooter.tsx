import React from "react";

const DashboardFooter: React.FC = () => {
  return (
    <footer className="bg-white py-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs tracking-wide">
          <p>{new Date().getFullYear()} Ivan Gaeta • Fisica & Matematica per l'Università</p>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
