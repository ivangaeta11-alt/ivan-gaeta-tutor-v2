import React from "react";

interface KpiCardProps {
  label: string;
  value: string;
  hint?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ label, value, hint }) => {
  return (
    <div className="p-5 md:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm min-w-0">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{label}</p>
      <p className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{value}</p>
      {hint && <p className="text-xs text-slate-400 font-light mt-2">{hint}</p>}
    </div>
  );
};

export default KpiCard;
