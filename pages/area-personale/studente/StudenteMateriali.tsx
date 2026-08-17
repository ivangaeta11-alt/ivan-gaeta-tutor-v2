import React from "react";
import { Upload } from "lucide-react";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import { MOCK_SUBMISSIONS, MOCK_TUTOR_MATERIALS } from "../../../features/area-personale/studente/data";
import { SUBMISSION_STATUS_LABELS } from "../../../features/area-personale/studente/types";
import { formatDateShort } from "../../../features/area-personale/studente/utils/format";

const SECTION_TITLES = {
  dispensa: "Dispense",
  formulario: "Formulari",
  esercizi: "Esercizi",
  registrazione: "Registrazioni",
} as const;

const SUBMISSION_STYLES = {
  da_consegnare: "bg-amber-50 text-amber-700 border-amber-100",
  da_correggere: "bg-blue-50 text-blue-700 border-blue-100",
  corretta: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

const StudenteMateriali: React.FC = () => {
  const byType = (type: string) => MOCK_TUTOR_MATERIALS.filter((m) => m.type === type);

  return (
    <div>
      <PageHeader
        title="Materiali"
        description="Dispense, esercizi e registrazioni del tutor, più le tue consegne."
      />

      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
          Materiali del tutor
        </h2>

        {(["dispensa", "formulario", "esercizi", "registrazione"] as const).map((type) => {
          const items = byType(type);
          if (items.length === 0) return null;
          return (
            <div key={type} className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                {SECTION_TITLES[type]}
              </h3>
              <div className="space-y-2">
                {items.map((mat) => (
                  <div
                    key={mat.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-100"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{mat.title}</p>
                      <p className="text-xs text-slate-400">{formatDateShort(mat.date)}</p>
                    </div>
                    <button
                      type="button"
                      className="shrink-0 px-4 py-2 text-sm font-semibold rounded-xl bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors"
                    >
                      Apri
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Le mie consegne</h2>
        <div className="space-y-3 mb-6">
          {MOCK_SUBMISSIONS.map((sub) => (
            <div
              key={sub.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-100"
            >
              <div>
                <p className="font-medium text-slate-900">{sub.title}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {sub.dueDate
                    ? `Scadenza: ${formatDateShort(sub.dueDate)}`
                    : sub.submittedDate
                      ? `Consegnata: ${formatDateShort(sub.submittedDate)}`
                      : null}
                </p>
              </div>
              <span
                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${SUBMISSION_STYLES[sub.status]}`}
              >
                {SUBMISSION_STATUS_LABELS[sub.status]}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl border border-dashed border-slate-300 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
        >
          <Upload className="w-4 h-4" aria-hidden />
          Carica file (demo)
        </button>
      </section>
    </div>
  );
};

export default StudenteMateriali;
