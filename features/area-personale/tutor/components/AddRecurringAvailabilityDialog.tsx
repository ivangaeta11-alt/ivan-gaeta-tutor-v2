import React, { useState } from "react";
import { WEEKDAY_OPTIONS } from "../data/tutorAvailabilitySession";

interface AddRecurringAvailabilityDialogProps {
  open: boolean;
  onConfirm: (input: { day: string; start: string; end: string }) => void;
  onCancel: () => void;
}

const AddRecurringAvailabilityDialog: React.FC<AddRecurringAvailabilityDialogProps> = ({
  open,
  onConfirm,
  onCancel,
}) => {
  const [day, setDay] = useState(WEEKDAY_OPTIONS[0]);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("13:00");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!day || !start || !end || start >= end) return;
    onConfirm({ day, start, end });
    setStart("09:00");
    setEnd("13:00");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/40">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-3xl border border-slate-100 shadow-xl min-w-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-recurring-title"
      >
        <h2 id="add-recurring-title" className="text-lg font-bold text-slate-900 mb-1">
          Aggiungi disponibilità ricorrente
        </h2>
        <p className="text-sm text-slate-500 mb-5 font-light">
          Fascia oraria che si ripete ogni settimana nello stesso giorno (demo).
        </p>

        <label className="block mb-4">
          <span className="text-xs font-semibold text-slate-600">Giorno</span>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="mt-1 w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white"
            required
          >
            {WEEKDAY_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <label className="block">
            <span className="text-xs font-semibold text-slate-600">Inizio</span>
            <input
              type="time"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="mt-1 w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
              required
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-slate-600">Fine</span>
            <input
              type="time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="mt-1 w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
              required
            />
          </label>
        </div>

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
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            Salva fascia ricorrente
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecurringAvailabilityDialog;
