/** Stati lezione lato tutor */
export type TutorLessonStatus =
  | "programmata"
  | "in_attesa_conferma"
  | "confermata"
  | "non_confermata"
  | "modifica_proposta"
  | "annullata_gruppo"
  | "annullata_tutor"
  | "da_completare"
  | "svolta";

export type TutorLessonType = "individuale" | "gruppo" | "prova";

export type EarningStatus = "previsto" | "in_attesa" | "maturato" | "liquidato" | "annullato";

export type SubmissionStatus = "da_consegnare" | "consegnata" | "da_correggere" | "corretta";

export type MaterialType = "dispensa" | "formulario" | "esercizi" | "simulazione" | "registrazione";

export type ActionPriority = "alta" | "media" | "bassa";

export type TrialRecommendation = "idoneo" | "non_idoneo" | "da_rivalutare";

export type GroupStatus = "aperto" | "chiuso";

export interface Tutor {
  id: string;
  displayName: string;
  email: string;
  photoInitials: string;
  description: string;
  subjects: string[];
  modes: ("online" | "in_presenza")[];
  defaultVideoLink: string;
}

export interface AvailabilitySlot {
  day: string;
  start: string;
  end: string;
}

export interface UnavailabilityPeriod {
  start: string;
  end: string;
  reason: string;
}

export interface TutorStudent {
  id: string;
  displayName: string;
  initials: string;
  groupId: string;
  initialLevel: string;
  objectives: string[];
  lessonsAttended: number;
  absences: number;
  isGuest: boolean;
}

export interface TutorGuest extends TutorStudent {
  trialLessonId: string;
  trialDate: string;
}

export interface TutorGroup {
  id: string;
  name: string;
  subject: string;
  effectiveMembers: number;
  maxCapacity: number;
  status: GroupStatus;
  recurringSlots: string[];
  nextLessonId?: string;
  pendingSubmissions: number;
  guestIds: string[];
}

export interface TutorLesson {
  id: string;
  groupId?: string;
  studentId?: string;
  subject: string;
  label: string;
  date: string;
  startTime: string;
  endTime: string;
  mode: "online" | "in_presenza";
  status: TutorLessonStatus;
  type: TutorLessonType;
  participantCount: number;
  videoLink?: string;
  topics?: string[];
  materials?: string[];
  privateNotes?: string;
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  initials: string;
  present: boolean;
}

export interface TutorMaterial {
  id: string;
  type: MaterialType;
  title: string;
  createdAt: string;
  reusable: boolean;
}

export interface PublishedMaterial {
  id: string;
  title: string;
  type: MaterialType;
  target: string;
  date: string;
  author: string;
  published: boolean;
}

export interface TutorSubmission {
  id: string;
  studentId: string;
  studentName: string;
  groupId: string;
  groupName: string;
  exerciseTitle: string;
  submittedDate?: string;
  dueDate?: string;
  status: SubmissionStatus;
  fileName?: string;
}

export interface TutorEarning {
  id: string;
  date: string;
  label: string;
  lessonType: TutorLessonType;
  durationMinutes: number;
  amount: number;
  status: EarningStatus;
}

export interface RequiredAction {
  id: string;
  type: string;
  title: string;
  priority: ActionPriority;
  dueDate?: string;
  actionLabel: string;
}

export interface TutorNotification {
  id: string;
  message: string;
  date: string;
  read: boolean;
}

export interface TrialEvaluation {
  guestId: string;
  levelAdequate: boolean;
  paceCompatible: boolean;
  mainGaps: string;
  observations: string;
  recommendation: TrialRecommendation | null;
}

export interface GroupVote {
  id: string;
  title: string;
  deadline: string;
}

export const TUTOR_LESSON_STATUS_LABELS: Record<TutorLessonStatus, string> = {
  programmata: "Programmata",
  in_attesa_conferma: "In attesa di conferma",
  confermata: "Confermata",
  non_confermata: "Non confermata",
  modifica_proposta: "Modifica proposta",
  annullata_gruppo: "Annullata dal gruppo",
  annullata_tutor: "Annullata dal tutor",
  da_completare: "Da completare",
  svolta: "Svolta",
};

export const LESSON_TYPE_LABELS: Record<TutorLessonType, string> = {
  individuale: "Individuale",
  gruppo: "Gruppo",
  prova: "Prova",
};

export const EARNING_STATUS_LABELS: Record<EarningStatus, string> = {
  previsto: "Previsto",
  in_attesa: "In attesa",
  maturato: "Maturato",
  liquidato: "Liquidato",
  annullato: "Annullato",
};

export const SUBMISSION_STATUS_LABELS: Record<SubmissionStatus, string> = {
  da_consegnare: "Da consegnare",
  consegnata: "Consegnata",
  da_correggere: "Da correggere",
  corretta: "Corretta",
};

export const MATERIAL_TYPE_LABELS: Record<MaterialType, string> = {
  dispensa: "Dispensa",
  formulario: "Formulario",
  esercizi: "Esercizi",
  simulazione: "Simulazione",
  registrazione: "Registrazione",
};

export const TRIAL_RECOMMENDATION_LABELS: Record<TrialRecommendation, string> = {
  idoneo: "Idoneo",
  non_idoneo: "Non idoneo",
  da_rivalutare: "Da rivalutare",
};
