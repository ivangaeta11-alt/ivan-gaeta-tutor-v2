import React, { useMemo, useState } from "react";
import { Calendar, Clock, Video, Users, User } from "lucide-react";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import LessonStatusBadge from "../../../features/area-personale/studente/components/LessonStatusBadge";
import LessonKindBadge from "../../../features/area-personale/studente/components/LessonKindBadge";
import GroupProposalStatusBadge from "../../../features/area-personale/studente/components/GroupProposalStatusBadge";
import NewLessonActions from "../../../features/area-personale/studente/components/NewLessonActions";
import StudentVoteControls from "../../../features/area-personale/studente/components/StudentVoteControls";
import { useStudentDashboard } from "../../../features/area-personale/studente/context/StudentDashboardContext";
import type { GroupLessonProposal, Lesson } from "../../../features/area-personale/studente/types";
import {
  formatCreditsBalance,
  formatDate,
  formatTimeRange,
} from "../../../features/area-personale/studente/utils/format";

type CalendarFilter = "all" | "individual" | "group" | "proposals";

const FILTER_OPTIONS: { value: CalendarFilter; label: string }[] = [
  { value: "all", label: "Tutte" },
  { value: "individual", label: "Individuali" },
  { value: "group", label: "Di gruppo" },
  { value: "proposals", label: "Proposte" },
];

const PROPOSAL_CALENDAR_STATUSES = new Set<GroupLessonProposal["status"]>([
  "voting",
  "approved",
  "slot_unavailable",
  "not_confirmed",
]);

