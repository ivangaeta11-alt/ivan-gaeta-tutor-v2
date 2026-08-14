import React from "react";
import DashboardCard from "../../features/area-personale/DashboardCard";

const PromoterDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-8">
        Area promoter
      </h1>
      <div className="grid sm:grid-cols-2 gap-6">
        <DashboardCard title="Il mio link referral">
          <p className="font-mono text-sm text-slate-700 break-all">
            https://example.com/?ref=DEMO
          </p>
        </DashboardCard>
        <DashboardCard title="Il mio codice referral">
          <p className="font-mono text-lg font-semibold text-slate-800">DEMO123</p>
        </DashboardCard>
        <DashboardCard title="Contatti generati">
          <p>0 contatti (placeholder)</p>
        </DashboardCard>
        <DashboardCard title="Studenti acquisiti">
          <p>0 studenti (placeholder)</p>
        </DashboardCard>
        <DashboardCard title="Commissioni maturate">
          <p className="text-lg font-semibold text-slate-800">€ 0,00</p>
        </DashboardCard>
        <DashboardCard title="Pagamenti ricevuti">
          <p>Nessun pagamento registrato</p>
        </DashboardCard>
        <DashboardCard title="Materiale promozionale">
          <p>I materiali promozionali compariranno qui</p>
        </DashboardCard>
        <DashboardCard title="Profilo">
          <p>I dati del profilo saranno gestiti in questa sezione.</p>
        </DashboardCard>
      </div>
    </div>
  );
};

export default PromoterDashboard;
