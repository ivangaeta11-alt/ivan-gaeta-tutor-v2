import React from "react";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import KpiCard from "../../../features/area-personale/promoter/components/KpiCard";
import EarningStatusBadge from "../../../features/area-personale/tutor/components/EarningStatusBadge";
import InfoNotice from "../../../features/area-personale/studente/components/InfoNotice";
import { MOCK_EARNINGS, getEarningsSummary } from "../../../features/area-personale/tutor/data";
import { LESSON_TYPE_LABELS } from "../../../features/area-personale/tutor/types";
import { formatDateShort } from "../../../features/area-personale/studente/utils/format";

const TutorCompensi: React.FC = () => {
  const summary = getEarningsSummary();

  return (
    <div>
      <PageHeader
        title="Compensi"
        description="I tuoi compensi per le lezioni svolte. Distinti dalle commissioni promoter."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard label="Compensi previsti" value={`€${summary.previsto}`} />
        <KpiCard label="Compensi in attesa" value={`€${summary.inAttesa}`} />
        <KpiCard label="Compensi maturati" value={`€${summary.maturato}`} />
        <KpiCard label="Totale liquidato" value={`€${summary.liquidato}`} />
      </div>

      <InfoNotice>
        Non sono visibili wallet studenti, margini piattaforma, referral o commissioni promoter.
        La liquidazione è gestita da Ivan (non disponibile in questa demo).
      </InfoNotice>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Dettaglio compensi</h2>
        <div className="space-y-3 sm:hidden">
          {MOCK_EARNINGS.map((e) => (
            <div key={e.id} className="p-4 bg-white rounded-2xl border border-slate-100">
              <p className="font-medium text-slate-900">{e.label}</p>
              <p className="text-sm text-slate-500">{formatDateShort(e.date)} · {LESSON_TYPE_LABELS[e.lessonType]} · {e.durationMinutes} min</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold">€{e.amount}</span>
                <EarningStatusBadge status={e.status} />
              </div>
            </div>
          ))}
        </div>
        <div className="hidden sm:block max-w-full overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[640px] bg-white rounded-2xl border border-slate-100">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                {["Data", "Studente / Gruppo", "Tipo", "Durata", "Importo", "Stato"].map((h) => (
                  <th key={h} className="text-left text-xs font-bold uppercase text-slate-400 px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_EARNINGS.map((e) => (
                <tr key={e.id} className="border-b border-slate-50">
                  <td className="px-4 py-3 text-sm">{formatDateShort(e.date)}</td>
                  <td className="px-4 py-3 text-sm">{e.label}</td>
                  <td className="px-4 py-3 text-sm">{LESSON_TYPE_LABELS[e.lessonType]}</td>
                  <td className="px-4 py-3 text-sm">{e.durationMinutes} min</td>
                  <td className="px-4 py-3 text-sm font-semibold">€{e.amount}</td>
                  <td className="px-4 py-3"><EarningStatusBadge status={e.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TutorCompensi;
