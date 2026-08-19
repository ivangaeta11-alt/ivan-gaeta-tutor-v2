import React from "react";
import DashboardCard from "../../DashboardCard";

const HowYouEarnCard: React.FC = () => (
  <DashboardCard title="Come guadagni">
    <p className="text-sm text-slate-600 mb-3">
      Ricevi il 50% sui primi 100 € spesi da ogni studente che acquisisci, fino a 50 €
      per studente.
    </p>
    <p className="text-sm text-slate-600">
      Ogni commissione diventa liquidabile 15 giorni dopo l&apos;acquisto. Le
      liquidazioni vengono effettuate il giorno 1 e il giorno 16 di ogni mese.
    </p>
  </DashboardCard>
);

export default HowYouEarnCard;
