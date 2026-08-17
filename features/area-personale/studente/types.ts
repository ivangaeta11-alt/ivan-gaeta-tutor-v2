/** Stati possibili di una lezione */
export type LessonStatus =
  | "programmata"
  | "confermata"
  | "votazione_aperta"
  | "non_confermata"
  | "annullata_gruppo"
  | "annullata_tutor"
  | "svolta";

export type LessonKind = "individual" | "group_recurring" | "group_extra";

export type WalletType = "personal" | "collective";

export type MaterialType = "dispensa" | "esercizi" | "registrazione" | "formulario";

export type SubmissionStatus = "da_consegnare" | "da_correggere" | "corretta";

export type AttendanceChoice = "partecipo" | "assente" | null;

/** Stato di una proposta di lezione extra — sempre fornito dai dati, mai calcolato dal frontend. */
export type GroupProposalStatus =
  | "voting"
  | "approved"
  | "rejected"
  | "expired"
  | "scheduled"
  | "slot_unavailable"
  | "not_confirmed"
  | "cancelled";

export type StudentVote = "approve" | "reject" | null;

export type IndividualBookingStep = "lesson" | "slot" | "summary" | "confirmation";

export type GroupProposalStep = "group" | "slot" | "details" | "published";

export interface Student {
  id: string;
  displayName: string;
  email: string;
  personalCredits: number;
  /** Membro effettivo del gruppo attivo (non guest, non ex membro) */
  isActiveGroupMember: boolean;
}

export interface GroupMember {
  id: string;
  initials: string;
  isGuest: boolean;
}

export interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  tutorName: string;
  effectiveMembers: number;
  collectiveCredits: number;
  recurringSlots: string[];
  openToNewMembers: boolean;
  members: GroupMember[];
}

export interface Lesson {
  id: string;
  kind: LessonKind;
  groupId: string;
  subject: string;
  groupName: string;
  tutorName?: string;
  date: string;
  startTime: string;
  endTime: string;
  mode: "online" | "in_presenza";
  status: LessonStatus;
  effectiveMembers: number;
  durationMinutes?: number;
  costCredits?: number;
  proposalId?: string;
}

export interface AvailableLessonSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  tutorId: string;
  /** Slot mock entro 24 ore — mostra avviso prima della conferma */
  within24Hours?: boolean;
}

export interface LessonDurationOption {
  minutes: number;
  label: string;
  /** Costo in crediti per lezione individuale */
  individualCost: number;
  /** Costo previsto per lezione extra di gruppo */
  groupExtraCost: number;
}

export interface BookingPriceSummary {
  subject: string;
  tutorName: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  totalCost: number;
  walletBalance: number;
  remainingBalance: number;
  sufficient: boolean;
  missingCredits: number;
}

export interface IndividualLessonBookingDraft {
  subject: string;
  tutorName: string;
  durationMinutes: number;
  slot: AvailableLessonSlot | null;
}

export interface GroupLessonProposal {
  id: string;
  groupId: string;
  groupName: string;
  subject: string;
  tutorName: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  estimatedCost: number;
  motivation?: string;
  status: GroupProposalStatus;
  eligibleVoters: number;
  approveCount: number;
  rejectCount: number;
  notVotedCount: number;
  currentUserVote: StudentVote;
  proposedBy: string;
  proposedAt: string;
}

export interface Wallet {
  type: WalletType;
  label: string;
  balance: number;
  groupId?: string;
  /** Messaggio contestuale, es. saldo sufficiente per N lezioni */
  hint?: string;
}

export interface CreditMovement {
  id: string;
  date: string;
  amount: number;
  description: string;
  walletType: WalletType;
  groupId?: string;
}

export interface Vote {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  favorable: number;
  against: number;
  notVoted: number;
  deadline: string;
}

export interface Material {
  id: string;
  type: MaterialType;
  title: string;
  date: string;
  groupId: string;
}

export interface Submission {
  id: string;
  title: string;
  status: SubmissionStatus;
  dueDate?: string;
  submittedDate?: string;
}

export interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
}

export const LESSON_STATUS_LABELS: Record<LessonStatus, string> = {
  programmata: "Programmata",
  confermata: "Confermata",
  votazione_aperta: "Votazione aperta",
  non_confermata: "Non confermata",
  annullata_gruppo: "Annullata dal gruppo",
  annullata_tutor: "Annullata dal tutor",
  svolta: "Svolta",
};

export const LESSON_KIND_LABELS: Record<LessonKind, string> = {
  individual: "Individuale",
  group_recurring: "Gruppo ricorrente",
  group_extra: "Extra di gruppo",
};

export const GROUP_PROPOSAL_STATUS_LABELS: Record<GroupProposalStatus, string> = {
  voting: "In votazione",
  approved: "Approvata",
  rejected: "Respinta",
  expired: "Scaduta",
  scheduled: "Programmata",
  slot_unavailable: "Slot non disponibile",
  not_confirmed: "Non confermata",
  cancelled: "Annullata",
};

export const MATERIAL_TYPE_LABELS: Record<MaterialType, string> = {
  dispensa: "Dispensa",
  esercizi: "Esercizi",
  registrazione: "Registrazione",
  formulario: "Formulario",
};

export const SUBMISSION_STATUS_LABELS: Record<SubmissionStatus, string> = {
  da_consegnare: "Da consegnare",
  da_correggere: "Da correggere",
  corretta: "Corretta",
};
