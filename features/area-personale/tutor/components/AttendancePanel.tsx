import React, { useState } from "react";
import type { TutorLesson } from "../types";
import { getStudentsByGroup, MOCK_GUEST } from "../data/tutorDashboardMock";

interface AttendancePanelProps {
  open: boolean;
  lesson: TutorLesson;
  onClose: () => void;
}

const AttendancePanel: React.FC<AttendancePanelProps> = ({ open, lesson, onClose }) => {
  const students = lesson.groupId
    ? [...getStudentsByGroup(lesson.groupId), ...(lesson.type === "prova" ? [MOCK_GUEST] : [])]
    : [];

  const [attendance, setAttendance] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(students.map((s) => [s.id, true]))
  );

  if (!open) return null;

  const toggle = (id: string) =>
    setAttendance((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/40">
      <div className="w-full max-w-md max-h-[85vh] overflow-y-auto p-6 bg-white rounded-3xl border border-slate-100 shadow-xl">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Registra presenze</h2>
        <p className="text-sm text-slate-500 font-light mb-5">
          {lesson.label} · segna chi era presente (demo locale)
        </p>
        <ul className="space-y-2 mb-6">
          {students.map((s) => (
            <li key={s.id}>
              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={attendance[s.id] ?? false}
                  onChange={() => toggle(s.id)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600"
                />
                <span className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
                  {s.initials}
                </span>
                <span className="text-sm text-slate-800">
                  {s.displayName}
                  {s.isGuest && (
                    <span className="ml-2 text-xs text-violet-600 font-medium">Guest</span>
                  )}
                </span>
              </label>
            </li>
          ))}
        </ul>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600"
          >
            Annulla
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            Salva (demo)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendancePanel;
