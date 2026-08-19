import type {
  AcquiredStudent,
  CommissionMovement,
  PayoutRecord,
  PurchaseRecord,
} from "../types";
import {
  cappedValidSpend,
  cumulativeCommission,
  remainingPotential,
  isCommissionComplete,
} from "./commissionModel";

export interface StudentRow {
  student: AcquiredStudent;
  validSpend: number;
  commissionEarned: number;
  remaining: number;
  isComplete: boolean;
}

export interface DashboardKpis {
  acquiredStudents: number;
  studentsInDemo: number;
  maturingCommissions: number;
  liquidableCommissions: number;
}

export interface MonthFunnel {
  acquired: number;
  demosStarted: number;
  payingClients: number;
  demoToPayingRate: number;
  commissionsEarnedThisMonth: number;
  previousMonthCommissions: number;
}

export interface CommissionKpis {
  maturing: number;
  liquidable: number;
  paid: number;
}

export function sumPurchasesForStudent(
  studentId: string,
  purchases: PurchaseRecord[]
): number {
  return purchases
    .filter((p) => p.studentId === studentId)
    .reduce((sum, p) => sum + p.amount, 0);
}

export function buildStudentRows(
  students: AcquiredStudent[],
  purchases: PurchaseRecord[]
): StudentRow[] {
  return students.map((student) => {
    const totalSpend = sumPurchasesForStudent(student.id, purchases);
    const validSpend = cappedValidSpend(totalSpend);
    const commissionEarned = cumulativeCommission(validSpend);
    return {
      student,
      validSpend,
      commissionEarned,
      remaining: remainingPotential(validSpend),
      isComplete: isCommissionComplete(validSpend),
    };
  });
}

export function computeDashboardKpis(
  students: AcquiredStudent[],
  movements: CommissionMovement[]
): DashboardKpis {
  return {
    acquiredStudents: students.length,
    studentsInDemo: students.filter((s) => s.status === "demo").length,
    maturingCommissions: movements
      .filter((m) => m.status === "in_maturazione")
      .reduce((s, m) => s + m.commissionAmount, 0),
    liquidableCommissions: movements
      .filter((m) => m.status === "liquidabile")
      .reduce((s, m) => s + m.commissionAmount, 0),
  };
}

export function computeMonthFunnel(
  students: AcquiredStudent[],
  movements: CommissionMovement[],
  monthPrefix: string
): MonthFunnel {
  const acquired = students.filter((s) => s.acquiredAt.startsWith(monthPrefix)).length;
  const demosStarted = students.filter(
    (s) =>
      s.acquiredAt.startsWith(monthPrefix) &&
      (s.status === "demo" || s.status === "cliente")
  ).length;
  const payingClients = students.filter(
    (s) => s.acquiredAt.startsWith(monthPrefix) && s.status === "cliente"
  ).length;
  const demoToPayingRate =
    demosStarted > 0 ? Math.round((payingClients / demosStarted) * 100) : 0;
  const commissionsEarnedThisMonth = movements
    .filter((m) => m.purchaseDate.startsWith(monthPrefix))
    .reduce((s, m) => s + m.commissionAmount, 0);

  const prevMonth = monthPrefix === "2026-08" ? "2026-07" : "2026-07";
  const previousMonthCommissions = movements
    .filter((m) => m.purchaseDate.startsWith(prevMonth))
    .reduce((s, m) => s + m.commissionAmount, 0);

  return {
    acquired,
    demosStarted,
    payingClients,
    demoToPayingRate,
    commissionsEarnedThisMonth,
    previousMonthCommissions,
  };
}

export function computeCommissionKpis(movements: CommissionMovement[]): CommissionKpis {
  return {
    maturing: movements
      .filter((m) => m.status === "in_maturazione")
      .reduce((s, m) => s + m.commissionAmount, 0),
    liquidable: movements
      .filter((m) => m.status === "liquidabile")
      .reduce((s, m) => s + m.commissionAmount, 0),
    paid: movements
      .filter((m) => m.status === "pagata")
      .reduce((s, m) => s + m.commissionAmount, 0),
  };
}

export function getMovementsForPayout(
  payout: PayoutRecord,
  movements: CommissionMovement[]
): CommissionMovement[] {
  if (payout.commissionIds.length === 0) {
    return movements.filter((m) => m.payoutId === payout.id);
  }
  return movements.filter((m) => payout.commissionIds.includes(m.id));
}
