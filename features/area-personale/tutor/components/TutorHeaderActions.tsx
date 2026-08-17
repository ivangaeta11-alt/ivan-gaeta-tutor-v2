import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import type { TutorNotification } from "../types";
import { formatDateShort } from "../../studente/utils/format";

interface TutorHeaderActionsProps {
  notifications: TutorNotification[];
}

const TutorHeaderActions: React.FC<TutorHeaderActionsProps> = ({ notifications }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors"
        aria-label={`Notifiche${unread > 0 ? `, ${unread} non lette` : ""}`}
      >
        <Bell className="w-5 h-5 text-slate-600" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl border border-slate-100 shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-sm font-bold text-slate-900">Notifiche</p>
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`px-4 py-3 border-b border-slate-50 last:border-0 text-sm ${
                  n.read ? "text-slate-500" : "text-slate-800 bg-blue-50/30"
                }`}
              >
                <p className="font-light leading-relaxed">{n.message}</p>
                <p className="text-xs text-slate-400 mt-1">{formatDateShort(n.date)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TutorHeaderActions;
