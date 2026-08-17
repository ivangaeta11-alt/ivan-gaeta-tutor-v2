import type { TutorCalendarSlot } from "../types";
import { MOCK_CALENDAR_AVAILABILITY } from "./tutorDashboardMock";

/** Disponibilità calendario demo — condivise tra Calendario e Profilo tutor. */
export const tutorAvailabilitySession = {
  slots: [...MOCK_CALENDAR_AVAILABILITY] as TutorCalendarSlot[],
};
