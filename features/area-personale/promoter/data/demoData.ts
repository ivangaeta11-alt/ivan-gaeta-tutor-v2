import type {
  AcquiredStudent,
  CommissionMovement,
  PayoutRecord,
  Promoter,
  PurchaseRecord,
} from "../types";
import {
  addDays,
  getFirstEligiblePayoutDate,
  incrementalCommission,
} from "../utils/commissionModel";

export const DEMO_REFERENCE_DATE = "2026-08-19";

/** Etichette per studenti storici (solo movimenti commissione, non in lista Studenti). */
export const HISTORICAL_STUDENT_LABELS: Record<string, string> = {
  hist_01: "Claudio M.",
  hist_02: "Daniela F.",
  hist_03: "Enrico P.",
  hist_04: "Fabiana L.",
  hist_05: "Gianni S.",
  hist_06: "Helena R.",
  hist_07: "Ivo C.",
  hist_08: "Jessica T.",
  hist_09: "Kevin D.",
  hist_10: "Loredana V.",
  hist_11: "Massimo A.",
  hist_12: "Nadia G.",
  hist_13: "Omar B.",
  hist_14: "Patrizia N.",
  hist_15: "Quirino E.",
  hist_16: "Rita O.",
  hist_17: "Silvio H.",
  hist_18: "Teresa K.",
  hist_19: "Umberto Z.",
  hist_20: "Vera J.",
  hist_21: "Walter Q.",
  hist_22: "Xenia U.",
  hist_23: "Ylenia W.",
  hist_24: "Zeno X.",
  hist_25: "Alice Y.",
  hist_26: "Bruno I.",
  hist_27: "Cinzia O.",
  hist_28: "Dario P.",
  hist_29: "Elisa R.",
  hist_30: "Fabio S.",
  hist_31: "Grazia T.",
  hist_32: "Hugo V.",
  hist_33: "Irene A.",
  hist_34: "Jacopo B.",
  hist_35: "Katia C.",
  hist_36: "Luigi D.",
  hist_37: "Monica E.",
  hist_38: "Renato L.",
  hist_39: "Serena M.",
  hist_40: "Tiziano N.",
  hist_41: "Ulrico O.",
  hist_42: "Viviana P.",
  hist_43: "William Q.",
  hist_44: "Xander R.",
  hist_45: "Yara S.",
};

export const DEMO_PROMOTER: Promoter = {
  id: "promo_demo_001",
  displayName: "Marco Promoter",
  email: "promoter.demo@example.com",
  referralLink: "https://ivangaetatutor.com/r/MARCO27",
  referralCode: "MARCO27",
  nextPayoutDate: "2026-09-01",
  lastPayoutDate: "2026-08-16",
};

