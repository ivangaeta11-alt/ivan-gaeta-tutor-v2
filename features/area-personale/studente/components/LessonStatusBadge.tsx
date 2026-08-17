import React from "react";
import type { LessonStatus } from "../types";
import { LESSON_STATUS_LABELS } from "../types";

const STYLE_MAP: Record<LessonStatus, string> = {
  programmata: "bg-slate-100 text-slate-700 border-slate-200",
  confermata: "bg-emerald-50 text-emerald-700 border-emerald-100",
  votazione_aperta: "bg-amber-50 text-amber-700 border-amber-100",
  non_confermata: "bg-orange-50 text-orange-700 border-orange-100",
  annullata_gruppo: "bg-red-50 text-red-700 border-red-100",
  annullata_tutor: "bg-red-50 text-red-600 border-red-100",
  svolta: "bg-blue-50 text-blue-700 border-blue-100",
};

interface LessonStatusBadgeProps {
  status: LessonStatus;
}

const LessonStatusBadge: React.FC<LessonStatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STYLE_MAP[status]}`}
    >
      {LESSON_STATUS_LABELS[status]}
    </span>
  );
};

export default LessonStatusBadge;
