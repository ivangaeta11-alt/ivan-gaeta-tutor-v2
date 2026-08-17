import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import TutorLessonStatusBadge from "../../../features/area-personale/tutor/components/TutorLessonStatusBadge";
import LessonCompletionModal from "../../../features/area-personale/tutor/components/LessonCompletionModal";
import CancelLessonDialog from "../../../features/area-personale/tutor/components/CancelLessonDialog";
import AttendancePanel from "../../../features/area-personale/tutor/components/AttendancePanel";
import TrialEvaluationForm from "../../../features/area-personale/tutor/components/TrialEvaluationForm";
import {
  getLessonById,
  getStudentsByGroup,
  MOCK_GUEST,
  MOCK_TUTOR,
} from "../../../features/area-personale/tutor/data";
import { formatDate, formatTimeRange } from "../../../features/area-personale/studente/utils/format";
import { LESSON_TYPE_LABELS } from "../../../features/area-personale/tutor/types";

const TutorLezioneDetail: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lesson = lessonId ? getLessonById(lessonId) : undefined;
  const [completeOpen, setCompleteOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [localStatus, setLocalStatus] = useState<string | null>(null);

  if (!lesson) return <Navigate to="/area-personale/tutor/calendario" replace />;

  const participants = lesson.groupId
    ? [...getStudentsByGroup(lesson.groupId), ...(lesson.type === "prova" ? [MOCK_GUEST] : [])]
    : [];
  const displayStatus = (localStatus ?? lesson.status) as typeof lesson.status;
  const isCompleted = displayStatus === "svolta";

  return (
    <div>
      <Link to="/area-personale/tutor/calendario" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Torna al calendario
      </Link>

      <PageHeader title={`${lesson.subject} – ${lesson.label}`} description="Dettaglio lezione e azioni didattiche." />

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <TutorLessonStatusBadge status={displayStatus} />
          <dl className="grid sm:grid-cols-2 gap-4 text-sm">
            <div><dt className="text-slate-400">Data</dt><dd className="font-medium">{formatDate(lesson.date)}</dd></div>
            <div><dt className="text-slate-400">Orario</dt><dd className="font-medium">{formatTimeRange(lesson.startTime, lesson.endTime)}</dd></div>
            <div><dt className="text-slate-400">Modalità</dt><dd className="font-medium">{lesson.mode === "online" ? "Online" : "In presenza"}</dd></div>
            <div><dt className="text-slate-400">Tipo</dt><dd className="font-medium">{LESSON_TYPE_LABELS[lesson.type]}</dd></div>
            <div className="sm:col-span-2"><dt className="text-slate-400">Link video</dt><dd className="font-mono text-sm break-all">{lesson.videoLink ?? MOCK_TUTOR.defaultVideoLink}</dd></div>
          </dl>
          {lesson.topics && (
            <div>
              <p className="text-xs font-bold uppercase text-slate-400 mb-1">Argomenti previsti</p>
              <ul className="text-sm text-slate-600 list-disc pl-5">{lesson.topics.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          )}
          {lesson.privateNotes && (
            <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100 text-sm text-slate-600">
              <p className="text-xs font-bold text-amber-800 mb-1">Note private (solo tutor e Ivan)</p>
              {lesson.privateNotes}
            </div>
          )}
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold uppercase text-slate-400 mb-3">Partecipanti ({participants.length})</p>
          <div className="flex flex-wrap gap-2">
            {participants.map((p) => (
              <Link
                key={p.id}
                to={`/area-personale/tutor/gruppi/${lesson.groupId}/studente/${p.id}`}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border ${
                  p.isGuest ? "bg-violet-50 text-violet-700 border-violet-100" : "bg-blue-50 text-blue-700 border-blue-100"
                }`}
                title={p.displayName}
              >
                {p.initials}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button type="button" onClick={() => setAttendanceOpen(true)} className="px-3 py-2 text-sm font-semibold rounded-xl border border-slate-200">Registra presenze</button>
        {!isCompleted && (
          <button type="button" onClick={() => setCompleteOpen(true)} className="px-3 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white">Completa lezione</button>
        )}
        <button type="button" onClick={() => setCancelOpen(true)} className="px-3 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-red-600">Annulla lezione</button>
      </div>

      {lesson.type === "prova" && <TrialEvaluationForm guest={MOCK_GUEST} />}

      <LessonCompletionModal open={completeOpen} lesson={lesson} onClose={() => setCompleteOpen(false)} onComplete={() => setLocalStatus("svolta")} />
      <CancelLessonDialog open={cancelOpen} onClose={() => setCancelOpen(false)} />
      <AttendancePanel open={attendanceOpen} lesson={lesson} onClose={() => setAttendanceOpen(false)} />
    </div>
  );
};

export default TutorLezioneDetail;
