import {
  DEMO_COMMISSIONS,
  DEMO_COMMISSION_PLANS,
  DEMO_LESSONS,
  DEMO_PAYOUTS,
  DEMO_PROMOTER,
  DEMO_STUDENTS,
} from "./demoData";
import {
  buildStudentSummaries,
  computePromoterKpis,
  enrichLessons,
  getPromoterPlan,
} from "../utils/calculations";

/** Punto di accesso unico ai dati demo promoter — sostituibile con fetch backend. */
export const promoterDemo = {
  promoter: DEMO_PROMOTER,
  plans: DEMO_COMMISSION_PLANS,
  students: DEMO_STUDENTS,
  lessons: DEMO_LESSONS,
  commissions: DEMO_COMMISSIONS,
  payouts: DEMO_PAYOUTS,
};

export const promoterPlan = getPromoterPlan(DEMO_PROMOTER, DEMO_COMMISSION_PLANS);
export const promoterKpis = computePromoterKpis(
  DEMO_STUDENTS,
  DEMO_LESSONS,
  DEMO_COMMISSIONS,
  DEMO_PAYOUTS
);
export const studentSummaries = buildStudentSummaries(
  DEMO_STUDENTS,
  DEMO_LESSONS,
  DEMO_COMMISSIONS
);
export const enrichedLessons = enrichLessons(
  DEMO_LESSONS,
  DEMO_STUDENTS,
  DEMO_COMMISSION_PLANS,
  DEMO_COMMISSIONS
);
