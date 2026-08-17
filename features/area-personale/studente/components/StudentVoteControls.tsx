import React from "react";
import type { GroupLessonProposal } from "../types";
import { useStudentDashboard } from "../context/StudentDashboardContext";

interface StudentVoteControlsProps {
  proposal: GroupLessonProposal;
  compact?: boolean;
}

const StudentVoteControls: React.FC<StudentVoteControlsProps> = ({
  proposal,
  compact = false,
}) => {
  const { canParticipateInGroup, castProposalVote } = useStudentDashboard();

  if (!canParticipateInGroup || proposal.status !== "voting") {
    return null;
  }

  const vote = proposal.currentUserVote;

  return (
    <div className={compact ? "flex flex-wrap gap-2" : "space-y-3"}>
      {vote && (
        <p className="text-sm text-blue-700 font-medium">
          Il tuo voto: {vote === "approve" ? "Approvato" : "Non approvato"} (demo locale)
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => castProposalVote(proposal.id, "approve")}
          className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-colors ${
            vote === "approve"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "border-slate-200 text-slate-700 hover:border-emerald-200"
          }`}
        >
          Approvo
        </button>
        <button
          type="button"
          onClick={() => castProposalVote(proposal.id, "reject")}
          className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-colors ${
            vote === "reject"
              ? "bg-red-50 text-red-700 border-red-200"
              : "border-slate-200 text-slate-700 hover:border-red-200"
          }`}
        >
          Non approvo
        </button>
        {vote && (
          <button
            type="button"
            onClick={() =>
              castProposalVote(proposal.id, vote === "approve" ? "reject" : "approve")
            }
            className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Modifica voto
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentVoteControls;
