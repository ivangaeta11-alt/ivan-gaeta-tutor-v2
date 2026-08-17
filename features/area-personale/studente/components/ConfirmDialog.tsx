import React from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmLabel = "Conferma",
  cancelLabel = "Annulla",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
      <div
        className="w-full max-w-md p-6 bg-white rounded-3xl border border-slate-100 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <h2 id="confirm-title" className="text-lg font-bold text-slate-900 mb-2">
          {title}
        </h2>
        <p className="text-sm text-slate-500 font-light mb-6">{message}</p>
        <div className="flex flex-wrap gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
