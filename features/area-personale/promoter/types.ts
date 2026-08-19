export type StudentStatus = "registrato" | "demo" | "cliente" | "inattivo";

export type CommissionMovementStatus =
  | "in_maturazione"
  | "liquidabile"
  | "pagata"
  | "stornata";

export type PayoutRecordStatus = "pagata" | "in_elaborazione";

export interface Promoter {
  id: string;
  displayName: string;
  email: string;
  referralLink: string;
  referralCode: string;
  nextPayoutDate: string;
  lastPayoutDate: string;
}

/** Studente acquisito con attribuzione permanente al promoter. */
export interface AcquiredStudent {
  id: string;
  label: string;
  acquiredAt: string;
  status: StudentStatus;
}

/** Acquisto valido sullo studente (lezioni, crediti, pacchetti). */
export interface PurchaseRecord {
  id: string;
  studentId: string;
  date: string;
  amount: number;
  label: string;
}

/** Singola commissione generata da un acquisto. */
export interface CommissionMovement {
  id: string;
  purchaseId: string;
  studentId: string;
  purchaseDate: string;
  purchaseAmount: number;
  commissionAmount: number;
  status: CommissionMovementStatus;
  /** Data in cui completa i 15 giorni di maturazione. */
  liquidableFrom: string;
  /** Prima data di liquidazione utile (1 o 16 del mese). */
  firstEligiblePayoutDate: string;
  payoutId?: string;
}

export interface PayoutRecord {
  id: string;
  payoutDate: string;
  amount: number;
  commissionCount: number;
  status: PayoutRecordStatus;
  commissionIds: string[];
}

export const STUDENT_STATUS_LABELS: Record<StudentStatus, string> = {
  registrato: "Registrato",
  demo: "Demo",
  cliente: "Cliente",
  inattivo: "Inattivo",
};

export const COMMISSION_STATUS_LABELS: Record<CommissionMovementStatus, string> = {
  in_maturazione: "In maturazione",
  liquidabile: "Liquidabile",
  pagata: "Pagata",
  stornata: "Stornata",
};

export const PAYOUT_STATUS_LABELS: Record<PayoutRecordStatus, string> = {
  pagata: "Pagata",
  in_elaborazione: "In elaborazione",
};