export const DEMO_STUDENTS: AcquiredStudent[] = [
  { id: "s001", label: "Mario R.", acquiredAt: "2026-03-12", status: "cliente" },
  { id: "s002", label: "Giulia B.", acquiredAt: "2026-04-05", status: "cliente" },
  { id: "s003", label: "Luca P.", acquiredAt: "2026-05-20", status: "demo" },
  { id: "s004", label: "Anna C.", acquiredAt: "2026-06-01", status: "cliente" },
  { id: "s005", label: "Sara M.", acquiredAt: "2026-06-18", status: "cliente" },
  { id: "s006", label: "Paolo T.", acquiredAt: "2026-07-02", status: "registrato" },
  { id: "s007", label: "Elena V.", acquiredAt: "2026-07-08", status: "cliente" },
  { id: "s008", label: "Davide F.", acquiredAt: "2026-07-14", status: "registrato" },
  { id: "s009", label: "Chiara L.", acquiredAt: "2026-07-20", status: "registrato" },
  { id: "s010", label: "Matteo G.", acquiredAt: "2026-08-01", status: "demo" },
  { id: "s011", label: "Francesca N.", acquiredAt: "2026-08-01", status: "demo" },
  { id: "s012", label: "Andrea S.", acquiredAt: "2026-08-03", status: "cliente" },
  { id: "s013", label: "Valentina R.", acquiredAt: "2026-08-05", status: "demo" },
  { id: "s014", label: "Simone D.", acquiredAt: "2026-08-07", status: "cliente" },
  { id: "s015", label: "Martina P.", acquiredAt: "2026-08-09", status: "registrato" },
  { id: "s016", label: "Roberto C.", acquiredAt: "2026-08-10", status: "cliente" },
  { id: "s017", label: "Ilaria B.", acquiredAt: "2026-08-11", status: "demo" },
  { id: "s018", label: "Federico A.", acquiredAt: "2026-08-12", status: "cliente" },
  { id: "s019", label: "Giorgio M.", acquiredAt: "2026-08-13", status: "cliente" },
  { id: "s020", label: "Laura Z.", acquiredAt: "2026-08-14", status: "cliente" },
  { id: "s021", label: "Nicola H.", acquiredAt: "2026-08-15", status: "inattivo" },
  { id: "s022", label: "Alessia K.", acquiredAt: "2026-08-15", status: "cliente" },
  { id: "s023", label: "Tommaso W.", acquiredAt: "2026-08-16", status: "cliente" },
  { id: "s024", label: "Beatrice Q.", acquiredAt: "2026-08-16", status: "registrato" },
  { id: "s025", label: "Stefano J.", acquiredAt: "2026-08-17", status: "demo" },
  { id: "s026", label: "Camilla O.", acquiredAt: "2026-08-17", status: "registrato" },
  { id: "s027", label: "Riccardo U.", acquiredAt: "2026-08-18", status: "cliente" },
];

const RAW_PURCHASES: Omit<PurchaseRecord, "id">[] = [
  { studentId: "s001", date: "2026-03-20", amount: 40, label: "Pacchetto lezioni" },
  { studentId: "s001", date: "2026-04-10", amount: 35, label: "Crediti lezioni" },
  { studentId: "s001", date: "2026-05-05", amount: 30, label: "Crediti lezioni" },
  { studentId: "s002", date: "2026-08-08", amount: 40, label: "Crediti lezioni" },
  { studentId: "s002", date: "2026-08-15", amount: 32, label: "Crediti lezioni" },
  { studentId: "s004", date: "2026-07-28", amount: 25, label: "Primo acquisto" },
  { studentId: "s005", date: "2026-07-05", amount: 30, label: "Crediti lezioni" },
  { studentId: "s005", date: "2026-07-22", amount: 25, label: "Crediti lezioni" },
  { studentId: "s007", date: "2026-07-12", amount: 50, label: "Pacchetto lezioni" },
  { studentId: "s007", date: "2026-08-01", amount: 38, label: "Crediti lezioni" },
  { studentId: "s010", date: "2026-08-02", amount: 45, label: "Crediti lezioni" },
  { studentId: "s012", date: "2026-08-06", amount: 60, label: "Pacchetto lezioni" },
  { studentId: "s014", date: "2026-08-08", amount: 20, label: "Primo acquisto" },
  { studentId: "s016", date: "2026-08-12", amount: 35, label: "Crediti lezioni" },
  { studentId: "s018", date: "2026-08-14", amount: 50, label: "Pacchetto lezioni" },
  { studentId: "s019", date: "2026-07-14", amount: 100, label: "Pacchetto completo" },
  { studentId: "s020", date: "2026-08-10", amount: 28, label: "Crediti lezioni" },
  { studentId: "s022", date: "2026-08-15", amount: 22, label: "Primo acquisto" },
  { studentId: "s023", date: "2026-08-16", amount: 40, label: "Crediti lezioni" },
  { studentId: "s025", date: "2026-08-18", amount: 30, label: "Crediti lezioni" },
  { studentId: "s026", date: "2026-08-17", amount: 40, label: "Crediti lezioni" },
  { studentId: "s027", date: "2026-08-18", amount: 50, label: "Pacchetto lezioni" },
  { studentId: "s003", date: "2026-07-17", amount: 50, label: "Crediti lezioni" },
  { studentId: "s001", date: "2026-08-18", amount: 30, label: "Crediti extra (oltre cap)" },
  // Acquisti luglio ancora da liquidare (pool liquidabile)
  { studentId: "s006", date: "2026-07-18", amount: 45, label: "Crediti lezioni" },
  { studentId: "s008", date: "2026-07-21", amount: 38, label: "Primo acquisto" },
  { studentId: "s009", date: "2026-07-24", amount: 52, label: "Pacchetto lezioni" },
  { studentId: "s011", date: "2026-07-26", amount: 30, label: "Crediti lezioni" },
  { studentId: "s013", date: "2026-07-28", amount: 44, label: "Crediti lezioni" },
  { studentId: "s015", date: "2026-07-30", amount: 36, label: "Primo acquisto" },
  { studentId: "s017", date: "2026-08-01", amount: 48, label: "Pacchetto lezioni" },
  { studentId: "s021", date: "2026-08-03", amount: 28, label: "Crediti lezioni" },
  { studentId: "s024", date: "2026-08-04", amount: 42, label: "Primo acquisto" },
  // Secondi acquisti per pool liquidabile (Aug 3-4)
  { studentId: "s006", date: "2026-08-03", amount: 55, label: "Crediti lezioni" },
  { studentId: "s008", date: "2026-08-03", amount: 62, label: "Crediti lezioni" },
  { studentId: "s009", date: "2026-08-03", amount: 80, label: "Pacchetto lezioni" },
  { studentId: "s011", date: "2026-08-03", amount: 70, label: "Crediti lezioni" },
  { studentId: "s013", date: "2026-08-03", amount: 56, label: "Crediti lezioni" },
  { studentId: "s015", date: "2026-08-03", amount: 64, label: "Crediti lezioni" },
  { studentId: "s017", date: "2026-08-03", amount: 52, label: "Crediti lezioni" },
  { studentId: "s021", date: "2026-08-04", amount: 72, label: "Crediti lezioni" },
  { studentId: "s024", date: "2026-08-03", amount: 58, label: "Crediti lezioni" },
];

