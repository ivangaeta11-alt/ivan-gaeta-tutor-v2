import React from "react";
import { Link, Outlet } from "react-router-dom";
import type { UserRole } from "../../types/roles";
import { ROLE_LABELS } from "../../types/roles";
import PromoterSidebar from "./promoter/components/PromoterSidebar";
import StudentSidebar from "./studente/components/StudentSidebar";
import StudentHeaderActions from "./studente/components/StudentHeaderActions";
import TutorSidebar from "./tutor/components/TutorSidebar";
import TutorHeaderActions from "./tutor/components/TutorHeaderActions";
import { MOCK_STUDENT, MOCK_NOTIFICATIONS } from "./studente/data";
import { MOCK_TUTOR, MOCK_NOTIFICATIONS as TUTOR_NOTIFICATIONS } from "./tutor/data";

interface AreaPersonaleLayoutProps {
  role: UserRole;
  /** Placeholder display name until real auth exists */
  displayName?: string;
}

/**
 * Shared shell for /area-personale/* dashboards.
 * Ready for future sidebar, logout, and route protection around this layout.
 */
const AreaPersonaleLayout: React.FC<AreaPersonaleLayoutProps> = ({
  role,
  displayName = "Utente demo",
}) => {
  const resolvedName =
    role === "student"
      ? MOCK_STUDENT.displayName
      : role === "tutor"
        ? MOCK_TUTOR.displayName
        : displayName;

  return (
    <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 sm:px-6 bg-gradient-to-b from-slate-50/80 to-white min-h-[70vh] overflow-x-hidden">
      <div className="max-w-6xl mx-auto w-full min-w-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-6 border-b border-slate-100 min-w-0">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-blue-600 mb-1">Area personale</p>
            <p className="text-slate-500 font-light text-sm break-words">
              {resolvedName} · {ROLE_LABELS[role]}
              <span className="ml-2 text-xs text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-lg whitespace-nowrap">
                demo
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {role === "student" && (
              <StudentHeaderActions notifications={MOCK_NOTIFICATIONS} />
            )}
            {role === "tutor" && (
              <TutorHeaderActions notifications={TUTOR_NOTIFICATIONS} />
            )}
            <Link
              to="/login"
              className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
            >
              Esci (demo)
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-6 lg:gap-8 min-w-0">
          {role === "promoter" ? (
            <PromoterSidebar />
          ) : role === "student" ? (
            <StudentSidebar />
          ) : role === "tutor" ? (
            <TutorSidebar />
          ) : (
            <aside className="hidden lg:block">
              <nav className="sticky top-28 space-y-2 p-4 rounded-2xl border border-slate-100 bg-white/80">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Menu
                </p>
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  La navigazione interna sarà disponibile nelle prossime versioni.
                </p>
              </nav>
            </aside>
          )}

          <div className="min-w-0 max-w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaPersonaleLayout;
