import type {
  AvailableLessonSlot,
  GroupLessonProposal,
  LessonDurationOption,
} from "../types";

export const MOCK_ASSIGNED_TUTOR = {
  id: "tutor_ivan",
  name: "Ivan Gaeta",
};

export const MOCK_BOOKING_SUBJECTS = ["Fisica", "Analisi matematica"] as const;

export const MOCK_DURATION_OPTIONS: LessonDurationOption[] = [
  { minutes: 60, label: "60 minuti", individualCost: 25, groupExtraCost: 30 },
  { minutes: 90, label: "90 minuti", individualCost: 35, groupExtraCost: 40 },
  { minutes: 120, label: "120 minuti", individualCost: 45, groupExtraCost: 55 },
];

/** Slot disponibili per lezione individuale con Ivan Gaeta */
export const MOCK_INDIVIDUAL_SLOTS: AvailableLessonSlot[] = [
  {
    id: "ind_slot_1",
    date: "2026-08-20",
    startTime: "10:00",
    endTime: "11:00",
    tutorId: "tutor_ivan",
  },
  {
    id: "ind_slot_2",
    date: "2026-08-20",
    startTime: "15:00",
    endTime: "16:30",
    tutorId: "tutor_ivan",
  },
  {
    id: "ind_slot_3",
    date: "2026-08-22",
    startTime: "11:00",
    endTime: "12:30",
    tutorId: "tutor_ivan",
  },
  {
    id: "ind_slot_4",
    date: "2026-08-18",
    startTime: "09:00",
    endTime: "10:30",
    tutorId: "tutor_ivan",
    within24Hours: true,
  },
];

/** Slot compatibili per lezione extra di gruppo */
export const MOCK_GROUP_EXTRA_SLOTS: AvailableLessonSlot[] = [
  {
    id: "grp_slot_1",
    date: "2026-08-23",
    startTime: "10:00",
    endTime: "11:30",
    tutorId: "tutor_ivan",
  },
  {
    id: "grp_slot_2",
    date: "2026-08-24",
    startTime: "17:00",
    endTime: "18:30",
    tutorId: "tutor_ivan",
  },
  {
    id: "grp_slot_3",
    date: "2026-08-27",
    startTime: "10:00",
    endTime: "11:00",
    tutorId: "tutor_ivan",
  },
];

export const MOCK_GROUP_PROPOSALS: GroupLessonProposal[] = [
  {
    id: "prop_001",
    groupId: "grp_smf_01",
    groupName: "Gruppo SMF 01",
    subject: "Fisica",
    tutorName: "Ivan Gaeta",
    date: "2026-08-23",
    startTime: "10:00",
    endTime: "11:30",
    durationMinutes: 90,
    estimatedCost: 40,
    motivation: "Ripasso aggiuntivo prima della simulazione.",
    status: "voting",
    eligibleVoters: 7,
    approveCount: 4,
    rejectCount: 1,
    notVotedCount: 2,
    currentUserVote: null,
    proposedBy: "Laura B.",
    proposedAt: "2026-08-16",
  },
  {
    id: "prop_002",
    groupId: "grp_smf_01",
    groupName: "Gruppo SMF 01",
    subject: "Fisica",
    tutorName: "Ivan Gaeta",
    date: "2026-08-30",
    startTime: "18:00",
    endTime: "19:30",
    durationMinutes: 90,
    estimatedCost: 40,
    motivation: "Simulazione d'esame di gruppo.",
    status: "scheduled",
    eligibleVoters: 7,
    approveCount: 6,
    rejectCount: 0,
    notVotedCount: 1,
    currentUserVote: "approve",
    proposedBy: "Marco R.",
    proposedAt: "2026-08-10",
  },
  {
    id: "prop_003",
    groupId: "grp_smf_01",
    groupName: "Gruppo SMF 01",
    subject: "Fisica",
    tutorName: "Ivan Gaeta",
    date: "2026-08-09",
    startTime: "17:00",
    endTime: "18:00",
    durationMinutes: 60,
    estimatedCost: 30,
    motivation: "Recupero argomenti saltati.",
    status: "rejected",
    eligibleVoters: 7,
    approveCount: 2,
    rejectCount: 5,
    notVotedCount: 0,
    currentUserVote: "reject",
    proposedBy: "Andrea S.",
    proposedAt: "2026-08-05",
  },
  {
    id: "prop_004",
    groupId: "grp_smf_01",
    groupName: "Gruppo SMF 01",
    subject: "Fisica",
    tutorName: "Ivan Gaeta",
    date: "2026-07-20",
    startTime: "10:00",
    endTime: "11:30",
    durationMinutes: 90,
    estimatedCost: 40,
    status: "expired",
    eligibleVoters: 7,
    approveCount: 3,
    rejectCount: 1,
    notVotedCount: 3,
    currentUserVote: null,
    proposedBy: "Fabio C.",
    proposedAt: "2026-07-12",
  },
];

export function getDurationOption(minutes: number): LessonDurationOption {
  return (
    MOCK_DURATION_OPTIONS.find((d) => d.minutes === minutes) ?? MOCK_DURATION_OPTIONS[1]
  );
}

export function getIndividualCost(durationMinutes: number): number {
  return getDurationOption(durationMinutes).individualCost;
}

export function getGroupExtraCost(durationMinutes: number): number {
  return getDurationOption(durationMinutes).groupExtraCost;
}