export const DEMO_PURCHASES: PurchaseRecord[] = RAW_PURCHASES.map((p, i) => ({
  ...p,
  id: `p${String(i + 1).padStart(3, "0")}`,
}));

const LAST_COMPLETED_PAYOUT = "2026-08-16";

const PAYOUT_BY_DATE: Record<string, string> = {
  "2026-05-01": "pay_006",
  "2026-05-16": "pay_007",
  "2026-06-01": "pay_008",
  "2026-06-16": "pay_009",
  "2026-07-01": "pay_005",
  "2026-07-16": "pay_003",
  "2026-08-01": "pay_001",
  "2026-08-16": "pay_002",
};

function buildMovementsFromPurchases(
  purchases: PurchaseRecord[],
  idPrefix: string
): CommissionMovement[] {
  const byStudent = new Map<string, PurchaseRecord[]>();
  for (const p of purchases) {
    const list = byStudent.get(p.studentId) ?? [];
    list.push(p);
    byStudent.set(p.studentId, list);
  }

  const movements: CommissionMovement[] = [];
  let idx = 1;

  for (const studentPurchases of byStudent.values()) {
    studentPurchases.sort((a, b) => a.date.localeCompare(b.date));
    let runningSpend = 0;

    for (const purchase of studentPurchases) {
      const commission = incrementalCommission(runningSpend, purchase.amount);
      runningSpend += purchase.amount;
      if (commission <= 0) continue;

      const liquidableFrom = addDays(purchase.date, 15);
      const firstEligiblePayoutDate = getFirstEligiblePayoutDate(liquidableFrom);

      movements.push({
        id: `${idPrefix}${String(idx++).padStart(3, "0")}`,
        purchaseId: purchase.id,
        studentId: purchase.studentId,
        purchaseDate: purchase.date,
        purchaseAmount: purchase.amount,
        commissionAmount: commission,
        status: "in_maturazione",
        liquidableFrom,
        firstEligiblePayoutDate,
      });
    }
  }

  return movements;
}

