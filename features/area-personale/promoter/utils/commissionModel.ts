export const COMMISSION_RATE = 0.5;
export const MAX_VALID_SPEND = 100;
export const MAX_COMMISSION_PER_STUDENT = 50;
export const MATURATION_DAYS = 15;

/** Spesa valida cumulativa (cap ai primi 100 €). */
export function cappedValidSpend(totalSpend: number): number {
  return Math.min(Math.max(totalSpend, 0), MAX_VALID_SPEND);
}

/** Commissione cumulativa: min(spesa valida * 0.5, 50). */
export function cumulativeCommission(validSpend: number): number {
  return Math.round(cappedValidSpend(validSpend) * COMMISSION_RATE * 100) / 100;
}

export function remainingPotential(validSpend: number): number {
  return Math.round((MAX_COMMISSION_PER_STUDENT - cumulativeCommission(validSpend)) * 100) / 100;
}

export function isCommissionComplete(validSpend: number): boolean {
  return cappedValidSpend(validSpend) >= MAX_VALID_SPEND;
}

export function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T12:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Prossima data di liquidazione (1 o 16) strictly after reference, or on same day if eligible. */
export function getNextPayoutDate(fromIso: string): string {
  const from = new Date(`${fromIso}T12:00:00`);
  const year = from.getFullYear();
  const month = from.getMonth();
  const day = from.getDate();

  const candidates: Date[] = [];
  for (const payoutDay of [1, 16]) {
    let d = new Date(year, month, payoutDay);
    if (d < from) {
      d = new Date(year, month + 1, payoutDay);
    }
    candidates.push(d);
  }

  candidates.sort((a, b) => a.getTime() - b.getTime());
  return candidates[0].toISOString().slice(0, 10);
}

/** Prima liquidazione utile on or after liquidableFrom (giorno 1 o 16). */
export function getFirstEligiblePayoutDate(liquidableFromIso: string): string {
  const d = new Date(`${liquidableFromIso}T12:00:00`);
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();

  if (day <= 1) return `${year}-${String(month + 1).padStart(2, "0")}-01`;
  if (day <= 16) return `${year}-${String(month + 1).padStart(2, "0")}-16`;
  const nextMonth = month + 1;
  const nextYear = nextMonth > 11 ? year + 1 : year;
  const normalizedMonth = (nextMonth % 12) + 1;
  return `${nextYear}-${String(normalizedMonth).padStart(2, "0")}-01`;
}

/**
 * Calcola la commissione incrementale di un acquisto rispetto alla spesa cumulativa precedente.
 */
export function incrementalCommission(
  previousValidSpend: number,
  purchaseAmount: number
): number {
  const before = cumulativeCommission(previousValidSpend);
  const after = cumulativeCommission(previousValidSpend + purchaseAmount);
  return Math.round((after - before) * 100) / 100;
}
