import type {
  AcquiredStudent,
  Commission,
  CommissionPlan,
  LessonRecord,
  LessonType,
  Payout,
  Promoter,
} from "../types";
import { computeCommissionAmount, getPlanRate } from "../utils/calculations";

export const DEMO_COMMISSION_PLANS: CommissionPlan[] = [
  {
    id: "promoter_2026_launch",
    displayName: "Early Promoter 2026",
    rates: {
      individuale: 0.1,
      gruppo_piccolo: 0.15,
      gruppo_grande: 0.2,
    },
  },
];

export const DEMO_PROMOTER: Promoter = {
  id: "promo_demo_001",
  displayName: "Promoter Demo",
  email: "promoter.demo@example.com",
  referralLink: "https://example.com/?ref=DEMO",
  referralCode: "DEMO123",
  commissionPlanId: "promoter_2026_launch",
  nextPayoutDate: "2026-09-01",
  lastPayoutDate: "2026-08-16",
};

export const DEMO_STUDENTS: AcquiredStudent[] = [
  { id: "s1042", label: "Studente #1042", acquiredAt: "2026-05-10", commissionPlanId: "promoter_2026_launch" },
  { id: "s1051", label: "Studente #1051", acquiredAt: "2026-06-02", commissionPlanId: "promoter_2026_launch" },
  { id: "s1068", label: "Studente #1068", acquiredAt: "2026-06-15", commissionPlanId: "promoter_2026_launch" },
  { id: "s1073", label: "Studente #1073", acquiredAt: "2026-07-01", commissionPlanId: "promoter_2026_launch" },
  { id: "s1089", label: "Studente #1089", acquiredAt: "2026-07-12", commissionPlanId: "promoter_2026_launch" },
  { id: "s1095", label: "Studente #1095", acquiredAt: "2026-07-20", commissionPlanId: "promoter_2026_launch" },
  { id: "s1102", label: "Studente #1102", acquiredAt: "2026-08-01", commissionPlanId: "promoter_2026_launch" },
];

/** Prestazioni demo — l'attribuzione studente è permanente; il tier varia per singola lezione. */
const RAW_LESSONS: Omit<LessonRecord, "commissionPlanId">[] = [
  // Maggio 2026
  { id: "l028", studentId: "s1042", date: "2026-05-15", lessonType: "individuale", durationHours: 1, amount: 25 },
  { id: "l029", studentId: "s1042", date: "2026-05-22", lessonType: "gruppo_piccolo", durationHours: 1.5, amount: 27 },

  // Giugno 2026
  { id: "l001", studentId: "s1042", date: "2026-06-05", lessonType: "individuale", durationHours: 1.5, amount: 37.5 },
  { id: "l002", studentId: "s1042", date: "2026-06-12", lessonType: "individuale", durationHours: 1, amount: 25 },
  { id: "l003", studentId: "s1051", date: "2026-06-18", lessonType: "gruppo_piccolo", durationHours: 2, amount: 36 },
  { id: "l004", studentId: "s1051", date: "2026-06-25", lessonType: "individuale", durationHours: 1, amount: 25 },
  { id: "l005", studentId: "s1068", date: "2026-06-28", lessonType: "gruppo_grande", durationHours: 1.5, amount: 22.5 },

  // Luglio 2026
  { id: "l006", studentId: "s1042", date: "2026-07-03", lessonType: "gruppo_piccolo", durationHours: 1.5, amount: 27 },
  { id: "l007", studentId: "s1051", date: "2026-07-08", lessonType: "individuale", durationHours: 1, amount: 25 },
  { id: "l008", studentId: "s1068", date: "2026-07-14", lessonType: "individuale", durationHours: 2, amount: 50 },
  { id: "l009", studentId: "s1073", date: "2026-07-18", lessonType: "gruppo_piccolo", durationHours: 1.5, amount: 27 },
  { id: "l010", studentId: "s1089", date: "2026-07-22", lessonType: "individuale", durationHours: 1, amount: 25 },
  { id: "l011", studentId: "s1095", date: "2026-07-28", lessonType: "gruppo_grande", durationHours: 2, amount: 30 },

  // 1–15 agosto 2026
  { id: "l012", studentId: "s1042", date: "2026-08-12", lessonType: "individuale", durationHours: 1, amount: 25 },
  { id: "l013", studentId: "s1042", date: "2026-08-14", lessonType: "gruppo_piccolo", durationHours: 1.5, amount: 18 },
  { id: "l014", studentId: "s1051", date: "2026-08-02", lessonType: "gruppo_grande", durationHours: 2, amount: 30 },
  { id: "l015", studentId: "s1068", date: "2026-08-05", lessonType: "individuale", durationHours: 1.5, amount: 37.5 },
  { id: "l016", studentId: "s1073", date: "2026-08-08", lessonType: "gruppo_piccolo", durationHours: 2, amount: 36 },
  { id: "l017", studentId: "s1089", date: "2026-08-10", lessonType: "gruppo_grande", durationHours: 1.5, amount: 22.5 },
  { id: "l018", studentId: "s1095", date: "2026-08-11", lessonType: "individuale", durationHours: 1, amount: 25 },
  { id: "l019", studentId: "s1102", date: "2026-08-13", lessonType: "individuale", durationHours: 2, amount: 50 },
  { id: "l020", studentId: "s1051", date: "2026-08-15", lessonType: "gruppo_piccolo", durationHours: 1, amount: 18 },

  // 16–31 agosto 2026
  { id: "l021", studentId: "s1042", date: "2026-08-16", lessonType: "gruppo_grande", durationHours: 1.5, amount: 15 },
  { id: "l022", studentId: "s1068", date: "2026-08-17", lessonType: "gruppo_piccolo", durationHours: 1.5, amount: 27 },
  { id: "l023", studentId: "s1073", date: "2026-08-19", lessonType: "individuale", durationHours: 1, amount: 25 },
  { id: "l024", studentId: "s1089", date: "2026-08-21", lessonType: "gruppo_grande", durationHours: 2, amount: 30 },
  { id: "l025", studentId: "s1095", date: "2026-08-23", lessonType: "gruppo_piccolo", durationHours: 1.5, amount: 27 },
  { id: "l026", studentId: "s1102", date: "2026-08-25", lessonType: "gruppo_grande", durationHours: 1.5, amount: 22.5 },
  { id: "l027", studentId: "s1051", date: "2026-08-28", lessonType: "individuale", durationHours: 1, amount: 25 },
];

