import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import type { UserRole } from "../../types/roles";
import { getDashboardRoles, ROLE_LABELS } from "../../types/roles";
import PromoterSidebar from "./promoter/components/PromoterSidebar";
import StudentSidebar from "./studente/components/StudentSidebar";
import StudentHeaderActions from "./studente/components/StudentHeaderActions";
import TutorSidebar from "./tutor/components/TutorSidebar";
import TutorHeaderActions from "./tutor/components/TutorHeaderActions";
import { MOCK_NOTIFICATIONS } from "./studente/data";
import { MOCK_NOTIFICATIONS as TUTOR_NOTIFICATIONS } from "./tutor/data";
import { useAuth } from "../auth/AuthProvider";

interface AreaPersonaleLayoutProps {
  role: UserRole;
}

const AreaPersonaleLayout: React.FC<AreaPersonaleLayoutProps> = ({ role }) => {
  const { profile, user, roles, signOut } = useAuth();
  const navigate = useNavigate();
  const displayName =
    profile?.full_name?.trim() || user?.email?.split("@")[0] || "Utente";
  const displayEmail = user?.email ?? "";
  const dashboardRoles = getDashboardRoles(roles);

  return (
    <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 sm:px-6 bg-gradient-to-b from-slate-50/80 to-white min-h-[70vh] overflow-x-hidden">
      <div className="max-w-6xl mx-auto w-full min-w-0">
        <div className="flex items-start justify-between gap-4 mb-10 pb-6 border-b border-slate-100 min-w-0">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-blue-600 mb-1">Area personale</p>
            <p className="text-slate-500 font-light text-sm break-words">
              {displayName} · {ROLE_LABELS[role]}
              {displayEmail && (
                <span className="block text-xs text-slate-400 mt-0.5">{displayEmail}</span>
              )}
              <span className="ml-0 mt-1 inline-block text-xs text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-lg">
                dati demo
              </span>
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2 md:flex-row md:items-center md:gap-3">
            {dashboardRoles.length > 1 && (
              <Link
                to="/area-personale/selezione-area"
                className="order-3 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors md:order-1"
              >
                Cambia area
              </Link>
            )}
            <button
              type="button"
              onClick={() =>
                void signOut().then(() => navigate("/login", { replace: true }))
              }
              className="order-1 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors md:order-2"
            >
              Esci
            </button>
            {role === "student" && (
              <div className="order-2 md:order-1">
                <StudentHeaderActions notifications={MOCK_NOTIFICATIONS} />
              </div>
            )}
            {role === "tutor" && (
              <div className="order-2 md:order-1">
                <TutorHeaderActions notifications={TUTOR_NOTIFICATIONS} />
              </div>
            )}
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
