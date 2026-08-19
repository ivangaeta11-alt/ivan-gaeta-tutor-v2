import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import type {
  CreditMovement,
  GroupLessonProposal,
  Lesson,
  StudentVote,
  StudyGroup,
  Wallet,
} from "../types";
import {
  MOCK_CREDIT_MOVEMENTS,
  MOCK_GROUP,
  MOCK_GROUP_PROPOSALS,
  MOCK_LESSONS,
  MOCK_STUDENT,
  getIndividualCost,
} from "../data";

interface BookIndividualParams {
  subject: string;
  tutorName: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  costCredits: number;
}

interface PublishProposalParams {
  group: StudyGroup;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  estimatedCost: number;
  motivation?: string;
}

interface StudentDashboardContextValue {
  student: typeof MOCK_STUDENT;
  group: StudyGroup | null;
  hasActiveGroup: boolean;
  canParticipateInGroup: boolean;
  personalCredits: number;
  collectiveCredits: number;
  wallets: Wallet[];
  lessons: Lesson[];
  proposals: GroupLessonProposal[];
  creditMovements: CreditMovement[];
  nextLesson: Lesson | null;
  activeProposals: GroupLessonProposal[];
  bookIndividualLesson: (params: BookIndividualParams) => Lesson;
  publishGroupProposal: (params: PublishProposalParams) => GroupLessonProposal;
  castProposalVote: (proposalId: string, vote: Exclude<StudentVote, null>) => void;
  purchaseMissingCredits: (amount: number) => void;
}

const StudentDashboardContext = createContext<StudentDashboardContextValue | null>(null);

function computeNextLesson(lessons: Lesson[]): Lesson | null {
  const upcoming = lessons
    .filter(
      (l) =>
        l.status !== "svolta" &&
        l.status !== "annullata_gruppo" &&
        l.status !== "annullata_tutor"
    )
    .sort((a, b) => {
      const cmp = a.date.localeCompare(b.date);
      return cmp !== 0 ? cmp : a.startTime.localeCompare(b.startTime);
    });
  return upcoming[0] ?? null;
}

function adjustVoteCounts(
  proposal: GroupLessonProposal,
  previousVote: StudentVote,
  nextVote: Exclude<StudentVote, null>
): Pick<GroupLessonProposal, "approveCount" | "rejectCount" | "notVotedCount"> {
  let { approveCount, rejectCount, notVotedCount } = proposal;

  if (previousVote === "approve") approveCount -= 1;
  if (previousVote === "reject") rejectCount -= 1;
  if (previousVote === null) notVotedCount -= 1;

  if (nextVote === "approve") approveCount += 1;
  if (nextVote === "reject") rejectCount += 1;

  return { approveCount, rejectCount, notVotedCount };
}

