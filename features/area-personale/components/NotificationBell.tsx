import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { formatDateShort } from "../studente/utils/format";

export interface NotificationItem {
  id: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationBellProps {
  notifications: NotificationItem[];
}

const PANEL_MAX_WIDTH = 288; // w-72
const VIEWPORT_MARGIN = 12;

interface PanelPosition {
  top: number;
  left: number;
  width: number;
}

function computePanelPosition(buttonEl: HTMLElement): PanelPosition {
  const rect = buttonEl.getBoundingClientRect();
  const width = Math.min(PANEL_MAX_WIDTH, window.innerWidth - VIEWPORT_MARGIN * 2);
  let left = rect.right - width;
  left = Math.max(
    VIEWPORT_MARGIN,
    Math.min(left, window.innerWidth - width - VIEWPORT_MARGIN)
  );
  return {
    top: rect.bottom + 8,
    left,
    width,
  };
}

const NotificationBell: React.FC<NotificationBellProps> = ({ notifications }) => {
  const [open, setOpen] = useState(false);
  const [panelStyle, setPanelStyle] = useState<PanelPosition | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const unread = notifications.filter((n) => !n.read).length;

  const updatePanelPosition = useCallback(() => {
    if (buttonRef.current) {
      setPanelStyle(computePanelPosition(buttonRef.current));
    }
  }, []);

  useLayoutEffect(() => {
    if (open) {
      updatePanelPosition();
    } else {
      setPanelStyle(null);
    }
  }, [open, updatePanelPosition]);

  useEffect(() => {
    if (!open) return;

    const handleResize = () => updatePanelPosition();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize, true);
    };
  }, [open, updatePanelPosition]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative shrink-0" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors"
        aria-label={`Notifiche${unread > 0 ? `, ${unread} non lette` : ""}`}
        aria-expanded={open}
      >
        <Bell className="w-5 h-5 text-slate-600" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {open && panelStyle && (
        <div
          className="fixed bg-white rounded-2xl border border-slate-100 shadow-lg z-[100] overflow-hidden"
          style={{
            top: panelStyle.top,
            left: panelStyle.left,
            width: panelStyle.width,
          }}
          role="dialog"
          aria-label="Notifiche"
        >
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-sm font-bold text-slate-900">Notifiche</p>
          </div>
          <ul className="max-h-64 overflow-y-auto overscroll-y-contain">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`px-4 py-3 border-b border-slate-50 last:border-0 text-sm ${
                  n.read ? "text-slate-500" : "text-slate-800 bg-blue-50/30"
                }`}
              >
                <p className="font-light leading-relaxed break-words">{n.message}</p>
                <p className="text-xs text-slate-400 mt-1">{formatDateShort(n.date)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
