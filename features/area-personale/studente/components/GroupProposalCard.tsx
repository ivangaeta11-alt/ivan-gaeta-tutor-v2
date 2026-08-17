import React, { useState } from "react";
import type { GroupLessonProposal } from "../types";
import GroupProposalStatusBadge from "./GroupProposalStatusBadge";
import StudentVoteControls from "./StudentVoteControls";
import { formatCreditsBalance, formatDate, formatTimeRange } from "../utils/format";

interface GroupProposalCardProps {
  proposal: GroupLessonProposal;
  defaultExpanded?: boolean;
  showViewToggle?: boolean;
}

const GroupProposalCard: React.FC<GroupProposalCardProps> = ({
  proposal,
  defaultExpanded = false,
  showViewToggle = true,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="p-5 md:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm min-w-0 max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3 min-w-0">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-violet-600 mb-1">
            Lezione extra proposta
          </p>
          <h3 className="text-lg font-bold text-slate-900 break-words">
            {formatDate(proposal.date)} · {formatTimeRange(proposal.startTime, proposal.endTime)}
          </h3>
          <p className="text-sm text-slate-500 mt-1">{proposal.subject} · {proposal.groupName}</p>
        </div>
        <div className="shrink-0">
          <GroupProposalStatusBadge status={proposal.status} />
        </div>
      </div>

      <dl className="grid sm:grid-cols-2 gap-2 text-sm mb-4">
        <div>
          <dt className="text-xs text-slate-400">Costo previsto</dt>
          <dd className="font-medium text-slate-800">
            {formatCreditsBalance(proposal.estimatedCost)} dal wallet del gruppo
          </dd>
        </div>
        {proposal.motivation && (
          <div className="sm:col-span-2">
            <dt className="text-xs text-slate-400">Motivazione</dt>
            <dd className="text-slate-600 font-light break-words">{proposal.motivation}</dd>
          </div>
        )}
      </dl>

      <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
        <span>
          <span className="font-semibold text-emerald-700">{proposal.approveCount}</span>{" "}
          approvazioni
        </span>
        <span>
          <span className="font-semibold text-red-600">{proposal.rejectCount}</span> rifiuti
        </span>
        <span>
          <span className="font-semibold text-slate-500">{proposal.notVotedCount}</span> non hanno
          ancora votato
        </span>
      </div>

      {(expanded || !showViewToggle) && proposal.status === "voting" && (
        <StudentVoteControls proposal={proposal} />
      )}

      {showViewToggle && proposal.status === "voting" && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-3 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          {expanded ? "Nascondi dettagli" : "Visualizza"}
        </button>
      )}
    </div>
  );
};

export default GroupProposalCard;