export const StudentDashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [personalCredits, setPersonalCredits] = useState(MOCK_STUDENT.personalCredits);
  const [collectiveCredits] = useState(MOCK_GROUP.collectiveCredits);
  const [lessons, setLessons] = useState<Lesson[]>(MOCK_LESSONS);
  const [proposals, setProposals] = useState<GroupLessonProposal[]>(MOCK_GROUP_PROPOSALS);
  const [creditMovements, setCreditMovements] = useState<CreditMovement[]>(
    MOCK_CREDIT_MOVEMENTS
  );

  const hasActiveGroup = MOCK_STUDENT.isActiveGroupMember;
  const canParticipateInGroup = MOCK_STUDENT.isActiveGroupMember;

  const wallets = useMemo<Wallet[]>(
    () => [
      {
        type: "personal",
        label: "Crediti personali",
        balance: personalCredits,
      },
      {
        type: "collective",
        label: `Wallet ${MOCK_GROUP.name}`,
        balance: collectiveCredits,
        groupId: MOCK_GROUP.id,
        hint: "Saldo sufficiente per le prossime 2 lezioni",
      },
    ],
    [personalCredits, collectiveCredits]
  );

  const nextLesson = useMemo(() => computeNextLesson(lessons), [lessons]);

  const activeProposals = useMemo(
    () => proposals.filter((p) => p.status === "voting"),
    [proposals]
  );

  const bookIndividualLesson = useCallback(
    (params: BookIndividualParams): Lesson => {
      const newLesson: Lesson = {
        id: `les_${Date.now()}`,
        kind: "individual",
        groupId: "",
        subject: params.subject,
        groupName: "Lezione individuale",
        tutorName: params.tutorName,
        date: params.date,
        startTime: params.startTime,
        endTime: params.endTime,
        mode: "online",
        status: "confermata",
        effectiveMembers: 1,
        durationMinutes: params.durationMinutes,
        costCredits: params.costCredits,
      };

      setLessons((prev) => [...prev, newLesson]);
      setPersonalCredits((prev) => prev - params.costCredits);
      setCreditMovements((prev) => [
        ...prev,
        {
          id: `mov_${Date.now()}`,
          date: new Date().toISOString().slice(0, 10),
          amount: -params.costCredits,
          description: `Lezione individuale: ${params.subject}`,
          walletType: "personal",
        },
      ]);

      return newLesson;
    },
    []
  );

  const publishGroupProposal = useCallback(
    (params: PublishProposalParams): GroupLessonProposal => {
      const proposal: GroupLessonProposal = {
        id: `prop_${Date.now()}`,
        groupId: params.group.id,
        groupName: params.group.name,
        subject: params.group.subject,
        tutorName: params.group.tutorName,
        date: params.date,
        startTime: params.startTime,
        endTime: params.endTime,
        durationMinutes: params.durationMinutes,
        estimatedCost: params.estimatedCost,
        motivation: params.motivation,
        status: "voting",
        eligibleVoters: params.group.effectiveMembers,
        approveCount: 1,
        rejectCount: 0,
        notVotedCount: params.group.effectiveMembers - 1,
        currentUserVote: "approve",
        proposedBy: MOCK_STUDENT.displayName,
        proposedAt: new Date().toISOString().slice(0, 10),
      };

      setProposals((prev) => [proposal, ...prev]);
      return proposal;
    },
    []
  );

  const castProposalVote = useCallback(
    (proposalId: string, vote: Exclude<StudentVote, null>) => {
      setProposals((prev) =>
        prev.map((proposal) => {
          if (proposal.id !== proposalId) return proposal;
          if (proposal.status !== "voting") return proposal;
          if (!canParticipateInGroup) return proposal;

          const counts = adjustVoteCounts(proposal, proposal.currentUserVote, vote);
          return {
            ...proposal,
            ...counts,
            currentUserVote: vote,
          };
        })
      );
    },
    [canParticipateInGroup]
  );

  const purchaseMissingCredits = useCallback((amount: number) => {
    if (amount <= 0) return;
    setPersonalCredits((prev) => prev + amount);
    setCreditMovements((prev) => [
      ...prev,
      {
        id: `mov_${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        amount,
        description: "Acquisto crediti (demo)",
        walletType: "personal",
      },
    ]);
  }, []);

  const value = useMemo<StudentDashboardContextValue>(
    () => ({
      student: MOCK_STUDENT,
      group: hasActiveGroup ? MOCK_GROUP : null,
      hasActiveGroup,
      canParticipateInGroup,
      personalCredits,
      collectiveCredits,
      wallets,
      lessons,
      proposals,
      creditMovements,
      nextLesson,
      activeProposals,
      bookIndividualLesson,
      publishGroupProposal,
      castProposalVote,
      purchaseMissingCredits,
    }),
    [
      hasActiveGroup,
      canParticipateInGroup,
      personalCredits,
      collectiveCredits,
      wallets,
      lessons,
      proposals,
      creditMovements,
      nextLesson,
      activeProposals,
      bookIndividualLesson,
      publishGroupProposal,
      castProposalVote,
      purchaseMissingCredits,
    ]
  );

  return (
    <StudentDashboardContext.Provider value={value}>
      {children}
    </StudentDashboardContext.Provider>
  );
};

export function useStudentDashboard(): StudentDashboardContextValue {
  const ctx = useContext(StudentDashboardContext);
  if (!ctx) {
    throw new Error("useStudentDashboard must be used within StudentDashboardProvider");
  }
  return ctx;
}

export { getIndividualCost };