const PLAN = DEMO_COMMISSION_PLANS[0];

/** Scala importi per centrare il target ricavi demo (€ 1.840). */
const RAW_REVENUE_SUM = RAW_LESSONS.reduce((s, l) => s + l.amount, 0);
const REVENUE_TARGET = 1840;
const AMOUNT_SCALE = REVENUE_TARGET / RAW_REVENUE_SUM;

function buildScaledLessons(): LessonRecord[] {
  const scaledAmounts = RAW_LESSONS.map(
    (l) => Math.round(l.amount * AMOUNT_SCALE * 100) / 100
  );
  const diff = REVENUE_TARGET - scaledAmounts.reduce((s, a) => s + a, 0);
  scaledAmounts[scaledAmounts.length - 1] =
    Math.round((scaledAmounts[scaledAmounts.length - 1] + diff) * 100) / 100;

  return RAW_LESSONS.map((lesson, i) => ({
    ...lesson,
    amount: scaledAmounts[i],
    commissionPlanId: PLAN.id,
  }));
}

export const DEMO_LESSONS: LessonRecord[] = buildScaledLessons();

function buildCommission(lesson: LessonRecord, index: number): Commission {
  const rate = getPlanRate(PLAN, lesson.lessonType);
  return {
    id: `c${String(index + 1).padStart(3, "0")}`,
    lessonRecordId: lesson.id,
    studentId: lesson.studentId,
    amount: computeCommissionAmount(lesson.amount, rate),
    rate,
    status: "maturata",
    maturedAt: lesson.date,
  };
}

export const DEMO_COMMISSIONS: Commission[] = DEMO_LESSONS.map(buildCommission);

/** Assegna commissioni ai periodi di liquidazione in base alla data prestazione. */
function assignPayouts(commissions: Commission[]): Payout[] {
  const periods: Array<{
    id: string;
    start: string;
    end: string;
    payoutDate: string;
    status: Payout["status"];
  }> = [
    {
      id: "pay_may",
      start: "2026-05-01",
      end: "2026-05-31",
      payoutDate: "2026-06-01",
      status: "liquidata",
    },
    {
      id: "pay_jun",
      start: "2026-06-01",
      end: "2026-06-30",
      payoutDate: "2026-07-01",
      status: "liquidata",
    },
    {
      id: "pay_jul",
      start: "2026-07-01",
      end: "2026-07-31",
      payoutDate: "2026-08-01",
      status: "liquidata",
    },
    {
      id: "pay_aug_1",
      start: "2026-08-01",
      end: "2026-08-15",
      payoutDate: "2026-08-16",
      status: "liquidata",
    },
    {
      id: "pay_aug_2",
      start: "2026-08-16",
      end: "2026-08-31",
      payoutDate: "2026-09-01",
      status: "da_liquidare",
    },
  ];

  const lessonDateMap = new Map(DEMO_LESSONS.map((l) => [l.id, l.date]));

  return periods.map((period) => {
    const periodCommissions = commissions.filter((c) => {
      const lessonDate = lessonDateMap.get(c.lessonRecordId)!;
      return lessonDate >= period.start && lessonDate <= period.end;
    });

    const commissionIds = periodCommissions.map((c) => c.id);
    const total = Math.round(periodCommissions.reduce((s, c) => s + c.amount, 0) * 100) / 100;

    periodCommissions.forEach((c) => {
      c.payoutId = period.id;
      c.status = period.status === "liquidata" ? "liquidata" : "da_liquidare";
    });

    return {
      id: period.id,
      periodStart: period.start,
      periodEnd: period.end,
      payoutDate: period.payoutDate,
      commissionsMatured: total,
      amountPaid: period.status === "liquidata" ? total : null,
      status: period.status,
      commissionIds,
    };
  });
}

export const DEMO_PAYOUTS: Payout[] = assignPayouts(DEMO_COMMISSIONS);

export function getStudentById(id: string): AcquiredStudent | undefined {
  return DEMO_STUDENTS.find((s) => s.id === id);
}

export function getLessonsForStudent(studentId: string): LessonRecord[] {
  return DEMO_LESSONS.filter((l) => l.studentId === studentId).sort(
    (a, b) => a.date.localeCompare(b.date)
  );
}

export function getCommissionPlanById(id: string): CommissionPlan | undefined {
  return DEMO_COMMISSION_PLANS.find((p) => p.id === id);
}

/** Liquidazioni visibili in UI — periodi recenti con importi calcolati dai dati demo. */
export const DEMO_PAYOUTS_DISPLAY = DEMO_PAYOUTS.filter(
  (p) => p.id === "pay_aug_1" || p.id === "pay_aug_2"
);

/** Opzioni filtro tipologia lezione */
export const LESSON_TYPE_OPTIONS: { value: LessonType | "all"; label: string }[] = [
  { value: "all", label: "Tutte le tipologie" },
  { value: "individuale", label: "Individuale" },
  { value: "gruppo_piccolo", label: "Gruppo piccolo" },
  { value: "gruppo_grande", label: "Gruppo grande" },
];
