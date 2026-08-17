import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import TutorLessonStatusBadge from "../../../features/area-personale/tutor/components/TutorLessonStatusBadge";
import AddAvailabilityDialog from "../../../features/area-personale/tutor/components/AddAvailabilityDialog";
import AddRecurringAvailabilityDialog from "../../../features/area-personale/tutor/components/AddRecurringAvailabilityDialog";
import AddUnavailabilityDialog from "../../../features/area-personale/tutor/components/AddUnavailabilityDialog";
import InfoNotice from "../../../features/area-personale/studente/components/InfoNotice";
import { MOCK_LESSONS } from "../../../features/area-personale/tutor/data";
import {
  findUnavailabilityForDate,
  getRecurringForDate,
  tutorAvailabilitySession,
} from "../../../features/area-personale/tutor/data/tutorAvailabilitySession";
import { LESSON_TYPE_LABELS } from "../../../features/area-personale/tutor/types";
import type {
  AvailabilitySlot,
  TutorCalendarSlot,
  UnavailabilityPeriod,
} from "../../../features/area-personale/tutor/types";
import { formatDate, formatDateShort, formatTimeRange } from "../../../features/area-personale/studente/utils/format";

const WEEK_DAYS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
const WEEK_START = new Date("2026-08-18T12:00:00");

