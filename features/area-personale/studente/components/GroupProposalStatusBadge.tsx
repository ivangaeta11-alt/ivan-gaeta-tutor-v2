import React from "react";
import type { GroupProposalStatus } from "../types";
import { GROUP_PROPOSAL_STATUS_LABELS } from "../types";

const STYLE_MAP: Record<GroupProposalStatus, string> = {
  voting: "bg-amber-50 text-amber-700 border-amber-100",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-100",
  rejected: "bg-red-50 text-red-700 border-red-100",
  expired: "bg-slate-100 text-slate-600 border-slate-200",
  scheduled: "bg-blue-50 text-blue-700 border-blue-100",
  slot_unavailable: "bg-orange-50 text-orange-700 border-orange-100",
  not_confirmed: "bg-orange-50 text-orange-700 border-orange-100",
  cancelled: "bg-slate-100 text-slate-500 border-slate-200",
};

interface GroupProposalStatusBadgeProps {
  status: GroupProposalStatus;
}

const GroupProposalStatusBadge: React.FC<GroupProposalStatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STYLE_MAP[status]}`}
    >
      {GROUP_PROPOSAL_STATUS_LABELS[status]}
    </span>
  );
};

export default GroupProposalStatusBadge;
