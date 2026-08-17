/** Stati possibili di una lezione */
export type LessonStatus =
  | "programmata"
  | "confermata"
  | "votazione_aperta"
  | "non_confermata"
  | "annullata_gruppo"
  | "annullata_tutor"
  | "svolta";

export type WalletType = "personal" | "collective";

export type MaterialType = "dispensa" | "esercizi" | "registrazione" | "formulario";

export type SubmissionStatus = "da_consegnare" | "da_correggere" | "corretta";

export type AttendanceChoice = "partecipo" | "assente" | null;

export interface Student {
  id: string;
  displayName: string;
  email: string;
  personalCredits: number;
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
  groupId: string;
  subject: string;
  groupName: string;
  date: string;
  startTime: string;
  endTime: string;
  mode: "online" | "in_presenza";
  status: LessonStatus;
  effectiveMembers: number;
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
