import React from "react";
import type { PayoutStatus } from "../types";

const STYLE_MAP: Record<PayoutStatus, string> = {
  liquidata: "bg-emerald-50 text-emerald-700 border-emerald-100",
  da_liquidare: "bg-amber-50 text-amber-700 border-amber-100",
  in_elaborazione: "bg-slate-100 text-slate-600 border-slate-200",
};

const LABEL_MAP: Record<PayoutStatus, string> = {
  liquidata: "Liquidata",
  da_liquidare: "Da liquidare",
  in_elaborazione: "In elaborazione",
};

interface PayoutStatusBadgeProps {
  status: PayoutStatus;
}

const PayoutStatusBadge: React.FC<PayoutStatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STYLE_MAP[status]}`}
    >
      {LABEL_MAP[status]}
    </span>
  );
};

export default PayoutStatusBadge;
