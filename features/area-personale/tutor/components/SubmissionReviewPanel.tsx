import React, { useState } from "react";
import type { TutorSubmission } from "../types";
import { SUBMISSION_STATUS_LABELS } from "../types";

interface SubmissionReviewPanelProps {
  submission: TutorSubmission;
  onClose: () => void;
}

const SubmissionReviewPanel: React.FC<SubmissionReviewPanelProps> = ({ submission, onClose }) => {
  const [comment, setComment] = useState("");
  const [corrected, setCorrected] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/40">
      <div className="w-full max-w-md p-6 bg-white rounded-3xl border border-slate-100 shadow-xl">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Correggi consegna</h2>
        <p className="text-sm text-slate-500 mb-4">{submission.exerciseTitle}</p>

        <dl className="text-sm space-y-2 mb-4">
          <div><dt className="text-slate-400 inline">Studente: </dt><dd className="inline text-slate-800">{submission.studentName}</dd></div>
          <div><dt className="text-slate-400 inline">Gruppo: </dt><dd className="inline text-slate-800">{submission.groupName}</dd></div>
          {submission.fileName && (
            <div><dt className="text-slate-400 inline">File: </dt><dd className="inline font-mono text-slate-700">{submission.fileName}</dd></div>
          )}
        </dl>

        {corrected ? (
          <p className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-sm mb-4">
            Stato aggiornato a: {SUBMISSION_STATUS_LABELS.corretta} (demo)
          </p>
        ) : (
          <>
            <label className="block mb-4">
              <span className="text-sm font-semibold text-slate-700">Commento</span>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
            </label>
            <button type="button" className="mb-4 text-sm text-blue-600 font-semibold">
              + Allega correzione (demo)
            </button>
          </>
        )}

        <div className="flex gap-3 justify-end">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600">
            Chiudi
          </button>
          {!corrected && (
            <button
              type="button"
              onClick={() => setCorrected(true)}
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Segna come corretta
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionReviewPanel;
