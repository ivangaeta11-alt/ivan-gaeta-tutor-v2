import React from "react";

interface ResponsiveTableProps {
  children: React.ReactNode;
  className?: string;
}

/** Wrapper con scroll orizzontale su schermi piccoli. */
const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ children, className = "" }) => {
  return (
    <div className={`overflow-x-auto -mx-1 px-1 ${className}`}>
      <div className="min-w-[640px]">{children}</div>
    </div>
  );
};

export default ResponsiveTable;
