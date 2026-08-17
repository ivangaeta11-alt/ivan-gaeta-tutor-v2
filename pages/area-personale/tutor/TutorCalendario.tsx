import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import TutorLessonStatusBadge from "../../../features/area-personale/tutor/components/TutorLessonStatusBadge";
import InfoNotice from "../../../features/area-personale/studente/components/InfoNotice";
import { MOCK_LESSONS } from "../../../features/area-personale/tutor/data";
import { LESSON_TYPE_LABELS } from "../../../features/area-personale/tutor/types";
import { formatDate, formatDateShort, formatTimeRange } from "../../../features/area-personale/studente/utils/format";

const WEEK_DAYS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

const TutorCalendario: React.FC = () => {
  const [proposeSent, setProposeSent] = useState<string | null>(null);
  const sorted = [...MOCK_LESSONS].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      <PageHeader title="Calendario" description="Vista settimanale semplificata delle lezioni assegnate." />

      <div className="mb-6 p-4 bg-white rounded-2xl border border-slate-100 max-w-full overflow-x-auto overscroll-x-contain">
        <div className="grid grid-cols-7 gap-2 min-w-[560px]">
          {WEEK_DAYS.map((d) => (
            <div key={d} className="text-center text-xs font-bold text-slate-400 py-2">{d}</div>
          ))}
          {["2026-08-18", "2026-08-19", "2026-08-20", "2026-08-21", "2026-08-22", "2026-08-23", "2026-08-24"].map((date) => {
            const dayLessons = sorted.filter((l) => l.date === date);
            return (
              <div key={date} className="min-h-[80px] p-2 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">{formatDateShort(date).slice(0, 5)}</p>
                {dayLessons.map((l) => (
                  <Link
                    key={l.id}
                    to={`/area-personale/tutor/lezione/${l.id}`}
                    className="block text-[10px] leading-tight p-1 mb-1 rounded bg-blue-50 text-blue-800 hover:bg-blue-100"
                  >
                    {l.startTime} {l.label.slice(0, 12)}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {proposeSent && (
        <InfoNotice>Proposta inviata al gruppo per la lezione {proposeSent} (demo locale).</InfoNotice>
      )}

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Elenco lezioni</h2>
        <div className="space-y-3">
          {sorted.map((lesson) => (
            <div key={lesson.id} className="p-4 md:p-5 bg-white rounded-2xl border border-slate-100">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-bold text-slate-900">{lesson.subject} – {lesson.label}</h3>
                  <p className="text-sm text-slate-500">
                    {formatDate(lesson.date)} · {formatTimeRange(lesson.startTime, lesson.endTime)} ·{" "}
                    {LESSON_TYPE_LABELS[lesson.type]}
                  </p>
                </div>
                <TutorLessonStatusBadge status={lesson.status} />
              </div>
              <div className="flex flex-wrap gap-2">
                <Link to={`/area-personale/tutor/lezione/${lesson.id}`} className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:border-blue-200">
                  Dettagli
                </Link>
                <button type="button" className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700">
                  Link video
                </button>
                <button type="button" onClick={() => setProposeSent(lesson.id)} className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700">
                  Proponi modifica
                </button>
                <button type="button" className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700">
                  Lezione aggiuntiva
                </button>
                {lesson.status === "non_confermata" && (
                  <span className="px-3 py-1.5 text-xs text-orange-600 bg-orange-50 rounded-lg border border-orange-100">
                    Conferma automatica non disponibile (saldo insufficiente)
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TutorCalendario;
