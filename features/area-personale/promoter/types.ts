/** Tipologia prestazione — la percentuale commissione dipende da questa, non dall'attribuzione studente. */
export type LessonType = "individuale" | "gruppo_piccolo" | "gruppo_grande";

export type CommissionStatus = "maturata" | "da_liquidare" | "liquidata";

export type PayoutStatus = "liquidata" | "da_liquidare" | "in_elaborazione";

export interface CommissionPlanRates {
  individuale: number;
  gruppo_piccolo: number;
  gruppo_grande: number;
}

export interface CommissionPlan {
  id: string;
  /** Nome visualizzato in UI */
  displayName: string;
  rates: CommissionPlanRates;
}

export interface Promoter {
  id: string;
  displayName: string;
  email: string;
  referralLink: string;
  referralCode: string;
  /** Piano bloccato al momento dell'iscrizione promoter */
  commissionPlanId: string;
  nextPayoutDate: string;
  lastPayoutDate: string;
}

/** Studente acquisito — attribuzione permanente al promoter */
export interface AcquiredStudent {
  id: string;
  label: string;
  acquiredAt: string;
  /** Piano commissionale al momento dell'acquisizione */
  commissionPlanId: string;
}

export interface LessonRecord {
  id: string;
  studentId: string;
  date: string;
  lessonType: LessonType;
  durationHours: number;
  amount: number;
  commissionPlanId: string;
}

export interface Commission {
  id: string;
  lessonRecordId: string;
  studentId: string;
  amount: number;
  rate: number;
  status: CommissionStatus;
  payoutId?: string;
  maturedAt: string;
}

export interface Payout {
  id: string;
  periodStart: string;
  periodEnd: string;
  payoutDate: string;
  commissionsMatured: number;
  amountPaid: number | null;
  status: PayoutStatus;
  commissionIds: string[];
}

export const LESSON_TYPE_LABELS: Record<LessonType, string> = {
  individuale: "Individuale",
  gruppo_piccolo: "Gruppo piccolo",
  gruppo_grande: "Gruppo grande",
};
