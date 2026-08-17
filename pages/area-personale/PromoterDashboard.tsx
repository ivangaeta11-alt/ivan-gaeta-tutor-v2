import React from "react";
import PageHeader from "../../features/area-personale/promoter/components/PageHeader";
import KpiGrid from "../../features/area-personale/promoter/components/KpiGrid";
import CopyButton from "../../features/area-personale/promoter/components/CopyButton";
import DashboardCard from "../../features/area-personale/DashboardCard";
import {
  promoterDemo,
  promoterKpis,
  promoterPlan,
} from "../../features/area-personale/promoter/data";
import { formatCurrency, formatDateLong } from "../../features/area-personale/promoter/utils/format";

const PromoterDashboard: React.FC = () => {
  const { promoter } = promoterDemo;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Riepilogo delle tue performance come promoter."
      />

      <KpiGrid
        items={[
          {
            label: "Studenti acquisiti",
            value: String(promoterKpis.acquiredStudents),
          },
          {
            label: "Ricavi generati",
            value: formatCurrency(promoterKpis.totalRevenue),
          },
          {
            label: "Commissioni maturate",
            value: formatCurrency(promoterKpis.totalCommissions),
            hint: `${formatCurrency(promoterKpis.liquidatedCommissions)} già liquidate`,
          },
          {
            label: "Da liquidare",
            value: formatCurrency(promoterKpis.pendingPayout),
            hint: "Periodo in corso",
          },
        ]}
      />

      <div className="mt-6 p-5 md:p-6 bg-blue-50/60 rounded-2xl border border-blue-100">
        <p className="text-sm text-slate-600 font-light">
          <span className="font-semibold text-slate-800">Prossima liquidazione:</span>{" "}
          {formatDateLong(promoter.nextPayoutDate)}
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Piano commissionale: {promoterPlan.displayName}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Il tuo referral</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <DashboardCard title="Link personale">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="font-mono text-sm text-slate-700 break-all flex-1">
                {promoter.referralLink}
              </p>
              <CopyButton text={promoter.referralLink} />
            </div>
          </DashboardCard>
          <DashboardCard title="Codice referral">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="font-mono text-lg font-semibold text-slate-800">
                {promoter.referralCode}
              </p>
              <CopyButton text={promoter.referralCode} />
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default PromoterDashboard;
