import React, { useState } from "react";
import { Video, Users, Calendar, Clock } from "lucide-react";
import type { AttendanceChoice, Lesson } from "../types";
import LessonStatusBadge from "./LessonStatusBadge";
import { formatDate, formatTimeRange } from "../utils/format";

interface NextLessonCardProps {
  lesson: Lesson;
}

const NextLessonCard: React.FC<NextLessonCardProps> = ({ lesson }) => {
  const [attendance, setAttendance] = useState<AttendanceChoice>(null);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="p-6 md:p-8 bg-white rounded-3xl border border-slate-100 shadow-sm min-w-0 max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5 min-w-0">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            Prossima lezione
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight break-words">
            {lesson.kind === "individual"
              ? `${lesson.subject}: lezione individuale`
              : `${lesson.subject} – ${lesson.groupName}`}
          </h2>
        </div>
        <div className="shrink-0">
          <LessonStatusBadge status={lesson.status} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4 text-slate-400 shrink-0" aria-hidden />
          {formatDate(lesson.date)}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock className="w-4 h-4 text-slate-400 shrink-0" aria-hidden />
          {formatTimeRange(lesson.startTime, lesson.endTime)}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Video className="w-4 h-4 text-slate-400 shrink-0" aria-hidden />
          Online
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Users className="w-4 h-4 text-slate-400 shrink-0" aria-hidden />
          {lesson.kind === "individual"
            ? "Lezione individuale"
            : `${lesson.effectiveMembers} membri`}
        </div>
      </div>

      {attendance === "assente" && (
        <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-100 text-sm text-amber-800 font-light">
          Hai segnalato che non parteciperai. La lezione resta confermata per gli altri membri
          del gruppo.
        </div>
      )}

      {showDetails && (
        <div className="mb-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600 font-light">
          <p>Link lezione: disponibile 15 minuti prima dell&apos;inizio (demo).</p>
          <p className="mt-1">Tutor: Ivan Gaeta</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setShowDetails((s) => !s)}
          className="px-3 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-700 hover:border-blue-200 hover:text-blue-600 transition-colors"
        >
          Visualizza dettagli
        </button>
        <button
          type="button"
          onClick={() => setAttendance("partecipo")}
          className={`px-3 py-2 text-sm font-semibold rounded-xl border transition-colors ${
            attendance === "partecipo"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "border-slate-200 text-slate-700 hover:border-emerald-200"
          }`}
        >
          Parteciperò
        </button>
        <button
          type="button"
          onClick={() => setAttendance("assente")}
          className={`px-3 py-2 text-sm font-semibold rounded-xl border transition-colors ${
            attendance === "assente"
              ? "bg-amber-50 text-amber-700 border-amber-200"
              : "border-slate-200 text-slate-700 hover:border-amber-200"
          }`}
        >
          Non parteciperò
        </button>
        <button
          type="button"
          className="px-3 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-700 hover:border-blue-200 hover:text-blue-600 transition-colors"
        >
          Proponi modifica
        </button>
        <button
          type="button"
          className="px-3 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-600 transition-colors"
        >
          Richiedi annullamento
        </button>
      </div>
    </div>
  );
};

export default NextLessonCard;
