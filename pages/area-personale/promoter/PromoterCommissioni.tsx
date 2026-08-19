import React, { useMemo, useState } from "react";
import { X } from "lucide-react";
import PageHeader from "../../../features/area-personale/promoter/components/PageHeader";
import KpiGrid from "../../../features/area-personale/promoter/components/KpiGrid";
import CommissionStatusBadge from "../../../features/area-personale/promoter/components/CommissionStatusBadge";
import ResponsiveTable from "../../../features/area-personale/promoter/components/ResponsiveTable";
import HowYouEarnCard from "../../../features/area-personale/promoter/components/HowYouEarnCard";
import {
  promoterDemo,
  promoterCommissionKpis,
  getStudentLabel,
} from "../../../features/area-personale/promoter/data";
import type { CommissionMovement, PayoutRecord } from "../../../features/area-personale/promoter/types";
import { getMovementsForPayout } from "../../../features/area-personale/promoter/utils/calculations";
import { formatCurrency, formatDate, formatDateLong } from "../../../features/area-personale/promoter/utils/format";
import { PAYOUT_STATUS_LABELS } from "../../../features/area-personale/promoter/types";
import {
  TABLE_CELL,
  TABLE_HEAD,
  TABLE_ROW_CLICKABLE,
} from "../../../features/area-personale/promoter/components/tableStyles";

type TabId = "movimenti" | "liquidazioni";

