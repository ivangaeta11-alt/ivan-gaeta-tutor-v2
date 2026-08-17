import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Video, Users } from "lucide-react";
import type { TutorLesson } from "../types";
import TutorLessonStatusBadge from "./TutorLessonStatusBadge";
import AttendancePanel from "./AttendancePanel";
import CancelLessonDialog from "./CancelLessonDialog";
import { formatDate, formatTimeRange } from "../../studente/utils/format";

interface TutorNextLessonCardProps {
  lesson: TutorLesson;
}

const TutorNextLessonCard: React.FC<TutorNextLessonCardProps> = ({ lesson }) => {
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [launchMsg, setLaunchMsg] = useState(false);

  return (
    <>
      <div className="p-6 md:p-8 bg-white rounded-3xl border border-slate-100 shadow-sm min-w-0 max-w-full">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5 min-w-0">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Prossima lezione</p>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight break-words">
              {lesson.subject} – {lesson.label}
            </h2>
          </div>
          <div className="shrink-0">
            <TutorLessonStatusBadge status={lesson.status} />
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
            {lesson.mode === "online" ? "Online" : "In presenza"}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Users className="w-4 h-4 text-slate-400 shrink-0" aria-hidden />
            {lesson.participantCount} studenti
          </div>
        </div>

        {launchMsg && (
          <div className="mb-4 p-3 rounded-xl bg-blue-50 border border-blue-100 text-sm text-blue-800">
            Link lezione (demo): {lesson.videoLink ?? "https://meet.example.com/demo"}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Link
            to={`/area-personale/tutor/lezione/${lesson.id}`}
            className="px-3 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-700 hover:border-blue-200 hover:text-blue-600 transition-colors"
          >
            Apri dettagli
          </Link>
          <button
            type="button"
            onClick={() => setLaunchMsg(true)}
            className="px-3 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Avvia lezione
          </button>
          <button
            type="button"
            onClick={() => setAttendanceOpen(true)}
            className="px-3 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-700 hover:border-blue-200 transition-colors"
          >
            Registra presenze
          </button>
          <button
            type="button"
            className="px-3 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-700 hover:border-blue-200 transition-colors"
          >
            Carica materiale
          </button>
          <button
            type="button"
            onClick={() => setCancelOpen(true)}
            className="px-3 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-600 transition-colors"
          >
            Annulla lezione
          </button>
        </div>
      </div>

      <AttendancePanel
        open={attendanceOpen}
        lesson={lesson}
        onClose={() => setAttendanceOpen(false)}
      />
      <CancelLessonDialog open={cancelOpen} onClose={() => setCancelOpen(false)} />
    </>
  );
};

export default TutorNextLessonCard;