function buildHistoricalPaidMovements(): CommissionMovement[] {
  const entries: Array<{ studentId: string; date: string; amount: number; payoutDate: string }> =
    [
      { studentId: "hist_01", date: "2025-09-10", amount: 80, payoutDate: "2025-10-01" },
      { studentId: "hist_02", date: "2025-09-22", amount: 60, payoutDate: "2025-10-16" },
      { studentId: "hist_03", date: "2025-10-05", amount: 100, payoutDate: "2025-10-16" },
      { studentId: "hist_04", date: "2025-10-18", amount: 45, payoutDate: "2025-11-01" },
      { studentId: "hist_05", date: "2025-11-02", amount: 70, payoutDate: "2025-11-16" },
      { studentId: "hist_06", date: "2025-11-20", amount: 55, payoutDate: "2025-12-01" },
      { studentId: "hist_07", date: "2025-12-03", amount: 90, payoutDate: "2025-12-16" },
      { studentId: "hist_08", date: "2025-12-15", amount: 40, payoutDate: "2026-01-01" },
      { studentId: "hist_09", date: "2026-01-08", amount: 65, payoutDate: "2026-01-16" },
      { studentId: "hist_10", date: "2026-01-20", amount: 50, payoutDate: "2026-02-01" },
      { studentId: "hist_11", date: "2026-02-02", amount: 100, payoutDate: "2026-02-16" },
      { studentId: "hist_12", date: "2026-02-14", amount: 35, payoutDate: "2026-03-01" },
      { studentId: "hist_13", date: "2026-02-28", amount: 48, payoutDate: "2026-03-16" },
      { studentId: "hist_14", date: "2026-03-10", amount: 72, payoutDate: "2026-03-16" },
      { studentId: "hist_15", date: "2026-03-22", amount: 58, payoutDate: "2026-04-01" },
      { studentId: "hist_16", date: "2026-04-04", amount: 44, payoutDate: "2026-04-16" },
      { studentId: "hist_17", date: "2026-04-18", amount: 86, payoutDate: "2026-05-01" },
      { studentId: "hist_18", date: "2026-05-02", amount: 52, payoutDate: "2026-05-16" },
      { studentId: "hist_19", date: "2026-05-14", amount: 38, payoutDate: "2026-05-16" },
      { studentId: "hist_20", date: "2026-05-28", amount: 64, payoutDate: "2026-06-01" },
      { studentId: "hist_21", date: "2026-06-05", amount: 42, payoutDate: "2026-06-16" },
      { studentId: "hist_22", date: "2026-06-12", amount: 56, payoutDate: "2026-06-16" },
      { studentId: "hist_23", date: "2026-06-20", amount: 74, payoutDate: "2026-07-01" },
      { studentId: "hist_24", date: "2026-06-28", amount: 48, payoutDate: "2026-07-01" },
      { studentId: "hist_25", date: "2026-07-02", amount: 66, payoutDate: "2026-07-16" },
      { studentId: "hist_26", date: "2026-07-08", amount: 54, payoutDate: "2026-07-16" },
      { studentId: "hist_27", date: "2026-07-10", amount: 92, payoutDate: "2026-07-16" },
      { studentId: "hist_28", date: "2026-07-12", amount: 46, payoutDate: "2026-08-01" },
      { studentId: "hist_29", date: "2026-07-15", amount: 68, payoutDate: "2026-08-01" },
      { studentId: "hist_30", date: "2026-07-18", amount: 58, payoutDate: "2026-08-01" },
      { studentId: "hist_31", date: "2026-07-20", amount: 40, payoutDate: "2026-08-01" },
      { studentId: "hist_32", date: "2026-07-22", amount: 76, payoutDate: "2026-08-01" },
      { studentId: "hist_33", date: "2026-07-24", amount: 62, payoutDate: "2026-08-16" },
      { studentId: "hist_34", date: "2026-07-26", amount: 50, payoutDate: "2026-08-16" },
      { studentId: "hist_35", date: "2026-07-28", amount: 84, payoutDate: "2026-08-16" },
      { studentId: "hist_36", date: "2026-07-30", amount: 36, payoutDate: "2026-08-16" },
      { studentId: "hist_37", date: "2026-07-31", amount: 44, payoutDate: "2026-08-16" },
      { studentId: "hist_38", date: "2026-05-10", amount: 100, payoutDate: "2026-06-01" },
      { studentId: "hist_39", date: "2026-04-20", amount: 100, payoutDate: "2026-05-16" },
      { studentId: "hist_40", date: "2026-04-05", amount: 100, payoutDate: "2026-05-01" },
      { studentId: "hist_41", date: "2026-03-18", amount: 100, payoutDate: "2026-04-01" },
      { studentId: "hist_42", date: "2026-03-02", amount: 100, payoutDate: "2026-03-16" },
      { studentId: "hist_43", date: "2026-02-10", amount: 100, payoutDate: "2026-03-01" },
      { studentId: "hist_44", date: "2026-01-22", amount: 100, payoutDate: "2026-02-01" },
      { studentId: "hist_45", date: "2026-01-05", amount: 100, payoutDate: "2026-01-16" },
    ];

  return entries.map((entry, i) => {
    const commission = incrementalCommission(0, entry.amount);
    const liquidableFrom = addDays(entry.date, 15);
    const firstEligiblePayoutDate = getFirstEligiblePayoutDate(liquidableFrom);
    const payoutId = PAYOUT_BY_DATE[entry.payoutDate] ?? "pay_003";

    return {
      id: `cmh${String(i + 1).padStart(3, "0")}`,
      purchaseId: `hist_p${i + 1}`,
      studentId: entry.studentId,
      purchaseDate: entry.date,
      purchaseAmount: entry.amount,
      commissionAmount: commission,
      status: "pagata" as const,
      liquidableFrom,
      firstEligiblePayoutDate,
      payoutId,
    };
  });
}

