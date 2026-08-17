import React from "react";
import type { BookingPriceSummary } from "../types";
import { CREDIT_EURO_RATIO } from "../data";
import { formatCreditsBalance, formatDate, formatTimeRange } from "../utils/format";
import InfoNotice from "./InfoNotice";

interface CreditPaymentSummaryProps {
  summary: BookingPriceSummary;
  showWithin24HoursWarning?: boolean;
  within24HoursAcknowledged?: boolean;
  onWithin24HoursAckChange?: (ack: boolean) => void;
  onPurchaseMissing?: () => void;
}

const CreditPaymentSummary: React.FC<CreditPaymentSummaryProps> = ({
  summary,
  showWithin24HoursWarning,
  within24HoursAcknowledged,
  onWithin24HoursAckChange,
  onPurchaseMissing,
}) => {
  return (
    <div className="space-y-4 min-w-0">
      <dl className="grid gap-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Materia</dt>
          <dd className="font-medium text-slate-800 text-right break-words">{summary.subject}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Tutor</dt>
          <dd className="font-medium text-slate-800 text-right break-words">{summary.tutorName}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Data</dt>
          <dd className="font-medium text-slate-800 text-right break-words">
            {formatDate(summary.date)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Orario</dt>
          <dd className="font-medium text-slate-800 text-right">
            {formatTimeRange(summary.startTime, summary.endTime)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Durata</dt>
          <dd className="font-medium text-slate-800 text-right">{summary.durationMinutes} min</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-slate-100 pt-3">
          <dt className="text-slate-500">Costo totale</dt>
          <dd className="font-bold text-slate-900 text-right">
            {formatCreditsBalance(summary.totalCost)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Saldo wallet personale</dt>
          <dd className="font-medium text-slate-800 text-right">
            {formatCreditsBalance(summary.walletBalance)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Saldo residuo dopo prenotazione</dt>
          <dd
            className={`font-bold text-right ${
              summary.sufficient ? "text-emerald-700" : "text-red-600"
            }`}
          >
            {formatCreditsBalance(summary.remainingBalance)}
          </dd>
        </div>
      </dl>

      <p className="text-xs text-slate-400">
        {CREDIT_EURO_RATIO} credito = {CREDIT_EURO_RATIO} €
      </p>

      <InfoNotice>
        Cancellazione e riprogrammazione gratuite fino a 24 ore prima. Entro le 24 ore non sono
        consentite. I crediti restituiti tornano al wallet personale.
      </InfoNotice>

      {showWithin24HoursWarning && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-sm text-amber-800">
          <p className="font-medium mb-2">
            Questa lezione inizierà tra meno di 24 ore e non potrà essere annullata o
            riprogrammata.
          </p>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={within24HoursAcknowledged ?? false}
              onChange={(e) => onWithin24HoursAckChange?.(e.target.checked)}
              className="mt-1"
            />
            <span>Ho compreso e desidero procedere</span>
          </label>
        </div>
      )}

      {!summary.sufficient && (
        <div className="p-4 rounded-xl bg-red-50/60 border border-red-100 text-sm">
          <p className="font-semibold text-red-800 mb-2">Crediti insufficienti</p>
          <ul className="space-y-1 text-red-700">
            <li>Crediti disponibili: {formatCreditsBalance(summary.walletBalance)}</li>
            <li>Crediti necessari: {formatCreditsBalance(summary.totalCost)}</li>
            <li>Crediti mancanti: {formatCreditsBalance(summary.missingCredits)}</li>
          </ul>
          {onPurchaseMissing && (
            <button
              type="button"
              onClick={onPurchaseMissing}
              className="mt-3 px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Acquista i crediti mancanti
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CreditPaymentSummary;
