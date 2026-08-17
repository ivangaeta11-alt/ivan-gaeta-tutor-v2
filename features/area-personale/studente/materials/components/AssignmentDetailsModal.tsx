import React, { useRef, useState } from "react";
import { Download, Upload } from "lucide-react";
import type { MaterialAssignment } from "../types";
import MaterialStatusBadge from "./MaterialStatusBadge";
import { formatDateShort } from "../../utils/format";
import { useMaterials } from "../context/MaterialsContext";
import { isArchivedWorkspace } from "../utils/permissions";

interface AssignmentDetailsModalProps {
  assignment: MaterialAssignment;
  onClose: () => void;
}

const AssignmentDetailsModal: React.FC<AssignmentDetailsModalProps> = ({
  assignment,
  onClose,
}) => {
  const { currentWorkspace, updateAssignment, permissions } = useMaterials();
  const [comment, setComment] = useState(assignment.studentComment ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const readOnly =
    !permissions.canUpload ||
    (currentWorkspace ? isArchivedWorkspace(currentWorkspace) : true);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || readOnly) return;
    updateAssignment(assignment.id, {
      studentFile: { name: file.name, uploadedAt: new Date().toISOString().slice(0, 10) },
      status: "consegnata",
    });
    e.target.value = "";
  };

  const handleReplace = () => {
    if (readOnly) return;
    fileInputRef.current?.click();
  };

  const saveComment = () => {
    if (readOnly) return;
    updateAssignment(assignment.id, { studentComment: comment });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/40">
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 bg-white rounded-3xl border border-slate-100 shadow-xl min-w-0"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900 break-words">{assignment.title}</h2>
            <p className="text-sm text-slate-500 mt-1">
              {assignment.subject} · {assignment.tutorName}
            </p>
          </div>
          <MaterialStatusBadge status={assignment.status} />
        </div>

        <div className="mb-4 p-3 rounded-xl bg-violet-50/60 border border-violet-100 text-xs text-violet-800">
          Area privata: accessibile a te, al tutor assegnato e a Ivan. Gli altri studenti del
          gruppo non possono visualizzare questa consegna.
        </div>

        <section className="mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Istruzioni
          </h3>
          <p className="text-sm text-slate-600 font-light break-words">{assignment.instructions}</p>
          <p className="text-xs text-slate-400 mt-2">
            Pubblicata il {formatDateShort(assignment.publishedAt)}
            {assignment.dueDate && ` · Scadenza: ${formatDateShort(assignment.dueDate)}`}
          </p>
        </section>

        <section className="mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Allegati del tutor
          </h3>
          <ul className="space-y-2">
            {assignment.tutorAttachments.map((att) => (
              <li key={att.id}>
                <button
                  type="button"
                  onClick={() => window.alert(`Download simulato: ${att.name}`)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  {att.name}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            La tua soluzione
          </h3>
          {assignment.studentFile ? (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm">
              <p className="font-medium text-slate-800">{assignment.studentFile.name}</p>
              <p className="text-xs text-slate-400 mt-1">
                Caricata il {formatDateShort(assignment.studentFile.uploadedAt)}
              </p>
              {!readOnly && (
                <button
                  type="button"
                  onClick={handleReplace}
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600"
                >
                  <Upload className="w-4 h-4" /> Sostituisci file
                </button>
              )}
            </div>
          ) : (
            !readOnly && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border border-dashed border-slate-300 text-slate-600 hover:border-blue-300 hover:text-blue-600"
              >
                <Upload className="w-4 h-4" /> Carica soluzione
              </button>
            )
          )}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleUpload}
          />
        </section>

        <section className="mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Commento
          </h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={readOnly}
            rows={2}
            placeholder="Aggiungi un commento per il tutor..."
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 disabled:bg-slate-50"
          />
          {!readOnly && (
            <button
              type="button"
              onClick={saveComment}
              className="mt-2 text-sm font-semibold text-blue-600"
            >
              Salva commento
            </button>
          )}
        </section>

        {assignment.tutorCorrection && (
          <section className="mb-6 p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
              Correzione del tutor
            </h3>
            <p className="text-sm text-slate-700 font-light break-words">
              {assignment.tutorCorrection}
            </p>
          </section>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetailsModal;
