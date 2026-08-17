import React from "react";
import { Calendar, Clock, Video } from "lucide-react";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import LessonStatusBadge from "../../../features/area-personale/studente/components/LessonStatusBadge";
import { MOCK_LESSONS } from "../../../features/area-personale/studente/data";
import { formatDate, formatTimeRange } from "../../../features/area-personale/studente/utils/format";

const UPCOMING = MOCK_LESSONS.filter(
  (l) => l.status !== "svolta" && l.status !== "annullata_gruppo" && l.status !== "annullata_tutor"
).sort((a, b) => a.date.localeCompare(b.date));

const PAST = MOCK_LESSONS.filter(
  (l) => l.status === "svolta" || l.status === "annullata_gruppo" || l.status === "annullata_tutor"
).sort((a, b) => b.date.localeCompare(a.date));

const StudenteCalendario: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Calendario"
        description="Le tue prossime lezioni e lo stato di ciascun appuntamento."
      />

      <section className="mb-10">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Prossime lezioni</h2>
        <div className="space-y-3">
          {UPCOMING.map((lesson) => (
            <div
              key={lesson.id}
              className="p-4 md:p-5 bg-white rounded-2xl border border-slate-100 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                <h3 className="font-bold text-slate-900">
                  {lesson.subject} – {lesson.groupName}
                </h3>
                <LessonStatusBadge status={lesson.status} />
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" aria-hidden />
                  {formatDate(lesson.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" aria-hidden />
                  {formatTimeRange(lesson.startTime, lesson.endTime)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-slate-400" aria-hidden />
                  Online
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Lezioni passate</h2>
        <div className="space-y-3">
          {PAST.map((lesson) => (
            <div
              key={lesson.id}
              className="p-4 md:p-5 bg-white rounded-2xl border border-slate-100 shadow-sm opacity-80"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
                <h3 className="font-semibold text-slate-800">
                  {lesson.subject} – {lesson.groupName}
                </h3>
                <LessonStatusBadge status={lesson.status} />
              </div>
              <p className="text-sm text-slate-500">
                {formatDate(lesson.date)} · {formatTimeRange(lesson.startTime, lesson.endTime)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudenteCalendario;
