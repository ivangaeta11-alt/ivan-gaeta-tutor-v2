import React, { useMemo } from "react";
import type { AvailableLessonSlot } from "../types";
import { formatDateShort } from "../utils/format";

interface AvailableSlotsPickerProps {
  slots: AvailableLessonSlot[];
  selectedSlotId: string | null;
  onSelectSlot: (slot: AvailableLessonSlot) => void;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

const AvailableSlotsPicker: React.FC<AvailableSlotsPickerProps> = ({
  slots,
  selectedSlotId,
  onSelectSlot,
  selectedDate,
  onSelectDate,
}) => {
  const dates = useMemo(
    () => [...new Set(slots.map((s) => s.date))].sort(),
    [slots]
  );

  const slotsForDate = useMemo(
    () => (selectedDate ? slots.filter((s) => s.date === selectedDate) : []),
    [slots, selectedDate]
  );

  return (
    <div className="space-y-4 min-w-0">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Seleziona un giorno
        </p>
        <div className="flex flex-wrap gap-2">
          {dates.map((date) => (
            <button
              key={date}
              type="button"
              onClick={() => onSelectDate(date)}
              className={`px-3 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                selectedDate === date
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "border-slate-200 text-slate-700 hover:border-blue-200"
              }`}
            >
              {formatDateShort(date)}
            </button>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Seleziona uno slot
          </p>
          <div className="space-y-2">
            {slotsForDate.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => onSelectSlot(slot)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                  selectedSlotId === slot.id
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "border-slate-200 text-slate-700 hover:border-blue-200"
                }`}
              >
                <span className="font-semibold">
                  {slot.startTime}–{slot.endTime}
                </span>
                {slot.within24Hours && (
                  <span className="block text-xs text-amber-700 mt-1">
                    Inizia tra meno di 24 ore
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableSlotsPicker;
