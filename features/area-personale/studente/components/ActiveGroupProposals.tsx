import React from "react";
import type { GroupLessonProposal } from "../types";
import GroupProposalCard from "./GroupProposalCard";

interface ActiveGroupProposalsProps {
  proposals: GroupLessonProposal[];
  title?: string;
  emptyMessage?: string;
}

const ActiveGroupProposals: React.FC<ActiveGroupProposalsProps> = ({
  proposals,
  title = "Proposte attive",
  emptyMessage = "Nessuna proposta in votazione al momento.",
}) => {
  if (proposals.length === 0) {
    return (
      <section className="min-w-0">
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{title}</h2>
        <p className="text-sm text-slate-400 font-light">{emptyMessage}</p>
      </section>
    );
  }

  return (
    <section className="min-w-0">
      <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{title}</h2>
      <div className="space-y-4">
        {proposals.map((proposal) => (
          <GroupProposalCard key={proposal.id} proposal={proposal} />
        ))}
      </div>
    </section>
  );
};

export default ActiveGroupProposals;
