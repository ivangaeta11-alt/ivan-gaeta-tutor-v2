import React from "react";
import type { LessonType } from "../types";
import { LESSON_TYPE_LABELS } from "../types";

const STYLE_MAP: Record<LessonType, string> = {
  individuale: "bg-slate-100 text-slate-700 border-slate-200",
  gruppo_piccolo: "bg-blue-50 text-blue-700 border-blue-100",
  gruppo_grande: "bg-violet-50 text-violet-700 border-violet-100",
};

interface LessonTypeBadgeProps {
  type: LessonType;
}

const LessonTypeBadge: React.FC<LessonTypeBadgeProps> = ({ type }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STYLE_MAP[type]}`}
    >
      {LESSON_TYPE_LABELS[type]}
    </span>
  );
};

export default LessonTypeBadge;
