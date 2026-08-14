import React from "react";
import DashboardCard from "../../features/area-personale/DashboardCard";

const StudenteDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-8">
        Area studente
      </h1>
      <div className="grid sm:grid-cols-2 gap-6">
        <DashboardCard title="Le mie lezioni">
          <p>Nessuna lezione programmata</p>
        </DashboardCard>
        <DashboardCard title="Prenota una lezione">
          <p>La prenotazione online sarà disponibile a breve.</p>
        </DashboardCard>
        <DashboardCard title="Pagamenti">
          <p>Lo storico dei pagamenti sarà disponibile qui</p>
        </DashboardCard>
        <DashboardCard title="Materiali">
          <p>I tuoi materiali compariranno qui</p>
        </DashboardCard>
        <DashboardCard title="Profilo">
          <p>I dati del profilo saranno gestiti in questa sezione.</p>
        </DashboardCard>
      </div>
    </div>
  );
};

export default StudenteDashboard;
