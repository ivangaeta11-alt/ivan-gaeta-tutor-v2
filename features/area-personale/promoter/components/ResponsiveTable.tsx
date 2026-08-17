import React from "react";

interface ResponsiveTableProps {
  children: React.ReactNode;
  className?: string;
}

/** Wrapper con scroll orizzontale su schermi piccoli, contenuto nel viewport. */
const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ children, className = "" }) => {
  return (
    <div className={`w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain ${className}`}>
      <div className="min-w-[640px]">{children}</div>
    </div>
  );
};

export default ResponsiveTable;
