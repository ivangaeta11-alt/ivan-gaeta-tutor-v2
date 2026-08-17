import React, { useState } from "react";

interface AddAvailabilityDialogProps {
  open: boolean;
  defaultDate?: string;
  onConfirm: (input: { date: string; startTime: string; endTime: string }) => void;
  onCancel: () => void;
}

const AddAvailabilityDialog: React.FC<AddAvailabilityDialogProps> = ({
  open,
  defaultDate,
  onConfirm,
  onCancel,
}) => {
  const [date, setDate] = useState(defaultDate ?? "");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("11:00");

  React.useEffect(() => {
    if (open && defaultDate) setDate(defaultDate);
  }, [open, defaultDate]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !startTime || !endTime || startTime >= endTime) return;
    onConfirm({ date, startTime, endTime });
    setStartTime("09:00");
    setEndTime("11:00");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/40">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-3xl border border-slate-100 shadow-xl min-w-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-availability-title"
      >
        <h2 id="add-availability-title" className="text-lg font-bold text-slate-900 mb-1">
          Aggiungi disponibilità
        </h2>
        <p className="text-sm text-slate-500 mb-5 font-light">
          Gli studenti potranno prenotare lezioni individuali negli slot indicati (demo).
        </p>

        <label className="block mb-4">
          <span className="text-xs font-semibold text-slate-600">Data</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
            required
          />
        </label>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <label className="block">
            <span className="text-xs font-semibold text-slate-600">Inizio</span>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
              required
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-slate-600">Fine</span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
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
            Salva disponibilità
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAvailabilityDialog;
