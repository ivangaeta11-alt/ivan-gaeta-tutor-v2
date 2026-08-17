import React, { useState } from "react";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import SubmissionReviewPanel from "../../../features/area-personale/tutor/components/SubmissionReviewPanel";
import ConfirmDialog from "../../../features/area-personale/studente/components/ConfirmDialog";
import {
  MOCK_LIBRARY,
  MOCK_PUBLISHED,
  MOCK_SUBMISSIONS,
} from "../../../features/area-personale/tutor/data";
import { MATERIAL_TYPE_LABELS, SUBMISSION_STATUS_LABELS } from "../../../features/area-personale/tutor/types";
import { formatDateShort } from "../../../features/area-personale/studente/utils/format";
import type { TutorSubmission } from "../../../features/area-personale/tutor/types";

const SUBMISSION_STYLES = {
  da_consegnare: "bg-amber-50 text-amber-700 border-amber-100",
  consegnata: "bg-slate-100 text-slate-600 border-slate-200",
  da_correggere: "bg-blue-50 text-blue-700 border-blue-100",
  corretta: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

const TutorMateriali: React.FC = () => {
  const [reviewing, setReviewing] = useState<TutorSubmission | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div>
      <PageHeader title="Materiali e consegne" description="Libreria personale, materiali pubblicati e correzione consegne." />

      <section className="mb-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-xl font-bold text-slate-900">Libreria del tutor</h2>
          <button type="button" className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white">Nuovo materiale (demo)</button>
        </div>
        <div className="space-y-2">
          {MOCK_LIBRARY.map((m) => (
            <div key={m.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-100">
              <div>
                <p className="text-xs text-slate-400">{MATERIAL_TYPE_LABELS[m.type]}</p>
                <p className="font-medium text-slate-900">{m.title}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200">Assegna a gruppo</button>
                <button type="button" className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200">Assegna a studente</button>
                <button type="button" className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-100">Visualizza</button>
                <button type="button" onClick={() => setDeleteOpen(true)} className="px-3 py-1.5 text-xs font-semibold rounded-lg text-red-600 border border-red-100">Elimina</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Materiali pubblicati</h2>
        <div className="max-w-full overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[640px] bg-white rounded-2xl border border-slate-100">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                {["Titolo", "Tipo", "Destinatario", "Data", "Autore", "Stato"].map((h) => (
                  <th key={h} className="text-left text-xs font-bold uppercase text-slate-400 px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_PUBLISHED.map((m) => (
                <tr key={m.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-4 py-3 text-sm font-medium">{m.title}</td>
                  <td className="px-4 py-3 text-sm">{MATERIAL_TYPE_LABELS[m.type]}</td>
                  <td className="px-4 py-3 text-sm">{m.target}</td>
                  <td className="px-4 py-3 text-sm">{formatDateShort(m.date)}</td>
                  <td className="px-4 py-3 text-sm">{m.author}</td>
                  <td className="px-4 py-3 text-sm">{m.published ? "Pubblicato" : "Bozza"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Consegne degli studenti</h2>
        <div className="space-y-3 sm:hidden">
          {MOCK_SUBMISSIONS.map((s) => (
            <div key={s.id} className="p-4 bg-white rounded-2xl border border-slate-100">
              <p className="font-medium">{s.studentName}</p>
              <p className="text-sm text-slate-500">{s.exerciseTitle}</p>
              <span className={`inline-flex mt-2 px-2 py-0.5 rounded-full text-xs border ${SUBMISSION_STYLES[s.status]}`}>
                {SUBMISSION_STATUS_LABELS[s.status]}
              </span>
              {s.status === "da_correggere" && (
                <button type="button" onClick={() => setReviewing(s)} className="mt-3 block text-sm font-semibold text-blue-600">Correggi</button>
              )}
            </div>
          ))}
        </div>
        <div className="hidden sm:block max-w-full overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[640px] bg-white rounded-2xl border border-slate-100">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                {["Studente", "Gruppo", "Esercizio", "Data", "Stato", ""].map((h) => (
                  <th key={h} className="text-left text-xs font-bold uppercase text-slate-400 px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_SUBMISSIONS.map((s) => (
                <tr key={s.id} className="border-b border-slate-50">
                  <td className="px-4 py-3 text-sm">{s.studentName}</td>
                  <td className="px-4 py-3 text-sm">{s.groupName}</td>
                  <td className="px-4 py-3 text-sm">{s.exerciseTitle}</td>
                  <td className="px-4 py-3 text-sm">{s.submittedDate ? formatDateShort(s.submittedDate) : "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs border ${SUBMISSION_STYLES[s.status]}`}>
                      {SUBMISSION_STATUS_LABELS[s.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {s.status === "da_correggere" && (
                      <button type="button" onClick={() => setReviewing(s)} className="text-sm font-semibold text-blue-600">Correggi</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {reviewing && <SubmissionReviewPanel submission={reviewing} onClose={() => setReviewing(null)} />}
      <ConfirmDialog open={deleteOpen} title="Elimina materiale" message="Confermi l'eliminazione? Azione simulata in demo." confirmLabel="Elimina" onConfirm={() => setDeleteOpen(false)} onCancel={() => setDeleteOpen(false)} />
    </div>
  );
};

export default TutorMateriali;