function assignMovementStatuses(movements: CommissionMovement[]): CommissionMovement[] {
  const refMs = new Date(`${DEMO_REFERENCE_DATE}T12:00:00`).getTime();
  const lastPayoutMs = new Date(`${LAST_COMPLETED_PAYOUT}T12:00:00`).getTime();

  return movements.map((m) => {
    if (m.status === "pagata") return m;

    const liquidableMs = new Date(`${m.liquidableFrom}T12:00:00`).getTime();
    if (liquidableMs > refMs) {
      return { ...m, status: "in_maturazione" as const };
    }

    const firstPayoutMs = new Date(`${m.firstEligiblePayoutDate}T12:00:00`).getTime();
    if (firstPayoutMs <= lastPayoutMs) {
      const payoutId = PAYOUT_BY_DATE[m.firstEligiblePayoutDate] ?? "pay_002";
      return { ...m, status: "pagata" as const, payoutId };
    }

    return { ...m, status: "liquidabile" as const };
  });
}

function calibrateDemoPresentationStatuses(
  movements: CommissionMovement[]
): CommissionMovement[] {
  const historical = movements.filter((m) => m.id.startsWith("cmh"));
  const current = movements
    .filter((m) => !m.id.startsWith("cmh"))
    .map((m) => ({ ...m }));

  const unpaid = current.filter((m) => m.status !== "pagata");
  unpaid.sort((a, b) => b.purchaseDate.localeCompare(a.purchaseDate));

  let maturingTotal = 0;
  const maturingTarget = 132;
  for (const movement of unpaid) {
    if (maturingTotal < maturingTarget) {
      movement.status = "in_maturazione";
      maturingTotal += movement.commissionAmount;
    } else {
      movement.status = "liquidabile";
    }
  }

  const paidCurrent = current.filter((m) => m.status === "pagata");
  return [...historical, ...paidCurrent, ...unpaid].sort((a, b) =>
    b.purchaseDate.localeCompare(a.purchaseDate)
  );
}

