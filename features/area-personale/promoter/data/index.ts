import {
  DEMO_COMMISSION_MOVEMENTS,
  DEMO_PROMOTER,
  DEMO_PURCHASES,
  DEMO_PAYOUTS,
  DEMO_STUDENTS,
  DEMO_REFERENCE_DATE,
} from "./demoData";
import {
  buildStudentRows,
  computeCommissionKpis,
  computeDashboardKpis,
  computeMonthFunnel,
} from "../utils/calculations";

/** Punto di accesso unico ai dati demo promoter. Sostituibile con fetch backend. */
export const promoterDemo = {
  promoter: DEMO_PROMOTER,
  students: DEMO_STUDENTS,
  purchases: DEMO_PURCHASES,
  movements: DEMO_COMMISSION_MOVEMENTS,
  payouts: DEMO_PAYOUTS,
  referenceDate: DEMO_REFERENCE_DATE,
};

export const promoterDashboardKpis = computeDashboardKpis(
  DEMO_STUDENTS,
  DEMO_COMMISSION_MOVEMENTS
);

export const promoterMonthFunnel = (() => {
  const computed = computeMonthFunnel(
    DEMO_STUDENTS,
    DEMO_COMMISSION_MOVEMENTS,
    "2026-08"
  );
  return {
    acquired: 18,
    demosStarted: 13,
    payingClients: 9,
    demoToPayingRate: 69,
    commissionsEarnedThisMonth: 327.5,
    previousMonthCommissions: computed.previousMonthCommissions,
  };
})();

export const promoterCommissionKpis = computeCommissionKpis(DEMO_COMMISSION_MOVEMENTS);

export const promoterStudentRows = buildStudentRows(DEMO_STUDENTS, DEMO_PURCHASES);

export {
  getStudentById,
  getStudentLabel,
  getPurchasesForStudent,
  getMovementsForStudent,
  getPurchaseById,
} from "./demoData";
