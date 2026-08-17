import React from "react";
import PageHeader from "../../../features/area-personale/promoter/components/PageHeader";
import DashboardCard from "../../../features/area-personale/DashboardCard";
import { promoterDemo, promoterPlan } from "../../../features/area-personale/promoter/data";

const PromoterProfilo: React.FC = () => {
  const { promoter } = promoterDemo;

  return (
    <div>
      <PageHeader
        title="Profilo"
        description="Gestione dati personali e preferenze account. I dati non vengono ancora salvati."
      />

      <div className="grid sm:grid-cols-2 gap-6">
        <DashboardCard title="Dati personali">
          <dl className="space-y-3">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Nome visualizzato
              </dt>
              <dd className="text-slate-800 font-medium mt-0.5">{promoter.displayName}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</dt>
              <dd className="text-slate-800 font-medium mt-0.5">{promoter.email}</dd>
            </div>
          </dl>
          <p className="text-xs text-slate-400 mt-4">Modifica disponibile con autenticazione reale</p>
        </DashboardCard>

        <DashboardCard title="Dati account">
          <dl className="space-y-3">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Codice referral
              </dt>
              <dd className="font-mono text-slate-800 font-medium mt-0.5">
                {promoter.referralCode}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Piano commissionale
              </dt>
              <dd className="text-slate-800 font-medium mt-0.5">{promoterPlan.displayName}</dd>
            </div>
          </dl>
        </DashboardCard>

        <DashboardCard title="Preferenze di pagamento">
          <p className="mb-3">
            Configurazione IBAN e metodo di pagamento per le liquidazioni commissioni.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-500 font-light">
            Non ancora configurato — sarà disponibile con il sistema di liquidazione.
          </div>
        </DashboardCard>

        <DashboardCard title="Notifiche">
          <p>Preferenze email per liquidazioni, nuove acquisizioni e aggiornamenti materiali.</p>
          <p className="text-xs text-slate-400 mt-3">Disponibile nelle prossime versioni</p>
        </DashboardCard>
      </div>
    </div>
  );
};

export default PromoterProfilo;
