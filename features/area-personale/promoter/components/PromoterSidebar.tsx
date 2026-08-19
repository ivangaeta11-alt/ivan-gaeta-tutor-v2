import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Wallet,
  Wrench,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/area-personale/promoter", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/area-personale/promoter/studenti", label: "Studenti", icon: Users, end: false },
  { to: "/area-personale/promoter/commissioni", label: "Commissioni", icon: Wallet, end: false },
  { to: "/area-personale/promoter/strumenti", label: "Strumenti", icon: Wrench, end: false },
] as const;

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2.5 min-w-0 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors break-words ${
    isActive
      ? "bg-blue-50 text-blue-700 border border-blue-100"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
  }`;

const PromoterSidebar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navContent = (
    <nav className="space-y-1">
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={linkClass}
          onClick={() => setMobileOpen(false)}
        >
          <Icon className="w-4 h-4 shrink-0" aria-hidden />
          {label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <>
      <div className="lg:hidden mb-6 min-w-0 max-w-full">
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="flex items-center gap-2 w-full px-4 py-3 rounded-2xl border border-slate-100 bg-white shadow-sm text-sm font-semibold text-slate-700"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          Menu promoter
        </button>
        {mobileOpen && (
          <div className="mt-3 p-4 rounded-2xl border border-slate-100 bg-white/80 shadow-sm">
            {navContent}
          </div>
        )}
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-28 p-4 rounded-2xl border border-slate-100 bg-white/80">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Menu
          </p>
          {navContent}
        </div>
      </aside>
    </>
  );
};

export default PromoterSidebar;
