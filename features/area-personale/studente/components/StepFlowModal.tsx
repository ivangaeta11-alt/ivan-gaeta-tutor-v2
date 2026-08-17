import React from "react";

interface StepFlowModalProps {
  open: boolean;
  title: string;
  step: number;
  totalSteps: number;
  stepLabel?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const StepFlowModal: React.FC<StepFlowModalProps> = ({
  open,
  title,
  step,
  totalSteps,
  stepLabel,
  onClose,
  children,
  footer,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/40">
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 bg-white rounded-3xl border border-slate-100 shadow-xl min-w-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="flow-modal-title"
      >
        <div className="flex items-start justify-between gap-4 mb-4 min-w-0">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              Passaggio {step} di {totalSteps}
              {stepLabel ? ` · ${stepLabel}` : ""}
            </p>
            <h2 id="flow-modal-title" className="text-lg font-bold text-slate-900 break-words">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 px-2 py-1 text-sm font-semibold text-slate-400 hover:text-slate-600"
          >
            Chiudi
          </button>
        </div>

        <div className="mb-6 min-w-0">{children}</div>

        {footer && <div className="flex flex-wrap gap-3 justify-end">{footer}</div>}
      </div>
    </div>
  );
};

export default StepFlowModal;
