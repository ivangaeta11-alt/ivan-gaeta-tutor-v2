import React, { useState } from "react";
import { User, Users } from "lucide-react";
import IndividualLessonBookingFlow from "./IndividualLessonBookingFlow";
import GroupExtraLessonProposalFlow from "./GroupExtraLessonProposalFlow";
import { useStudentDashboard } from "../context/StudentDashboardContext";

interface NewLessonActionsProps {
  showIndividual?: boolean;
  showGroupExtra?: boolean;
  layout?: "row" | "stack";
  className?: string;
}

const NewLessonActions: React.FC<NewLessonActionsProps> = ({
  showIndividual = true,
  showGroupExtra,
  layout = "row",
  className = "",
}) => {
  const { hasActiveGroup, canParticipateInGroup } = useStudentDashboard();
  const [individualOpen, setIndividualOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);

  const showExtra = showGroupExtra ?? (hasActiveGroup && canParticipateInGroup);
  const layoutClass =
    layout === "stack" ? "flex flex-col gap-3" : "flex flex-wrap gap-3";

  return (
    <>
      <div className={`${layoutClass} ${className}`}>
        {showIndividual && (
          <button
            type="button"
            onClick={() => setIndividualOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            <User className="w-4 h-4 shrink-0" aria-hidden />
            Prenota lezione individuale
          </button>
        )}
        {showExtra && (
          <button
            type="button"
            onClick={() => setGroupOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border border-violet-200 text-violet-700 bg-violet-50 hover:bg-violet-100 transition-colors"
          >
            <Users className="w-4 h-4 shrink-0" aria-hidden />
            Proponi lezione extra
          </button>
        )}
      </div>

      <IndividualLessonBookingFlow
        open={individualOpen}
        onClose={() => setIndividualOpen(false)}
      />
      <GroupExtraLessonProposalFlow open={groupOpen} onClose={() => setGroupOpen(false)} />
    </>
  );
};

export default NewLessonActions;
