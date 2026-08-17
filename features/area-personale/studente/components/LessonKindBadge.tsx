import React from "react";
import type { LessonKind } from "../types";
import { LESSON_KIND_LABELS } from "../types";

const STYLE_MAP: Record<LessonKind, string> = {
  individual: "bg-indigo-50 text-indigo-700 border-indigo-100",
  group_recurring: "bg-slate-100 text-slate-600 border-slate-200",
  group_extra: "bg-violet-50 text-violet-700 border-violet-100",
};

interface LessonKindBadgeProps {
  kind: LessonKind;
}

const LessonKindBadge: React.FC<LessonKindBadgeProps> = ({ kind }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STYLE_MAP[kind]}`}
    >
      {LESSON_KIND_LABELS[kind]}
    </span>
  );
};

export default LessonKindBadge;