function buildAllMovements(): CommissionMovement[] {
  const current = buildMovementsFromPurchases(DEMO_PURCHASES, "cm");
  const historical = buildHistoricalPaidMovements();
  return calibrateDemoPresentationStatuses(
    assignMovementStatuses([...current, ...historical])
  ).sort((a, b) => b.purchaseDate.localeCompare(a.purchaseDate));
}

export const DEMO_COMMISSION_MOVEMENTS = buildAllMovements();

function sumPaidForPayout(payoutId: string): number {
  return DEMO_COMMISSION_MOVEMENTS.filter(
    (m) => m.status === "pagata" && m.payoutId === payoutId
  ).reduce((s, m) => s + m.commissionAmount, 0);
}

function countPaidForPayout(payoutId: string): number {
  return DEMO_COMMISSION_MOVEMENTS.filter(
    (m) => m.status === "pagata" && m.payoutId === payoutId
  ).length;
}

export const DEMO_PAYOUTS: PayoutRecord[] = [
  {
    id: "pay_006",
    payoutDate: "2026-05-01",
    amount: Math.round(sumPaidForPayout("pay_006") * 100) / 100,
    commissionCount: countPaidForPayout("pay_006"),
    status: "pagata",
    commissionIds: [],
  },
  {
    id: "pay_007",
    payoutDate: "2026-05-16",
    amount: Math.round(sumPaidForPayout("pay_007") * 100) / 100,
    commissionCount: countPaidForPayout("pay_007"),
    status: "pagata",
    commissionIds: [],
  },
  {
    id: "pay_008",
    payoutDate: "2026-06-01",
    amount: Math.round(sumPaidForPayout("pay_008") * 100) / 100,
    commissionCount: countPaidForPayout("pay_008"),
    status: "pagata",
    commissionIds: [],
  },
  {
    id: "pay_009",
    payoutDate: "2026-06-16",
    amount: Math.round(sumPaidForPayout("pay_009") * 100) / 100,
    commissionCount: countPaidForPayout("pay_009"),
    status: "pagata",
    commissionIds: [],
  },
  {
    id: "pay_005",
    payoutDate: "2026-07-01",
    amount: Math.round(sumPaidForPayout("pay_005") * 100) / 100,
    commissionCount: countPaidForPayout("pay_005"),
    status: "pagata",
    commissionIds: [],
  },
  {
    id: "pay_003",
    payoutDate: "2026-07-16",
    amount: Math.round(sumPaidForPayout("pay_003") * 100) / 100,
    commissionCount: countPaidForPayout("pay_003"),
    status: "pagata",
    commissionIds: [],
  },
  {
    id: "pay_001",
    payoutDate: "2026-08-01",
    amount: Math.round(sumPaidForPayout("pay_001") * 100) / 100,
    commissionCount: countPaidForPayout("pay_001"),
    status: "pagata",
    commissionIds: [],
  },
  {
    id: "pay_002",
    payoutDate: "2026-08-16",
    amount: Math.round(sumPaidForPayout("pay_002") * 100) / 100,
    commissionCount: countPaidForPayout("pay_002"),
    status: "pagata",
    commissionIds: [],
  },
];

export function getStudentById(id: string): AcquiredStudent | undefined {
  return DEMO_STUDENTS.find((s) => s.id === id);
}

export function getStudentLabel(studentId: string): string {
  return (
    DEMO_STUDENTS.find((s) => s.id === studentId)?.label ??
    HISTORICAL_STUDENT_LABELS[studentId] ??
    "Studente"
  );
}

export function getPurchasesForStudent(studentId: string): PurchaseRecord[] {
  return DEMO_PURCHASES.filter((p) => p.studentId === studentId).sort((a, b) =>
    a.date.localeCompare(b.date)
  );
}

export function getMovementsForStudent(studentId: string): CommissionMovement[] {
  return DEMO_COMMISSION_MOVEMENTS.filter((m) => m.studentId === studentId).sort(
    (a, b) => b.purchaseDate.localeCompare(a.purchaseDate)
  );
}

export function getPurchaseById(id: string): PurchaseRecord | undefined {
  return DEMO_PURCHASES.find((p) => p.id === id);
}
