import React from "react";
import DashboardCard from "../../features/area-personale/DashboardCard";

const TutorDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-8">
        Area tutor
      </h1>
      <div className="grid sm:grid-cols-2 gap-6">
        <DashboardCard title="Studenti assegnati">
          <p>Nessuno studente assegnato</p>
        </DashboardCard>
        <DashboardCard title="Lezioni">
          <p>Nessuna lezione in programma</p>
        </DashboardCard>
        <DashboardCard title="Calendario">
          <p>Il calendario sarà disponibile a breve</p>
        </DashboardCard>
        <DashboardCard title="Compensi">
          <p>I compensi e i riepiloghi compariranno qui</p>
        </DashboardCard>
        <DashboardCard title="Materiali">
          <p>I materiali didattici condivisi compariranno qui</p>
        </DashboardCard>
        <DashboardCard title="Profilo">
          <p>I dati del profilo saranno gestiti in questa sezione.</p>
        </DashboardCard>
      </div>
    </div>
  );
};

export default TutorDashboard;