function getWeekDates(weekOffset: number): string[] {
  const start = new Date(WEEK_START);
  start.setDate(start.getDate() + weekOffset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

const TutorCalendario: React.FC = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [slots, setSlots] = useState<TutorCalendarSlot[]>(
    () => tutorAvailabilitySession.slots
  );
  const [recurring, setRecurring] = useState<AvailabilitySlot[]>(
    () => tutorAvailabilitySession.recurring
  );
  const [unavailability, setUnavailability] = useState<UnavailabilityPeriod[]>(
    () => tutorAvailabilitySession.unavailability
  );
  const [addSlotOpen, setAddSlotOpen] = useState(false);
  const [addRecurringOpen, setAddRecurringOpen] = useState(false);
  const [addUnavailOpen, setAddUnavailOpen] = useState(false);
  const [addDefaultDate, setAddDefaultDate] = useState<string | undefined>();
  const [savedNotice, setSavedNotice] = useState(false);

  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);
  const sortedLessons = useMemo(
    () => [...MOCK_LESSONS].sort((a, b) => a.date.localeCompare(b.date)),
    []
  );

  const notifySaved = () => setSavedNotice(true);

  const syncSlots = (next: TutorCalendarSlot[]) => {
    tutorAvailabilitySession.slots = next;
    setSlots(next);
    notifySaved();
  };

  const syncRecurring = (next: AvailabilitySlot[]) => {
    tutorAvailabilitySession.recurring = next;
    setRecurring(next);
    notifySaved();
  };

  const syncUnavailability = (next: UnavailabilityPeriod[]) => {
    tutorAvailabilitySession.unavailability = next;
    setUnavailability(next);
    notifySaved();
  };

  const addSlot = (input: { date: string; startTime: string; endTime: string }) => {
    if (findUnavailabilityForDate(input.date, unavailability)) return;
    syncSlots([
      ...slots,
      {
        id: `av_${Date.now()}`,
        date: input.date,
        startTime: input.startTime,
        endTime: input.endTime,
      },
    ]);
    setAddSlotOpen(false);
  };

  const addRecurring = (input: { day: string; start: string; end: string }) => {
    syncRecurring([
      ...recurring,
      { id: `rec_${Date.now()}`, day: input.day, start: input.start, end: input.end },
    ]);
    setAddRecurringOpen(false);
  };

  const addUnavailability = (input: { start: string; end: string; reason: string }) => {
    syncUnavailability([
      ...unavailability,
      { id: `unav_${Date.now()}`, ...input },
    ]);
    setAddUnavailOpen(false);
  };

  const weekSlots = slots.filter((s) => weekDates.includes(s.date));

  return (
    <div className="min-w-0 max-w-full">
      <PageHeader
        title="Calendario"
        description="Lezioni programmate, disponibilità ricorrenti, slot puntuali e periodi di assenza."
      />

      <section className="mb-10 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-bold text-slate-900">Vista settimanale</h2>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setWeekOffset((w) => w - 1)}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:border-blue-200"
              aria-label="Settimana precedente"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setWeekOffset(0)}
              className="px-3 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-700 hover:border-blue-200"
            >
              Oggi (demo)
            </button>
            <button
              type="button"
              onClick={() => setWeekOffset((w) => w + 1)}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:border-blue-200"
              aria-label="Settimana successiva"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setAddDefaultDate(weekDates[0]);
                setAddSlotOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4" /> Slot puntual
            </button>
          </div>
        </div>

        {savedNotice && (
          <div className="mb-4">
            <InfoNotice>
              Disponibilità aggiornata (demo locale). Le modifiche non spostano le lezioni già
              programmate.
            </InfoNotice>
          </div>
        )}

        <div className="p-4 bg-white rounded-2xl border border-slate-100 max-w-full overflow-x-auto overscroll-x-contain mb-6">
          <div className="grid grid-cols-7 gap-2 min-w-[560px]">
            {WEEK_DAYS.map((d) => (
              <div key={d} className="text-center text-xs font-bold text-slate-400 py-2">
                {d}
              </div>
            ))}
            {weekDates.map((date) => {
              const blocked = findUnavailabilityForDate(date, unavailability);
              const dayLessons = sortedLessons.filter((l) => l.date === date);
              const daySlots = slots.filter((s) => s.date === date);
              const dayRecurring = getRecurringForDate(date, recurring);

              return (
                <div
                  key={date}
                  className={`min-h-[110px] p-2 rounded-xl border flex flex-col gap-1 ${
                    blocked
                      ? "bg-red-50/80 border-red-100"
                      : "bg-slate-50 border-slate-100"
                  }`}
                >
                  {blocked ? (
                    <p className="text-xs text-red-700 font-medium mb-1" title={blocked.reason}>
                      {formatDateShort(date).slice(0, 5)} · Bloccato
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setAddDefaultDate(date);
                        setAddSlotOpen(true);
                      }}
                      className="text-xs text-slate-500 mb-1 text-left hover:text-blue-600 font-medium"
                    >
                      {formatDateShort(date).slice(0, 5)}
                    </button>
                  )}
                  {blocked && (
                    <p className="text-[10px] leading-tight text-red-600/90 break-words">
                      {blocked.reason}
                    </p>
                  )}
                  {!blocked &&
                    dayRecurring.map((r) => (
                      <div
                        key={r.id}
                        className="text-[10px] leading-tight p-1 rounded bg-teal-50 text-teal-800 border border-teal-100"
                      >
                        {r.start}–{r.end}
                        <span className="block text-teal-600/80">Ricorrente</span>
                      </div>
                    ))}
                  {!blocked &&
                    daySlots.map((slot) => (
                      <div
                        key={slot.id}
                        className="text-[10px] leading-tight p-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-100"
                      >
                        {slot.startTime}–{slot.endTime}
                        <span className="block text-emerald-600/80">Puntual</span>
                      </div>
                    ))}
                  {dayLessons.map((l) => (
                    <Link
                      key={l.id}
                      to={`/area-personale/tutor/lezione/${l.id}`}
                      className="block text-[10px] leading-tight p-1 rounded bg-blue-50 text-blue-800 hover:bg-blue-100"
                    >
                      {l.startTime} {l.label.slice(0, 12)}
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 min-w-0">
          {/* Slot puntuali settimana */}
          <div className="p-4 bg-white rounded-2xl border border-slate-100 min-w-0">
            <p className="text-sm font-bold text-slate-900 mb-3">
              Slot puntuali ({weekSlots.length})
            </p>
            {weekSlots.length === 0 ? (
              <p className="text-sm text-slate-400 font-light">
                Nessuno slot in questa settimana.
              </p>
            ) : (
              <ul className="space-y-2">
                {weekSlots
                  .sort((a, b) =>
                    a.date === b.date
                      ? a.startTime.localeCompare(b.startTime)
                      : a.date.localeCompare(b.date)
                  )
                  .map((slot) => (
                    <li
                      key={slot.id}
                      className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 text-sm"
                    >
                      <span className="text-slate-700 min-w-0 break-words">
                        {formatDateShort(slot.date)} ·{" "}
                        {formatTimeRange(slot.startTime, slot.endTime)}
                      </span>
                      <button
                        type="button"
                        onClick={() => syncSlots(slots.filter((s) => s.id !== slot.id))}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-lg border border-red-100 text-red-600 hover:bg-red-50 shrink-0"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Ricorrenti */}
          <div className="p-4 bg-white rounded-2xl border border-slate-100 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <p className="text-sm font-bold text-slate-900">
                Disponibilità ricorrenti ({recurring.length})
              </p>
              <button
                type="button"
                onClick={() => setAddRecurringOpen(true)}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-lg bg-teal-50 text-teal-700 border border-teal-100 hover:bg-teal-100"
              >
                <Plus className="w-3 h-3" /> Aggiungi
              </button>
            </div>
            {recurring.length === 0 ? (
              <p className="text-sm text-slate-400 font-light">
                Nessuna fascia ricorrente configurata.
              </p>
            ) : (
              <ul className="space-y-2">
                {recurring.map((r) => (
                  <li
                    key={r.id}
                    className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-teal-50/50 text-sm"
                  >
                    <span className="text-slate-700">
                      {r.day} · {r.start}–{r.end}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        syncRecurring(recurring.filter((x) => x.id !== r.id))
                      }
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-lg border border-red-100 text-red-600 hover:bg-red-50 shrink-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Indisponibilità */}
          <div className="p-4 bg-white rounded-2xl border border-slate-100 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <p className="text-sm font-bold text-slate-900">
                Indisponibilità ({unavailability.length})
              </p>
              <button
                type="button"
                onClick={() => setAddUnavailOpen(true)}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-lg bg-red-50 text-red-700 border border-red-100 hover:bg-red-100"
              >
                <Plus className="w-3 h-3" /> Blocca date
              </button>
            </div>
            {unavailability.length === 0 ? (
              <p className="text-sm text-slate-400 font-light">
                Nessun periodo di assenza registrato.
              </p>
            ) : (
              <ul className="space-y-2">
                {unavailability
                  .sort((a, b) => a.start.localeCompare(b.start))
                  .map((p) => (
                    <li
                      key={p.id}
                      className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-red-50/50 text-sm"
                    >
                      <span className="text-slate-700 min-w-0 break-words">
                        {formatDateShort(p.start)} – {formatDateShort(p.end)}
                        <span className="block text-xs text-slate-500">{p.reason}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          syncUnavailability(unavailability.filter((x) => x.id !== p.id))
                        }
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-lg border border-red-100 text-red-600 hover:bg-red-50 shrink-0"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="min-w-0">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Elenco lezioni</h2>
        <div className="space-y-3">
          {sortedLessons.map((lesson) => (
            <div key={lesson.id} className="p-4 md:p-5 bg-white rounded-2xl border border-slate-100">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-bold text-slate-900">
                    {lesson.subject} – {lesson.label}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {formatDate(lesson.date)} · {formatTimeRange(lesson.startTime, lesson.endTime)}{" "}
                    · {LESSON_TYPE_LABELS[lesson.type]}
                  </p>
                </div>
                <TutorLessonStatusBadge status={lesson.status} />
              </div>
              <Link
                to={`/area-personale/tutor/lezione/${lesson.id}`}
                className="inline-flex px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:border-blue-200"
              >
                Dettagli
              </Link>
            </div>
          ))}
        </div>
      </section>

      <AddAvailabilityDialog
        open={addSlotOpen}
        defaultDate={addDefaultDate}
        onConfirm={addSlot}
        onCancel={() => setAddSlotOpen(false)}
      />
      <AddRecurringAvailabilityDialog
        open={addRecurringOpen}
        onConfirm={addRecurring}
        onCancel={() => setAddRecurringOpen(false)}
      />
      <AddUnavailabilityDialog
        open={addUnavailOpen}
        onConfirm={addUnavailability}
        onCancel={() => setAddUnavailOpen(false)}
      />
    </div>
  );
};

export default TutorCalendario;
