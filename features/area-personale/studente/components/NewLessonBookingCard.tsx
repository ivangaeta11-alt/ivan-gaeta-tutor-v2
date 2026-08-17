import React from "react";
import { User, Users } from "lucide-react";
import NewLessonActions from "./NewLessonActions";
import { useStudentDashboard } from "../context/StudentDashboardContext";

const NewLessonBookingCard: React.FC = () => {
  const { hasActiveGroup } = useStudentDashboard();

  return (
    <section className="p-5 md:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm min-w-0 max-w-full">
      <h2 className="text-lg font-bold text-slate-900 mb-1 tracking-tight">
        Prenota una nuova lezione
      </h2>
      <p className="text-sm text-slate-500 font-light mb-4 break-words">
        Scegli se prenotare autonomamente una lezione individuale o proporre una lezione extra
        al tuo gruppo.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-blue-600 shrink-0" aria-hidden />
            <p className="font-semibold text-slate-800">Lezione individuale</p>
          </div>
          <p className="text-xs text-slate-500 font-light break-words">
            Prenotazione autonoma con il tuo wallet personale.
          </p>
        </div>
        {hasActiveGroup && (
          <div className="p-4 rounded-xl bg-violet-50/60 border border-violet-100 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-violet-600 shrink-0" aria-hidden />
              <p className="font-semibold text-slate-800">Lezione extra di gruppo</p>
            </div>
            <p className="text-xs text-slate-500 font-light break-words">
              Proposta collettiva con votazione del gruppo.
            </p>
          </div>
        )}
      </div>

      <NewLessonActions layout="stack" />
    </section>
  );
};

export default NewLessonBookingCard;
