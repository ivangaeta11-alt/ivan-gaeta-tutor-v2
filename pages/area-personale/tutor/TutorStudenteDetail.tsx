import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import TrialEvaluationForm from "../../../features/area-personale/tutor/components/TrialEvaluationForm";
import {
  getGroupById,
  getStudentById,
  MOCK_GUEST,
  MOCK_SUBMISSIONS,
} from "../../../features/area-personale/tutor/data";
import { SUBMISSION_STATUS_LABELS } from "../../../features/area-personale/tutor/types";

const TutorStudenteDetail: React.FC = () => {
  const { groupId, studentId } = useParams<{ groupId: string; studentId: string }>();
  const student = studentId ? getStudentById(studentId) : undefined;
  const group = groupId ? getGroupById(groupId) : undefined;

  if (!student || !group) return <Navigate to={`/area-personale/tutor/gruppi/${groupId ?? ""}`} replace />;

  const submissions = MOCK_SUBMISSIONS.filter((s) => s.studentId === student.id);
  const isGuest = student.isGuest;

  return (
    <div>
      <Link to={`/area-personale/tutor/gruppi/${group.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Torna al gruppo
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border ${isGuest ? "bg-violet-50 text-violet-700 border-violet-100" : "bg-blue-50 text-blue-700 border-blue-100"}`}>
          {student.initials}
        </div>
        <div>
          <PageHeader title={student.displayName} description={`${group.name} · ${group.subject}`} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white rounded-2xl border border-slate-100">
          <p className="text-xs text-slate-400">Livello iniziale</p>
          <p className="font-bold text-slate-900">{student.initialLevel}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-100">
          <p className="text-xs text-slate-400">Lezioni frequentate</p>
          <p className="font-bold text-slate-900">{student.lessonsAttended}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-100">
          <p className="text-xs text-slate-400">Assenze</p>
          <p className="font-bold text-slate-900">{student.absences}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-100">
          <p className="text-xs text-slate-400">Gruppo attuale</p>
          <p className="font-bold text-slate-900">{group.name}</p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-3">Obiettivi</h2>
        <ul className="text-sm text-slate-600 list-disc pl-5">{student.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-3">Consegne</h2>
        <div className="space-y-2">
          {submissions.map((s) => (
            <div key={s.id} className="flex justify-between p-3 bg-white rounded-xl border border-slate-100 text-sm">
              <span>{s.exerciseTitle}</span>
              <span className="text-slate-500">{SUBMISSION_STATUS_LABELS[s.status]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-3">Note didattiche private</h2>
        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 text-sm text-slate-600">
          Visibili solo al tutor assegnato e a Ivan. Nessun dato di pagamento o referral.
          <textarea className="mt-3 w-full px-3 py-2 rounded-xl border border-amber-100 bg-white text-sm" rows={3} placeholder="Aggiungi note (demo locale)..." />
        </div>
      </section>

      {isGuest && studentId === MOCK_GUEST.id && (
        <TrialEvaluationForm guest={MOCK_GUEST} />
      )}
    </div>
  );
};

export default TutorStudenteDetail;