const PromoterCommissioni: React.FC = () => {
  const [tab, setTab] = useState<TabId>("movimenti");
  const [selectedMovement, setSelectedMovement] = useState<CommissionMovement | null>(null);
  const [selectedPayout, setSelectedPayout] = useState<PayoutRecord | null>(null);

  const movements = useMemo(
    () => [...promoterDemo.movements].sort((a, b) => b.purchaseDate.localeCompare(a.purchaseDate)),
    []
  );

  const payouts = useMemo(
    () => [...promoterDemo.payouts].sort((a, b) => b.payoutDate.localeCompare(a.payoutDate)),
    []
  );

  const payoutMovements = selectedPayout
    ? getMovementsForPayout(selectedPayout, promoterDemo.movements)
    : [];

  return (
    <div className="min-w-0 max-w-full">
      <PageHeader
        title="Commissioni"
        description="Estratto conto delle commissioni maturate, liquidabili e pagate."
      />

      <KpiGrid
        items={[
          { label: "In maturazione", value: formatCurrency(promoterCommissionKpis.maturing) },
          { label: "Liquidabili", value: formatCurrency(promoterCommissionKpis.liquidable) },
          { label: "Pagate", value: formatCurrency(promoterCommissionKpis.paid) },
        ]}
      />

      <div className="mt-8 flex gap-2 border-b border-slate-100 mb-6">
        {(["movimenti", "liquidazioni"] as TabId[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`px-4 py-2 text-sm font-semibold capitalize border-b-2 -mb-px transition-colors ${
              tab === id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {id === "movimenti" ? "Movimenti" : "Liquidazioni"}
          </button>
        ))}
      </div>

      {tab === "movimenti" && (
        <>
          <div className="sm:hidden space-y-3 mb-8">
            {movements.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMovement(m)}
                className="w-full text-left p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200"
              >
                <div className="flex flex-wrap justify-between gap-2 mb-2">
                  <span className="font-semibold text-slate-900">{getStudentLabel(m.studentId)}</span>
                  <CommissionStatusBadge status={m.status} />
                </div>
                <p className="text-xs text-slate-500">{formatDate(m.purchaseDate)}</p>
                <p className="text-sm text-slate-700 mt-1">
                  {formatCurrency(m.purchaseAmount)} →{" "}
                  <span className="font-semibold text-emerald-700">
                    +{formatCurrency(m.commissionAmount)}
                  </span>
                </p>
                {m.status !== "stornata" && (
                  <p className="text-xs text-slate-400 mt-1">
                    Liquidabile dal {formatDate(m.liquidableFrom)}
                  </p>
                )}
              </button>
            ))}
          </div>

          <div className="hidden sm:block bg-white rounded-3xl border border-slate-100 shadow-sm min-w-0 mb-8">
            <ResponsiveTable>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className={TABLE_HEAD}>Data</th>
                    <th className={TABLE_HEAD}>Studente</th>
                    <th className={TABLE_HEAD}>Acquisto</th>
                    <th className={TABLE_HEAD}>Commissione</th>
                    <th className={TABLE_HEAD}>Stato</th>
                    <th className={TABLE_HEAD}>Liquidabile dal</th>
                  </tr>
                </thead>
                <tbody>
                  {movements.map((m) => (
                    <tr
                      key={m.id}
                      className={TABLE_ROW_CLICKABLE}
                      onClick={() => setSelectedMovement(m)}
                    >
                      <td className={TABLE_CELL}>{formatDate(m.purchaseDate)}</td>
                      <td className={TABLE_CELL}>{getStudentLabel(m.studentId)}</td>
                      <td className={TABLE_CELL}>{formatCurrency(m.purchaseAmount)}</td>
                      <td className={`${TABLE_CELL} font-semibold text-emerald-700`}>
                        +{formatCurrency(m.commissionAmount)}
                      </td>
                      <td className={TABLE_CELL}>
                        <CommissionStatusBadge status={m.status} />
                      </td>
                      <td className={TABLE_CELL}>
                        {m.status === "stornata" ? "N/D" : formatDate(m.liquidableFrom)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ResponsiveTable>
          </div>
        </>
      )}

      {tab === "liquidazioni" && (
        <>
          <div className="sm:hidden space-y-3 mb-8">
            {payouts.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPayout(p)}
                className="w-full text-left p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
              >
                <p className="font-semibold text-slate-900">{formatDate(p.payoutDate)}</p>
                <p className="text-lg font-extrabold text-slate-800 mt-1">
                  {formatCurrency(p.amount)}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {p.commissionCount} commissioni · {PAYOUT_STATUS_LABELS[p.status]}
                </p>
              </button>
            ))}
          </div>

          <div className="hidden sm:block bg-white rounded-3xl border border-slate-100 shadow-sm min-w-0 mb-8">
            <ResponsiveTable>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className={TABLE_HEAD}>Data</th>
                    <th className={TABLE_HEAD}>Importo</th>
                    <th className={TABLE_HEAD}>Commissioni incluse</th>
                    <th className={TABLE_HEAD}>Stato</th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((p) => (
                    <tr
                      key={p.id}
                      className={TABLE_ROW_CLICKABLE}
                      onClick={() => setSelectedPayout(p)}
                    >
                      <td className={TABLE_CELL}>{formatDate(p.payoutDate)}</td>
                      <td className={`${TABLE_CELL} font-semibold`}>
                        {formatCurrency(p.amount)}
                      </td>
                      <td className={TABLE_CELL}>{p.commissionCount}</td>
                      <td className={TABLE_CELL}>{PAYOUT_STATUS_LABELS[p.status]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ResponsiveTable>
          </div>
        </>
      )}

      <HowYouEarnCard />

      {selectedMovement && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedMovement(null)}
        >
          <div
            className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="text-lg font-bold text-slate-900">Dettaglio commissione</h3>
              <button
                type="button"
                onClick={() => setSelectedMovement(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                aria-label="Chiudi"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-slate-400 text-xs font-semibold uppercase">Studente</dt>
                <dd className="text-slate-800">{getStudentLabel(selectedMovement.studentId)}</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-xs font-semibold uppercase">Data acquisto</dt>
                <dd className="text-slate-800">{formatDateLong(selectedMovement.purchaseDate)}</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-xs font-semibold uppercase">Importo acquisto</dt>
                <dd className="text-slate-800">{formatCurrency(selectedMovement.purchaseAmount)}</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-xs font-semibold uppercase">Commissione</dt>
                <dd className="text-emerald-700 font-semibold">
                  +{formatCurrency(selectedMovement.commissionAmount)}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 text-xs font-semibold uppercase">Stato</dt>
                <dd className="mt-1">
                  <CommissionStatusBadge status={selectedMovement.status} />
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 text-xs font-semibold uppercase">Data maturazione</dt>
                <dd className="text-slate-800">{formatDateLong(selectedMovement.liquidableFrom)}</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-xs font-semibold uppercase">
                  Prima liquidazione utile
                </dt>
                <dd className="text-slate-800">
                  {formatDateLong(selectedMovement.firstEligiblePayoutDate)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {selectedPayout && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPayout(null)}
        >
          <div
            className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                Liquidazione del {formatDate(selectedPayout.payoutDate)}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedPayout(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                aria-label="Chiudi"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 mb-4">
              {formatCurrency(selectedPayout.amount)}
            </p>
            {payoutMovements.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {payoutMovements.map((m) => (
                  <li
                    key={m.id}
                    className="flex justify-between gap-2 p-2 rounded-lg bg-slate-50"
                  >
                    <span className="text-slate-700">
                      {getStudentLabel(m.studentId)} · {formatDate(m.purchaseDate)}
                    </span>
                    <span className="font-semibold text-emerald-700 shrink-0">
                      +{formatCurrency(m.commissionAmount)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">
                Dettaglio commissioni non disponibile in demo ({selectedPayout.commissionCount}{" "}
                commissioni incluse).
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoterCommissioni;
