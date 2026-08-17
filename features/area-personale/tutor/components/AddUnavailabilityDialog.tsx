import React, { useState } from "react";

interface AddUnavailabilityDialogProps {
  open: boolean;
  onConfirm: (input: { start: string; end: string; reason: string }) => void;
  onCancel: () => void;
}

const AddUnavailabilityDialog: React.FC<AddUnavailabilityDialogProps> = ({
  open,
  onConfirm,
  onCancel,
}) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reason, setReason] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!start || !end || !reason.trim() || start > end) return;
    onConfirm({ start, end, reason: reason.trim() });
    setStart("");
    setEnd("");
    setReason("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/40">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-3xl border border-slate-100 shadow-xl min-w-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-unavailability-title"
      >
        <h2 id="add-unavailability-title" className="text-lg font-bold text-slate-900 mb-1">
          Blocca periodo di indisponibilità
        </h2>
        <p className="text-sm text-slate-500 mb-5 font-light">
          In questo intervallo non sarà possibile prenotare nuove lezioni (demo).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <label className="block">
            <span className="text-xs font-semibold text-slate-600">Dal</span>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="mt-1 w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
              required
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-slate-600">Al</span>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="mt-1 w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
              required
            />
          </label>
        </div>

        <label className="block mb-6">
          <span className="text-xs font-semibold text-slate-600">Motivo</span>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
            placeholder="Es. Ferie, impegno personale..."
            required
          />
        </label>

        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600"
          >
            Annulla
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-red-600 text-white hover:bg-red-700"
          >
            Blocca date
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUnavailabilityDialog;
