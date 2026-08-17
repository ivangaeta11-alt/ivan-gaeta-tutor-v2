import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Lesson } from "../types";
import { formatCreditsBalance, formatDate, formatTimeRange } from "../utils/format";

interface BookingConfirmationProps {
  lesson: Lesson;
  creditsUsed: number;
  newBalance: number;
  onClose: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  lesson,
  creditsUsed,
  newBalance,
  onClose,
}) => {
  return (
    <div className="text-center min-w-0">
      <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" aria-hidden />
      <h3 className="text-lg font-bold text-slate-900 mb-2">Prenotazione confermata</h3>
      <p className="text-sm text-slate-500 font-light mb-6 break-words">
        La lezione individuale è stata aggiunta alle tue prossime lezioni (demo locale).
      </p>

      <dl className="text-left text-sm space-y-2 mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Materia</dt>
          <dd className="font-medium text-slate-800">{lesson.subject}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Tutor</dt>
          <dd className="font-medium text-slate-800">{lesson.tutorName}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Data e ora</dt>
          <dd className="font-medium text-slate-800 text-right break-words">
            {formatDate(lesson.date)} · {formatTimeRange(lesson.startTime, lesson.endTime)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Crediti utilizzati</dt>
          <dd className="font-medium text-slate-800">{formatCreditsBalance(creditsUsed)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Nuovo saldo personale</dt>
          <dd className="font-bold text-emerald-700">{formatCreditsBalance(newBalance)}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          to="/area-personale/studente/calendario"
          onClick={onClose}
          className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Vai alle mie lezioni
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Chiudi
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
