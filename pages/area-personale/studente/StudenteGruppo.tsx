import React, { useState } from "react";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import LessonStatusBadge from "../../../features/area-personale/studente/components/LessonStatusBadge";
import VoteCard from "../../../features/area-personale/studente/components/VoteCard";
import InfoNotice from "../../../features/area-personale/studente/components/InfoNotice";
import ConfirmDialog from "../../../features/area-personale/studente/components/ConfirmDialog";
import {
  MOCK_GROUP,
  MOCK_LESSONS,
  MOCK_VOTES,
} from "../../../features/area-personale/studente/data";
import {
  formatCreditsBalance,
  formatDate,
  formatTimeRange,
} from "../../../features/area-personale/studente/utils/format";

const UPCOMING = MOCK_LESSONS.filter(
  (l) => l.status !== "svolta" && !l.status.startsWith("annullata")
).slice(0, 3);

const StudenteGruppo: React.FC = () => {
  const [leaveOpen, setLeaveOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Il mio gruppo"
        description={`${MOCK_GROUP.subject} · ${MOCK_GROUP.name}`}
      />

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h2 className="text-xl font-bold text-slate-900">{MOCK_GROUP.name}</h2>
            {MOCK_GROUP.openToNewMembers && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                Aperto a nuovi ingressi
              </span>
            )}
          </div>

          <dl className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Materia</dt>
              <dd className="text-slate-800 font-medium mt-0.5">{MOCK_GROUP.subject}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Tutor</dt>
              <dd className="text-slate-800 font-medium mt-0.5">{MOCK_GROUP.tutorName}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Membri effettivi
              </dt>
              <dd className="text-slate-800 font-medium mt-0.5">{MOCK_GROUP.effectiveMembers}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Saldo collettivo
              </dt>
              <dd className="text-slate-800 font-medium mt-0.5">
                {formatCreditsBalance(MOCK_GROUP.collectiveCredits)}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Slot ricorrenti
            </p>
            <ul className="space-y-1">
              {MOCK_GROUP.recurringSlots.map((slot) => (
                <li key={slot} className="text-sm text-slate-600 font-light">
                  {slot}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Membri del gruppo
          </p>
          <div className="flex flex-wrap gap-2">
            {MOCK_GROUP.members.map((m) => (
              <div
                key={m.id}
                className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-bold text-blue-700"
                title={`Membro ${m.initials}`}
              >
                {m.initials}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4 font-light">
            I guest in prova non sono inclusi tra i membri effettivi.
          </p>
        </div>
      </div>

      <InfoNotice>
        I crediti trasferiti al wallet collettivo appartengono al gruppo e non vengono restituiti
        al singolo membro in caso di uscita.
      </InfoNotice>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Prossime lezioni</h2>
        <div className="space-y-3">
          {UPCOMING.map((lesson) => (
            <div
              key={lesson.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-white rounded-2xl border border-slate-100"
            >
              <div>
                <p className="font-medium text-slate-800">
                  {formatDate(lesson.date)} · {formatTimeRange(lesson.startTime, lesson.endTime)}
                </p>
              </div>
              <LessonStatusBadge status={lesson.status} />
            </div>
          ))}
        </div>
      </section>

      {MOCK_VOTES.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Votazioni aperte</h2>
          {MOCK_VOTES.map((vote) => (
            <VoteCard key={vote.id} vote={vote} />
          ))}
        </section>
      )}

      <div className="mt-10">
        <button
          type="button"
          onClick={() => setLeaveOpen(true)}
          className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-600 transition-colors"
        >
          Esci dal gruppo
        </button>
      </div>

      <ConfirmDialog
        open={leaveOpen}
        title="Esci dal gruppo"
        message="Se esci dal gruppo perderai l'accesso alle lezioni e ai materiali condivisi. I crediti già trasferiti al wallet collettivo non ti verranno restituiti. Questa azione è simulata in demo."
        confirmLabel="Esci (demo)"
        onConfirm={() => setLeaveOpen(false)}
        onCancel={() => setLeaveOpen(false)}
      />
    </div>
  );
};

export default StudenteGruppo;
