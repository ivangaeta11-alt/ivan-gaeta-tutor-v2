import React from "react";
import type { AssignmentStatus } from "../types";
import { ASSIGNMENT_STATUS_LABELS } from "../types";

const STYLE_MAP: Record<AssignmentStatus, string> = {
  da_consegnare: "bg-amber-50 text-amber-700 border-amber-100",
  consegnata: "bg-slate-100 text-slate-600 border-slate-200",
  da_correggere: "bg-blue-50 text-blue-700 border-blue-100",
  corretta: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

interface MaterialStatusBadgeProps {
  status: AssignmentStatus;
}

const MaterialStatusBadge: React.FC<MaterialStatusBadgeProps> = ({ status }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STYLE_MAP[status]}`}
  >
    {ASSIGNMENT_STATUS_LABELS[status]}
  </span>
);

export default MaterialStatusBadge;
