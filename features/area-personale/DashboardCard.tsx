import React from "react";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
}

/** Placeholder card used across role dashboards. */
const DashboardCard: React.FC<DashboardCardProps> = ({ title, children }) => {
  return (
    <div className="p-6 md:p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">{title}</h3>
      <div className="text-slate-500 font-light leading-relaxed text-[15px]">{children}</div>
    </div>
  );
};

export default DashboardCard;
