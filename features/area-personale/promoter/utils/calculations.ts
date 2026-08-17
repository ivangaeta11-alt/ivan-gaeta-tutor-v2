import type {
  AcquiredStudent,
  Commission,
  CommissionPlan,
  LessonRecord,
  LessonType,
  Payout,
  Promoter,
} from "../types";

export interface EnrichedLesson extends LessonRecord {
  studentLabel: string;
  tierRate: number;
  commissionAmount: number;
}

export interface StudentSummary {
  student: AcquiredStudent;
  totalRevenue: number;
  totalCommission: number;
  totalHours: number;
  lastActivity: string | null;
}

export interface PromoterKpis {
  acquiredStudents: number;
  totalRevenue: number;
  totalCommissions: number;
  pendingPayout: number;
  liquidatedCommissions: number;
  totalHours: number;
}

export function getPlanRate(plan: CommissionPlan, lessonType: LessonType): number {
  return plan.rates[lessonType];
}

export function computeCommissionAmount(amount: number, rate: number): number {
  return Math.round(amount * rate * 100) / 100;
}

export function enrichLessons(
  lessons: LessonRecord[],
  students: AcquiredStudent[],
  plans: CommissionPlan[],
  commissions: Commission[]
): EnrichedLesson[] {
  const studentMap = new Map(students.map((s) => [s.id, s]));
  const planMap = new Map(plans.map((p) => [p.id, p]));
  const commissionMap = new Map(commissions.map((c) => [c.lessonRecordId, c]));

  return lessons.map((lesson) => {
    const plan = planMap.get(lesson.commissionPlanId)!;
    const rate = getPlanRate(plan, lesson.lessonType);
    const commission = commissionMap.get(lesson.id);

    return {
      ...lesson,
      studentLabel: studentMap.get(lesson.studentId)?.label ?? "Studente",
      tierRate: commission?.rate ?? rate,
      commissionAmount: commission?.amount ?? computeCommissionAmount(lesson.amount, rate),
    };
  });
}

export function buildStudentSummaries(
  students: AcquiredStudent[],
  lessons: LessonRecord[],
  commissions: Commission[]
): StudentSummary[] {
  const commissionByLesson = new Map(commissions.map((c) => [c.lessonRecordId, c]));

  return students.map((student) => {
    const studentLessons = lessons.filter((l) => l.studentId === student.id);
    const totalRevenue = studentLessons.reduce((sum, l) => sum + l.amount, 0);
    const totalCommission = studentLessons.reduce((sum, l) => {
      const c = commissionByLesson.get(l.id);
      return sum + (c?.amount ?? 0);
    }, 0);
    const totalHours = studentLessons.reduce((sum, l) => sum + l.durationHours, 0);
    const lastActivity =
      studentLessons.length > 0
        ? studentLessons.reduce((latest, l) => (l.date > latest ? l.date : latest), studentLessons[0].date)
        : null;

    return {
      student,
      totalRevenue,
      totalCommission,
      totalHours,
      lastActivity,
    };
  });
}

export function computePromoterKpis(
  students: AcquiredStudent[],
  lessons: LessonRecord[],
  commissions: Commission[],
  payouts: Payout[]
): PromoterKpis {
  const totalRevenue = lessons.reduce((sum, l) => sum + l.amount, 0);
  const totalCommissions = commissions.reduce((sum, c) => sum + c.amount, 0);
  const pendingPayout = payouts
    .filter((p) => p.status === "da_liquidare")
    .reduce((sum, p) => sum + p.commissionsMatured, 0);
  const liquidatedCommissions = commissions
    .filter((c) => c.status === "liquidata")
    .reduce((sum, c) => sum + c.amount, 0);
  const totalHours = lessons.reduce((sum, l) => sum + l.durationHours, 0);

  return {
    acquiredStudents: students.length,
    totalRevenue,
    totalCommissions,
    pendingPayout,
    liquidatedCommissions,
    totalHours,
  };
}

export function getPromoterPlan(
  promoter: Promoter,
  plans: CommissionPlan[]
): CommissionPlan {
  return plans.find((p) => p.id === promoter.commissionPlanId)!;
}
