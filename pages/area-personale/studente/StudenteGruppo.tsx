import React, { useMemo, useState } from "react";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import LessonStatusBadge from "../../../features/area-personale/studente/components/LessonStatusBadge";
import VoteCard from "../../../features/area-personale/studente/components/VoteCard";
import InfoNotice from "../../../features/area-personale/studente/components/InfoNotice";
import ConfirmDialog from "../../../features/area-personale/studente/components/ConfirmDialog";
import NewLessonActions from "../../../features/area-personale/studente/components/NewLessonActions";
import ActiveGroupProposals from "../../../features/area-personale/studente/components/ActiveGroupProposals";
import GroupProposalCard from "../../../features/area-personale/studente/components/GroupProposalCard";
import { useStudentDashboard } from "../../../features/area-personale/studente/context/StudentDashboardContext";
import { MOCK_VOTES } from "../../../features/area-personale/studente/data";
import {
  formatCreditsBalance,
  formatDate,
  formatTimeRange,
} from "../../../features/area-personale/studente/utils/format";

const StudenteGruppo: React.FC = () => {
  const [leaveOpen, setLeaveOpen] = useState(false);
  const { group, lessons, proposals, activeProposals, canParticipateInGroup } =
    useStudentDashboard();

  const upcoming = useMemo(
    () =>
      lessons
        .filter(
          (l) =>
            l.groupId === group?.id &&
            l.status !== "svolta" &&
            !l.status.startsWith("annullata")
        )
        .slice(0, 3),
    [lessons, group?.id]
  );

  const proposalHistory = useMemo(
    () =>
      proposals.filter(
        (p) => p.status !== "voting" && p.status !== "scheduled"
      ),
    [proposals]
  );

  if (!group) {
    return (
      <div className="min-w-0 max-w-full">
        <PageHeader title="Il mio gruppo" description="Non sei iscritto a un gruppo attivo." />
      </div>
    );
  }

  return (
    <div className="min-w-0 max-w-full">
      <PageHeader
        title="Il mio gruppo"
        description={`${group.subject} · ${group.name}`}
      />

      <div className="mb-6">
        {canParticipateInGroup ? (
          <NewLessonActions showIndividual={false} />
        ) : (
          <p className="text-sm text-slate-400 font-light">
            Guest ed ex membri non possono creare proposte o votare.
          </p>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8 min-w-0">
        <div className="lg:col-span-2 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h2 className="text-xl font-bold text-slate-900">{group.name}</h2>
            {group.openToNewMembers && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                Aperto a nuovi ingressi
              </span>
            )}
          </div>

          <dl className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Materia</dt>
              <dd className="text-slate-800 font-medium mt-0.5">{group.subject}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Tutor</dt>
              <dd className="text-slate-800 font-medium mt-0.5">{group.tutorName}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Membri effettivi
              </dt>
              <dd className="text-slate-800 font-medium mt-0.5">{group.effectiveMembers}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Saldo collettivo
              </dt>
              <dd className="text-slate-800 font-medium mt-0.5">
                {formatCreditsBalance(group.collectiveCredits)}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Slot ricorrenti
            </p>
            <ul className="space-y-1">
              {group.recurringSlots.map((slot) => (
                <li key={slot} className="text-sm text-slate-600 font-light">
                  {slot}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Membri del gruppo
          </p>
          <div className="flex flex-wrap gap-2">
            {group.members.map((m) => (
              <div
                key={m.id}
                className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-bold text-blue-700"
                title={`Membro ${m.initials}${m.isGuest ? " (guest)" : ""}`}
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

      <section className="mt-8 min-w-0">
        <ActiveGroupProposals proposals={activeProposals} />
      </section>

      <section className="mt-8 min-w-0">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Prossime lezioni</h2>
        <div className="space-y-3">
          {upcoming.map((lesson) => (
            <div
              key={lesson.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-white rounded-2xl border border-slate-100 min-w-0"
            >
              <div className="min-w-0">
                <p className="font-medium text-slate-800 break-words">
                  {formatDate(lesson.date)} · {formatTimeRange(lesson.startTime, lesson.endTime)}
                </p>
              </div>
              <LessonStatusBadge status={lesson.status} />
            </div>
          ))}
        </div>
      </section>

      {proposalHistory.length > 0 && (
        <section className="mt-8 min-w-0">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Storico proposte</h2>
          <div className="space-y-4">
            {proposalHistory.map((proposal) => (
              <GroupProposalCard
                key={proposal.id}
                proposal={proposal}
                showViewToggle={false}
              />
            ))}
          </div>
        </section>
      )}

      {MOCK_VOTES.length > 0 && (
        <section className="mt-8 min-w-0">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Votazioni aperte (spostamenti)</h2>
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
