import React from "react";
import { Link } from "react-router-dom";
import type { RequiredAction } from "../types";
import { formatDateShort } from "../../studente/utils/format";

const PRIORITY_STYLES = {
  alta: "bg-red-50 text-red-700 border-red-100",
  media: "bg-amber-50 text-amber-700 border-amber-100",
  bassa: "bg-slate-100 text-slate-600 border-slate-200",
};

interface TutorRequiredActionsProps {
  actions: RequiredAction[];
}

const TutorRequiredActions: React.FC<TutorRequiredActionsProps> = ({ actions }) => (
  <section>
    <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Azioni richieste</h2>
    <div className="space-y-3">
      {actions.map((action) => (
        <div
          key={action.id}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {action.type}
              </span>
              <span
                className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold border ${PRIORITY_STYLES[action.priority]}`}
              >
                {action.priority}
              </span>
            </div>
            <p className="font-medium text-slate-900">{action.title}</p>
            {action.dueDate && (
              <p className="text-xs text-slate-400 mt-1">Scadenza: {formatDateShort(action.dueDate)}</p>
            )}
          </div>
          <Link
            to={
              action.type === "Consegne"
                ? "/area-personale/tutor/materiali"
                : action.type === "Prova"
                  ? `/area-personale/tutor/gruppi/grp_smf_01/studente/gst_001`
                  : action.type === "Calendario" || action.type === "Lezione"
                    ? "/area-personale/tutor/calendario"
                    : "/area-personale/tutor/materiali"
            }
            className="shrink-0 px-4 py-2 text-sm font-semibold rounded-xl bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors text-center"
          >
            {action.actionLabel}
          </Link>
        </div>
      ))}
    </div>
  </section>
);

export default TutorRequiredActions;
