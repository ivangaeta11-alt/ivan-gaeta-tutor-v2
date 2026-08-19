import React from "react";
import type { CommissionMovementStatus } from "../types";
import { COMMISSION_STATUS_LABELS } from "../types";

const STYLES: Record<CommissionMovementStatus, string> = {
  in_maturazione: "bg-amber-50 text-amber-700 border-amber-100",
  liquidabile: "bg-blue-50 text-blue-700 border-blue-100",
  pagata: "bg-emerald-50 text-emerald-700 border-emerald-100",
  stornata: "bg-red-50 text-red-700 border-red-100",
};

interface CommissionStatusBadgeProps {
  status: CommissionMovementStatus;
}

const CommissionStatusBadge: React.FC<CommissionStatusBadgeProps> = ({ status }) => (
  <span
    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border whitespace-nowrap ${STYLES[status]}`}
  >
    {COMMISSION_STATUS_LABELS[status]}
  </span>
);

export default CommissionStatusBadge;