const StudenteCalendario: React.FC = () => {
  const { lessons, proposals } = useStudentDashboard();
  const [filter, setFilter] = useState<CalendarFilter>("all");

  const upcomingLessons = useMemo(
    () =>
      lessons
        .filter(
          (l) =>
            l.status !== "svolta" &&
            l.status !== "annullata_gruppo" &&
            l.status !== "annullata_tutor"
        )
        .sort((a, b) => {
          const cmp = a.date.localeCompare(b.date);
          return cmp !== 0 ? cmp : a.startTime.localeCompare(b.startTime);
        }),
    [lessons]
  );

  const pastLessons = useMemo(
    () =>
      lessons
        .filter(
          (l) =>
            l.status === "svolta" ||
            l.status === "annullata_gruppo" ||
            l.status === "annullata_tutor"
        )
        .sort((a, b) => b.date.localeCompare(a.date)),
    [lessons]
  );

  const calendarProposals = useMemo(
    () =>
      proposals.filter(
        (p) =>
          PROPOSAL_CALENDAR_STATUSES.has(p.status) &&
          !lessons.some((l) => l.proposalId === p.id)
      ),
    [proposals, lessons]
  );

  const filteredLessons = useMemo(() => {
    if (filter === "proposals") return [];
    if (filter === "individual") {
      return upcomingLessons.filter((l) => l.kind === "individual");
    }
    if (filter === "group") {
      return upcomingLessons.filter(
        (l) => l.kind === "group_recurring" || l.kind === "group_extra"
      );
    }
    return upcomingLessons;
  }, [filter, upcomingLessons]);

  const filteredProposals = useMemo(() => {
    if (filter === "individual" || filter === "group") return [];
    if (filter === "proposals") return proposals;
    return calendarProposals;
  }, [filter, proposals, calendarProposals]);

  return (
    <div className="min-w-0 max-w-full">
      <PageHeader
        title="Lezioni e prenotazioni"
        description="Le tue lezioni, le proposte del gruppo e lo stato di ciascun appuntamento."
      />

      <div className="mb-6">
        <NewLessonActions className="mb-4" />
      </div>

      <div className="mb-6 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Filtri</p>
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFilter(opt.value)}
              className={`px-3 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                filter === opt.value
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "border-slate-200 text-slate-700 hover:border-blue-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <section className="mb-10 min-w-0">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          {filter === "proposals" ? "Proposte" : "Prossime lezioni e attività"}
        </h2>
        <div className="space-y-3">
          {filteredLessons.map((lesson) => (
            <LessonRow key={lesson.id} lesson={lesson} />
          ))}
          {filteredProposals.map((proposal) => (
            <ProposalRow key={proposal.id} proposal={proposal} />
          ))}
          {filteredLessons.length === 0 && filteredProposals.length === 0 && (
            <p className="text-sm text-slate-400 font-light">Nessun elemento in questo filtro.</p>
          )}
        </div>
      </section>

      {filter !== "proposals" && (
        <section className="min-w-0">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Lezioni passate</h2>
          <div className="space-y-3">
            {pastLessons.map((lesson) => (
              <LessonRow key={lesson.id} lesson={lesson} faded />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const LessonRow: React.FC<{ lesson: Lesson; faded?: boolean }> = ({ lesson, faded }) => (
  <div
    className={`p-4 md:p-5 bg-white rounded-2xl border border-slate-100 shadow-sm min-w-0 ${
      faded ? "opacity-80" : ""
    }`}
  >
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 min-w-0">
      <div className="min-w-0">
        <h3 className="font-bold text-slate-900 break-words">
          {lesson.kind === "individual"
            ? `${lesson.subject}: lezione individuale`
            : `${lesson.subject} – ${lesson.groupName}`}
        </h3>
        {lesson.tutorName && (
          <p className="text-sm text-slate-500 mt-0.5">Tutor: {lesson.tutorName}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2 shrink-0">
        <LessonKindBadge kind={lesson.kind} />
        <LessonStatusBadge status={lesson.status} />
      </div>
    </div>
    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
      <span className="flex items-center gap-1.5">
        <Calendar className="w-4 h-4 text-slate-400 shrink-0" aria-hidden />
        {formatDate(lesson.date)}
      </span>
      <span className="flex items-center gap-1.5">
        <Clock className="w-4 h-4 text-slate-400 shrink-0" aria-hidden />
        {formatTimeRange(lesson.startTime, lesson.endTime)}
      </span>
      <span className="flex items-center gap-1.5">
        <Video className="w-4 h-4 text-slate-400 shrink-0" aria-hidden />
        Online
      </span>
      {lesson.kind === "individual" ? (
        <span className="flex items-center gap-1.5">
          <User className="w-4 h-4 text-slate-400 shrink-0" aria-hidden />
          Individuale
        </span>
      ) : (
        <span className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-slate-400 shrink-0" aria-hidden />
          {lesson.effectiveMembers} membri
        </span>
      )}
      {lesson.costCredits != null && (
        <span className="text-slate-500">{formatCreditsBalance(lesson.costCredits)}</span>
      )}
    </div>
  </div>
);

const ProposalRow: React.FC<{ proposal: GroupLessonProposal }> = ({ proposal }) => (
  <div className="p-4 md:p-5 bg-violet-50/30 rounded-2xl border border-violet-100 shadow-sm min-w-0">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 min-w-0">
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-violet-600 mb-1">
          Proposta lezione extra
        </p>
        <h3 className="font-bold text-slate-900 break-words">
          {proposal.subject}, {proposal.groupName}
        </h3>
        <p className="text-sm text-slate-500 mt-0.5">
          {formatDate(proposal.date)} · {formatTimeRange(proposal.startTime, proposal.endTime)}
        </p>
      </div>
      <GroupProposalStatusBadge status={proposal.status} />
    </div>
    <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-3">
      <span>
        Costo previsto: {formatCreditsBalance(proposal.estimatedCost)}
      </span>
      <span>
        {proposal.approveCount} approvazioni · {proposal.rejectCount} rifiuti ·{" "}
        {proposal.notVotedCount} non hanno votato
      </span>
    </div>
    {proposal.motivation && (
      <p className="text-sm text-slate-500 font-light mb-3 break-words">
        Motivazione: {proposal.motivation}
      </p>
    )}
    {proposal.status === "voting" && <StudentVoteControls proposal={proposal} compact />}
  </div>
);

export default StudenteCalendario;
