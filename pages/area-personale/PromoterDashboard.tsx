import React from "react";
import PageHeader from "../../features/area-personale/promoter/components/PageHeader";
import KpiGrid from "../../features/area-personale/promoter/components/KpiGrid";
import HowYouEarnCard from "../../features/area-personale/promoter/components/HowYouEarnCard";
import {
  promoterDemo,
  promoterDashboardKpis,
  promoterMonthFunnel,
} from "../../features/area-personale/promoter/data";
import { formatCurrency, formatDateLong } from "../../features/area-personale/promoter/utils/format";

const PromoterDashboard: React.FC = () => {
  const { promoter } = promoterDemo;
  const funnel = promoterMonthFunnel;

  return (
    <div className="min-w-0 max-w-full">
      <PageHeader
        title="Dashboard"
        description="Panoramica delle tue acquisizioni e delle commissioni maturate."
      />

      <KpiGrid
        items={[
          {
            label: "Studenti acquisiti",
            value: String(promoterDashboardKpis.acquiredStudents),
          },
          {
            label: "Studenti in demo",
            value: String(promoterDashboardKpis.studentsInDemo),
          },
          {
            label: "Commissioni in maturazione",
            value: formatCurrency(promoterDashboardKpis.maturingCommissions),
          },
          {
            label: "Commissioni liquidabili",
            value: formatCurrency(promoterDashboardKpis.liquidableCommissions),
          },
        ]}
      />

      <div className="mt-6 p-5 md:p-6 bg-blue-50/60 rounded-2xl border border-blue-100 min-w-0">
        <h2 className="text-sm font-bold text-slate-900 mb-2">Prossima liquidazione</h2>
        <p className="text-sm text-slate-700">
          <span className="font-semibold">{formatDateLong(promoter.nextPayoutDate)}</span>
        </p>
        <p className="text-lg font-extrabold text-slate-900 mt-2">
          {formatCurrency(promoterDashboardKpis.liquidableCommissions)} attualmente liquidabili
        </p>
        <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
          Le commissioni diventano liquidabili 15 giorni dopo l&apos;acquisto. Gli importi
          ancora in maturazione non sono inclusi in questa cifra.
        </p>
      </div>

      <div className="mt-8 min-w-0">
        <h2 className="text-lg font-bold text-slate-900 mb-4 tracking-tight">
          Performance del mese
        </h2>
        <div className="p-5 md:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm min-w-0">
          <p className="text-sm text-slate-700 font-medium">
            {funnel.acquired} acquisiti → {funnel.demosStarted} demo → {funnel.payingClients}{" "}
            clienti paganti
          </p>
          <p className="text-sm text-slate-600 mt-2">
            Conversione demo → pagante:{" "}
            <span className="font-semibold text-slate-800">{funnel.demoToPayingRate}%</span>
          </p>
          <p className="text-sm text-slate-600 mt-1">
            Commissioni maturate questo mese:{" "}
            <span className="font-semibold text-slate-800">
              {formatCurrency(funnel.commissionsEarnedThisMonth)}
            </span>
          </p>
          <p className="text-xs text-slate-400 font-light mt-3">
            Mese precedente: {formatCurrency(funnel.previousMonthCommissions)} di commissioni
            maturate
          </p>
        </div>
      </div>

      <div className="mt-8 min-w-0">
        <HowYouEarnCard />
      </div>
    </div>
  );
};

export default PromoterDashboard;
