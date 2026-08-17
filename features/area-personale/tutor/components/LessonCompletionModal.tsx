import React, { useState } from "react";
import type { TutorLesson } from "../types";

interface LessonCompletionModalProps {
  open: boolean;
  lesson: TutorLesson;
  onClose: () => void;
  onComplete: () => void;
}

const LessonCompletionModal: React.FC<LessonCompletionModalProps> = ({
  open,
  lesson,
  onClose,
  onComplete,
}) => {
  const [held, setHeld] = useState(true);
  const [notes, setNotes] = useState("");
  const [topics, setTopics] = useState(lesson.topics?.join(", ") ?? "");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/40">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 bg-white rounded-3xl border border-slate-100 shadow-xl">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Completa lezione</h2>
        <p className="text-sm text-slate-500 font-light mb-5">{lesson.label}</p>

        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={held} onChange={(e) => setHeld(e.target.checked)} className="w-4 h-4" />
            Lezione svolta
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-slate-600">Orario effettivo</span>
            <input
              type="text"
              defaultValue={`${lesson.startTime}–${lesson.endTime}`}
              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-slate-600">Argomenti trattati</span>
            <input
              type="text"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-slate-600">Note</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
            />
          </label>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-500">
            Registrazione e materiali assegnati: disponibili in demo dalla sezione Materiali.
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600">
            Annulla
          </button>
          <button
            type="button"
            onClick={() => { onComplete(); onClose(); }}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            Segna come svolta (demo)
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonCompletionModal;
