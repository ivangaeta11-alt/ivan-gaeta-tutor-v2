import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import TutorLessonStatusBadge from "../../../features/area-personale/tutor/components/TutorLessonStatusBadge";
import AddAvailabilityDialog from "../../../features/area-personale/tutor/components/AddAvailabilityDialog";
import InfoNotice from "../../../features/area-personale/studente/components/InfoNotice";
import { MOCK_LESSONS } from "../../../features/area-personale/tutor/data";
import { tutorAvailabilitySession } from "../../../features/area-personale/tutor/data/tutorAvailabilitySession";
import { LESSON_TYPE_LABELS } from "../../../features/area-personale/tutor/types";
import type { TutorCalendarSlot } from "../../../features/area-personale/tutor/types";
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
  const [addOpen, setAddOpen] = useState(false);
  const [addDefaultDate, setAddDefaultDate] = useState<string | undefined>();
  const [savedNotice, setSavedNotice] = useState(false);

  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);
  const sortedLessons = useMemo(
    () => [...MOCK_LESSONS].sort((a, b) => a.date.localeCompare(b.date)),
    []
  );

  const syncSlots = (next: TutorCalendarSlot[]) => {
    tutorAvailabilitySession.slots = next;
    setSlots(next);
    setSavedNotice(true);
  };

  const addSlot = (input: { date: string; startTime: string; endTime: string }) => {
    syncSlots([
      ...slots,
      { id: `av_${Date.now()}`, date: input.date, startTime: input.startTime, endTime: input.endTime },
    ]);
    setAddOpen(false);
  };

  const removeSlot = (id: string) => {
    syncSlots(slots.filter((s) => s.id !== id));
  };

  const weekSlots = slots.filter((s) => weekDates.includes(s.date));

  return (
    <div className="min-w-0 max-w-full">
      <PageHeader
        title="Calendario"
        description="Lezioni programmate e gestione delle disponibilità per le prenotazioni."
      />

      <section className="mb-10 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-bold text-slate-900">Disponibilità</h2>
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
                setAddOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4" /> Aggiungi disponibilità
            </button>
          </div>
        </div>

        {savedNotice && (
          <div className="mb-4">
            <InfoNotice>
              Disponibilità aggiornata (demo locale). Gli studenti vedranno i nuovi slot in
              prenotazione.
            </InfoNotice>
          </div>
        )}

        <div className="p-4 bg-white rounded-2xl border border-slate-100 max-w-full overflow-x-auto overscroll-x-contain">
          <div className="grid grid-cols-7 gap-2 min-w-[560px]">
            {WEEK_DAYS.map((d) => (
              <div key={d} className="text-center text-xs font-bold text-slate-400 py-2">
                {d}
              </div>
            ))}
            {weekDates.map((date) => {
              const dayLessons = sortedLessons.filter((l) => l.date === date);
              const daySlots = slots.filter((s) => s.date === date);
              return (
                <div
                  key={date}
                  className="min-h-[100px] p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setAddDefaultDate(date);
                      setAddOpen(true);
                    }}
                    className="text-xs text-slate-500 mb-1 text-left hover:text-blue-600 font-medium"
                  >
                    {formatDateShort(date).slice(0, 5)}
                  </button>
                  {daySlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="text-[10px] leading-tight p-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-100"
                    >
                      {slot.startTime}–{slot.endTime}
                      <span className="block text-emerald-600/80">Disponibile</span>
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

        <div className="mt-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Slot della settimana ({weekSlots.length})
          </p>
          {weekSlots.length === 0 ? (
            <p className="text-sm text-slate-400 font-light">
              Nessuna disponibilità in questa settimana. Clicca su un giorno o usa il pulsante
              per aggiungerne una.
            </p>
          ) : (
            weekSlots
              .sort((a, b) =>
                a.date === b.date
                  ? a.startTime.localeCompare(b.startTime)
                  : a.date.localeCompare(b.date)
              )
              .map((slot) => (
                <div
                  key={slot.id}
                  className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white rounded-xl border border-slate-100 text-sm"
                >
                  <span className="text-slate-700">
                    {formatDateShort(slot.date)} · {formatTimeRange(slot.startTime, slot.endTime)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSlot(slot.id)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-lg border border-red-100 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3" /> Rimuovi
                  </button>
                </div>
              ))
          )}
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
        open={addOpen}
        defaultDate={addDefaultDate}
        onConfirm={addSlot}
        onCancel={() => setAddOpen(false)}
      />
    </div>
  );
};

export default TutorCalendario;
