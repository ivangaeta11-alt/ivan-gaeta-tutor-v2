import React from "react";
import { Link } from "react-router-dom";
import type { TutorGroup } from "../types";
import { getLessonById } from "../data/tutorDashboardMock";
import { formatDate, formatTimeRange } from "../../studente/utils/format";

interface GroupCardProps {
  group: TutorGroup;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const nextLesson = group.nextLessonId ? getLessonById(group.nextLessonId) : undefined;

  return (
    <Link
      to={`/area-personale/tutor/gruppi/${group.id}`}
      className="block p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:border-blue-100 hover:shadow-md transition-all"
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <h3 className="text-lg font-bold text-slate-900">{group.name}</h3>
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
            group.status === "aperto"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : "bg-slate-100 text-slate-600 border-slate-200"
          }`}
        >
          {group.status === "aperto" ? "Aperto" : "Chiuso"}
        </span>
      </div>
      <p className="text-sm text-slate-500 mb-4">{group.subject}</p>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs text-slate-400">Membri</dt>
          <dd className="font-medium text-slate-800">
            {group.effectiveMembers} / {group.maxCapacity}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-400">Consegne pendenti</dt>
          <dd className="font-medium text-slate-800">{group.pendingSubmissions}</dd>
        </div>
      </dl>
      {nextLesson && (
        <p className="mt-4 text-sm text-slate-600">
          Prossima: {formatDate(nextLesson.date)} · {formatTimeRange(nextLesson.startTime, nextLesson.endTime)}
        </p>
      )}
      <p className="mt-2 text-xs text-slate-400">{group.recurringSlots.join(" · ")}</p>
    </Link>
  );
};

export default GroupCard;
