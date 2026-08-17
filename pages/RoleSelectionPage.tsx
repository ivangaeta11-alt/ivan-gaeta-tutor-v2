import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/AuthProvider";
import {
  getDashboardRoles,
  ROLE_LABELS,
  roleToSegment,
  type UserRole,
} from "../types/roles";

const ROLE_DESCRIPTIONS: Partial<Record<UserRole, string>> = {
  student: "Lezioni, materiali, calendario e crediti.",
  tutor: "Calendario, gruppi, materiali e compensi.",
  promoter: "Statistiche, liquidazioni e materiale promozionale.",
};

const RoleSelectionPage: React.FC = () => {
  const { profile, user, roles, signOut } = useAuth();
  const dashboardRoles = getDashboardRoles(roles);
  const displayName =
    profile?.full_name?.trim() || user?.email?.split("@")[0] || "Utente";

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 bg-gradient-to-b from-slate-50/80 to-white min-h-[70vh]">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
            Scegli l&apos;area
          </h1>
          <p className="text-slate-500 font-light">
            Ciao {displayName}, il tuo account ha accesso a più aree. Seleziona
            dove entrare.
          </p>
        </div>

        <div className="space-y-3">
          {dashboardRoles.map((role) => {
            const segment = roleToSegment(role);
            if (!segment) return null;
            return (
              <Link
                key={role}
                to={`/area-personale/${segment}`}
                onClick={() => window.scrollTo({ top: 0 })}
                className="block p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all"
              >
                <p className="font-bold text-slate-900">{ROLE_LABELS[role]}</p>
                <p className="text-sm text-slate-500 font-light mt-1">
                  {ROLE_DESCRIPTIONS[role]}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <button
            type="button"
            onClick={() => void signOut()}
            className="font-semibold text-slate-500 hover:text-blue-600 transition-colors"
          >
            Esci
          </button>
          <Link to="/" className="text-slate-400 hover:text-blue-600 transition-colors">
            Torna alla home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoleSelectionPage;
