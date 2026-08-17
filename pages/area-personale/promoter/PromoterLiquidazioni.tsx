import React from "react";
import PageHeader from "../../../features/area-personale/promoter/components/PageHeader";
import ResponsiveTable from "../../../features/area-personale/promoter/components/ResponsiveTable";
import PayoutStatusBadge from "../../../features/area-personale/promoter/components/PayoutStatusBadge";
import {
  TABLE_CELL,
  TABLE_HEAD,
  TABLE_ROW,
} from "../../../features/area-personale/promoter/components/tableStyles";
import { promoterDemo, promoterKpis } from "../../../features/area-personale/promoter/data";
import { DEMO_PAYOUTS_DISPLAY } from "../../../features/area-personale/promoter/data/demoData";
import {
  formatCurrency,
  formatDate,
  formatDateLong,
  formatPeriod,
} from "../../../features/area-personale/promoter/utils/format";

const PromoterLiquidazioni: React.FC = () => {
  const { promoter } = promoterDemo;
  const payouts = [...DEMO_PAYOUTS_DISPLAY].reverse();

  return (
    <div className="min-w-0 max-w-full">
      <PageHeader
        title="Liquidazioni"
        description="Storico dei pagamenti commissioni. Le commissioni maturate diventano liquidabili a fine periodo."
      />

      <div className="grid sm:grid-cols-3 gap-4 mb-8 min-w-0">
        <div className="p-5 md:p-6 bg-amber-50/60 rounded-2xl border border-amber-100 sm:col-span-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700/70 mb-2 break-words">
            Commissioni da liquidare
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight break-words">
            {formatCurrency(promoterKpis.pendingPayout)}
          </p>
          <p className="text-xs text-slate-500 font-light mt-2 break-words">
            Non ancora pagate — periodo in corso
          </p>
        </div>
        <div className="p-5 md:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 break-words">
            Ultima liquidazione
          </p>
          <p className="text-lg font-bold text-slate-900 break-words">
            {formatDateLong(promoter.lastPayoutDate)}
          </p>
        </div>
        <div className="p-5 md:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 break-words">
            Prossima liquidazione prevista
          </p>
          <p className="text-lg font-bold text-slate-900 break-words">
            {formatDateLong(promoter.nextPayoutDate)}
          </p>
        </div>
      </div>

      <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm text-slate-600 font-light min-w-0 break-words">
        <p>
          <span className="font-semibold text-slate-800">Commissioni maturate totali:</span>{" "}
          {formatCurrency(promoterKpis.totalCommissions)}
        </p>
        <p className="mt-1">
          <span className="font-semibold text-slate-800">Già liquidate:</span>{" "}
          {formatCurrency(promoterKpis.liquidatedCommissions)}
        </p>
      </div>

      <section className="min-w-0">
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
          Storico liquidazioni
        </h2>

        <div className="space-y-3 sm:hidden">
          {payouts.map((payout) => (
            <div
              key={payout.id}
              className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm min-w-0"
            >
              <p className="font-medium text-slate-900 break-words">
                {formatPeriod(payout.periodStart, payout.periodEnd)}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Liquidazione: {formatDate(payout.payoutDate)}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-slate-400">Maturate</p>
                  <p className="font-medium text-slate-800 break-words">
                    {formatCurrency(payout.commissionsMatured)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Pagato</p>
                  <p className="font-medium text-slate-800 break-words">
                    {payout.amountPaid != null ? formatCurrency(payout.amountPaid) : "—"}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <PayoutStatusBadge status={payout.status} />
              </div>
            </div>
          ))}
        </div>

        <div className="hidden sm:block bg-white rounded-3xl border border-slate-100 shadow-sm min-w-0 max-w-full">
          <ResponsiveTable>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className={TABLE_HEAD}>Periodo</th>
                  <th className={TABLE_HEAD}>Data liquidazione</th>
                  <th className={TABLE_HEAD}>Commissioni maturate</th>
                  <th className={TABLE_HEAD}>Importo pagato</th>
                  <th className={TABLE_HEAD}>Stato</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((payout) => (
                  <tr key={payout.id} className={TABLE_ROW}>
                    <td className={TABLE_CELL}>
                      {formatPeriod(payout.periodStart, payout.periodEnd)}
                    </td>
                    <td className={TABLE_CELL}>{formatDate(payout.payoutDate)}</td>
                    <td className={TABLE_CELL}>{formatCurrency(payout.commissionsMatured)}</td>
                    <td className={TABLE_CELL}>
                      {payout.amountPaid != null ? formatCurrency(payout.amountPaid) : "—"}
                    </td>
                    <td className={TABLE_CELL}>
                      <PayoutStatusBadge status={payout.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </div>
      </section>
    </div>
  );
};

export default PromoterLiquidazioni;
