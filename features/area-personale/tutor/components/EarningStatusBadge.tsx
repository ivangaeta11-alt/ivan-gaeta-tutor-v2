import React from "react";
import type { EarningStatus } from "../types";
import { EARNING_STATUS_LABELS } from "../types";

const STYLE_MAP: Record<EarningStatus, string> = {
  previsto: "bg-slate-100 text-slate-700 border-slate-200",
  in_attesa: "bg-amber-50 text-amber-700 border-amber-100",
  maturato: "bg-blue-50 text-blue-700 border-blue-100",
  liquidato: "bg-emerald-50 text-emerald-700 border-emerald-100",
  annullato: "bg-red-50 text-red-600 border-red-100",
};

interface EarningStatusBadgeProps {
  status: EarningStatus;
}

const EarningStatusBadge: React.FC<EarningStatusBadgeProps> = ({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STYLE_MAP[status]}`}>
    {EARNING_STATUS_LABELS[status]}
  </span>
);

export default EarningStatusBadge;
