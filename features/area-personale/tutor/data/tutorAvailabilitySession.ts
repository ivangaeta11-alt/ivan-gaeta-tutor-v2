import type {
  AvailabilitySlot,
  TutorCalendarSlot,
  UnavailabilityPeriod,
} from "../types";
import {
  MOCK_AVAILABILITY,
  MOCK_CALENDAR_AVAILABILITY,
  MOCK_UNAVAILABILITY,
} from "./tutorDashboardMock";

/** Disponibilità demo — condivise tra Calendario e Profilo tutor. */
export const tutorAvailabilitySession = {
  slots: [...MOCK_CALENDAR_AVAILABILITY] as TutorCalendarSlot[],
  recurring: [...MOCK_AVAILABILITY] as AvailabilitySlot[],
  unavailability: [...MOCK_UNAVAILABILITY] as UnavailabilityPeriod[],
};

const IT_DAYS = [
  "Domenica",
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
] as const;

export const WEEKDAY_OPTIONS = IT_DAYS.slice(1).concat(IT_DAYS[0]);

export function getItalianDayName(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00`);
  return IT_DAYS[d.getDay()];
}

export function findUnavailabilityForDate(
  isoDate: string,
  periods: UnavailabilityPeriod[]
): UnavailabilityPeriod | undefined {
  return periods.find((p) => isoDate >= p.start && isoDate <= p.end);
}

export function getRecurringForDate(
  isoDate: string,
  recurring: AvailabilitySlot[]
): AvailabilitySlot[] {
  const dayName = getItalianDayName(isoDate);
  return recurring.filter((r) => r.day === dayName);
}
