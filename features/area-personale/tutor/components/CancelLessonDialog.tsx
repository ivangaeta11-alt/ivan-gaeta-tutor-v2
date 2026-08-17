import React, { useState } from "react";

interface CancelLessonDialogProps {
  open: boolean;
  onClose: () => void;
}

const CancelLessonDialog: React.FC<CancelLessonDialogProps> = ({ open, onClose }) => {
  const [reason, setReason] = useState("");

  if (!open) return null;

  const canConfirm = reason.trim().length >= 10;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
      <div className="w-full max-w-md p-6 bg-white rounded-3xl border border-slate-100 shadow-xl" role="dialog" aria-modal="true">
        <h2 className="text-lg font-bold text-slate-900 mb-2">Annulla lezione</h2>
        <p className="text-sm text-slate-500 font-light mb-4">
          Annullando la lezione, i crediti del gruppo verranno restituiti al wallet collettivo.
          Gli studenti riceveranno una notifica. Questa azione è simulata in demo.
        </p>
        <label className="block mb-6">
          <span className="text-sm font-semibold text-slate-700 mb-2 block">
            Motivo dell&apos;annullamento *
          </span>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            placeholder="Descrivi il motivo (minimo 10 caratteri)"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-100"
          />
        </label>
        <div className="flex flex-wrap gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            Indietro
          </button>
          <button
            type="button"
            disabled={!canConfirm}
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Annulla lezione
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelLessonDialog;
