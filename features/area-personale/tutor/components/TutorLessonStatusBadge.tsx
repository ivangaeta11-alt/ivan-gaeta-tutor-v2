import React from "react";
import type { TutorLessonStatus } from "../types";
import { TUTOR_LESSON_STATUS_LABELS } from "../types";

const STYLE_MAP: Record<TutorLessonStatus, string> = {
  programmata: "bg-slate-100 text-slate-700 border-slate-200",
  in_attesa_conferma: "bg-amber-50 text-amber-700 border-amber-100",
  confermata: "bg-emerald-50 text-emerald-700 border-emerald-100",
  non_confermata: "bg-orange-50 text-orange-700 border-orange-100",
  modifica_proposta: "bg-violet-50 text-violet-700 border-violet-100",
  annullata_gruppo: "bg-red-50 text-red-700 border-red-100",
  annullata_tutor: "bg-red-50 text-red-600 border-red-100",
  da_completare: "bg-blue-50 text-blue-700 border-blue-100",
  svolta: "bg-slate-100 text-slate-600 border-slate-200",
};

interface TutorLessonStatusBadgeProps {
  status: TutorLessonStatus;
}

const TutorLessonStatusBadge: React.FC<TutorLessonStatusBadgeProps> = ({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STYLE_MAP[status]}`}>
    {TUTOR_LESSON_STATUS_LABELS[status]}
  </span>
);

export default TutorLessonStatusBadge;
