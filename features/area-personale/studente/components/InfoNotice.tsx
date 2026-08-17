import React from "react";
import { AlertCircle } from "lucide-react";

const InfoNotice: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm text-slate-600 font-light">
      <AlertCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" aria-hidden />
      <p>{children}</p>
    </div>
  );
};

export default InfoNotice;
