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

  return (
    <div>
      <PageHeader
        title="Liquidazioni"
        description="Storico dei pagamenti commissioni. Le commissioni maturate diventano liquidabili a fine periodo."
      />

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 md:p-6 bg-amber-50/60 rounded-2xl border border-amber-100 sm:col-span-1">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700/70 mb-2">
            Commissioni da liquidare
          </p>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {formatCurrency(promoterKpis.pendingPayout)}
          </p>
          <p className="text-xs text-slate-500 font-light mt-2">
            Non ancora pagate — periodo in corso
          </p>
        </div>
        <div className="p-5 md:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Ultima liquidazione
          </p>
          <p className="text-lg font-bold text-slate-900">
            {formatDateLong(promoter.lastPayoutDate)}
          </p>
        </div>
        <div className="p-5 md:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Prossima liquidazione prevista
          </p>
          <p className="text-lg font-bold text-slate-900">
            {formatDateLong(promoter.nextPayoutDate)}
          </p>
        </div>
      </div>

      <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm text-slate-600 font-light">
        <p>
          <span className="font-semibold text-slate-800">Commissioni maturate totali:</span>{" "}
          {formatCurrency(promoterKpis.totalCommissions)}
        </p>
        <p className="mt-1">
          <span className="font-semibold text-slate-800">Già liquidate:</span>{" "}
          {formatCurrency(promoterKpis.liquidatedCommissions)}
        </p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
          Storico liquidazioni
        </h2>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
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
                {[...DEMO_PAYOUTS_DISPLAY].reverse().map((payout) => (
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
