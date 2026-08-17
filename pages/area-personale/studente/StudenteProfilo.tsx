import React from "react";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import DashboardCard from "../../../features/area-personale/DashboardCard";
import { MOCK_GROUP, MOCK_STUDENT } from "../../../features/area-personale/studente/data";

const StudenteProfilo: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Profilo"
        description="I tuoi dati personali e preferenze account."
      />

      <div className="grid sm:grid-cols-2 gap-6">
        <DashboardCard title="Dati personali">
          <dl className="space-y-3">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Nome</dt>
              <dd className="text-slate-800 font-medium mt-0.5">{MOCK_STUDENT.displayName}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</dt>
              <dd className="text-slate-800 font-medium mt-0.5">{MOCK_STUDENT.email}</dd>
            </div>
          </dl>
          <p className="text-xs text-slate-400 mt-4">Modifica disponibile con autenticazione reale</p>
        </DashboardCard>

        <DashboardCard title="Gruppo attivo">
          <dl className="space-y-3">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Gruppo</dt>
              <dd className="text-slate-800 font-medium mt-0.5">{MOCK_GROUP.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Materia</dt>
              <dd className="text-slate-800 font-medium mt-0.5">{MOCK_GROUP.subject}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Tutor</dt>
              <dd className="text-slate-800 font-medium mt-0.5">{MOCK_GROUP.tutorName}</dd>
            </div>
          </dl>
        </DashboardCard>

        <DashboardCard title="Preferenze notifiche">
          <p>Avvisi su lezioni, votazioni e nuovi materiali.</p>
          <p className="text-xs text-slate-400 mt-3">Configurazione disponibile nelle prossime versioni</p>
        </DashboardCard>

        <DashboardCard title="Metodi di pagamento">
          <p>Gestione carte e acquisto crediti.</p>
          <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-500 font-light">
            Non ancora configurato — sarà disponibile con Stripe.
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default StudenteProfilo;
