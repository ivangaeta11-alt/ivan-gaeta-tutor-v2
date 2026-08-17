import React from "react";
import KpiCard from "../../promoter/components/KpiCard";

interface TutorWeeklySummaryProps {
  scheduledLessons: number;
  lessonsToday: number;
  pendingSubmissions: number;
  earningsMatured: number;
}

const TutorWeeklySummary: React.FC<TutorWeeklySummaryProps> = ({
  scheduledLessons,
  lessonsToday,
  pendingSubmissions,
  earningsMatured,
}) => (
  <section>
    <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Riepilogo della settimana</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard label="Lezioni programmate" value={String(scheduledLessons)} />
      <KpiCard label="Lezioni oggi" value={String(lessonsToday)} />
      <KpiCard label="Consegne da correggere" value={String(pendingSubmissions)} />
      <KpiCard label="Compensi maturati" value={`€${earningsMatured}`} />
    </div>
  </section>
);

export default TutorWeeklySummary;
