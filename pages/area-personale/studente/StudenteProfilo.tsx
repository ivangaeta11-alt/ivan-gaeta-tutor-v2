import React from "react";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import DashboardCard from "../../../features/area-personale/DashboardCard";
import AuthLoadingScreen from "../../../features/auth/AuthLoadingScreen";
import { useStudentProfileForm } from "../../../features/area-personale/studente/hooks/useStudentProfileForm";

function displayOrFallback(value: string | null | undefined): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "N/D";
}

const StudenteProfilo: React.FC = () => {
  const {
    loading,
    saving,
    fullName,
    setFullName,
    phone,
    setPhone,
    email,
    displayName,
    isDirty,
    successMessage,
    errorMessage,
    saveProfile,
  } = useStudentProfileForm();

  if (loading) {
    return <AuthLoadingScreen />;
  }

  return (
    <div>
      <PageHeader
        title="Profilo"
        description="I tuoi dati personali e preferenze account."
      />

      {successMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-sm text-emerald-800">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-sm text-red-800">
          {errorMessage}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <DashboardCard title="Dati personali">
          <p className="text-sm text-slate-600 mb-4">
            Nome visualizzato: <span className="font-semibold text-slate-800">{displayName}</span>
          </p>

          <label className="block mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Nome completo
            </span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800"
              placeholder="Inserisci il tuo nome"
            />
          </label>

          <label className="block mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Telefono
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800"
              placeholder="Inserisci il tuo numero"
            />
          </label>

          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</p>
            <p className="text-slate-800 font-medium mt-1">{displayOrFallback(email)}</p>
            <p className="text-xs text-slate-400 mt-1">
              L&apos;email è collegata al tuo account di accesso e non è modificabile da qui.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void saveProfile()}
            disabled={saving || !isDirty}
            className="px-4 py-2.5 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Salvataggio in corso..." : "Salva modifiche"}
          </button>
        </DashboardCard>

        <DashboardCard title="Gruppo attivo">
          <p className="text-slate-800 font-medium">Nessun gruppo collegato</p>
          <p className="text-sm text-slate-500 mt-2">
            Quando sarai iscritto a un gruppo didattico, i dettagli compariranno qui.
          </p>
        </DashboardCard>

        <DashboardCard title="Preferenze notifiche">
          <p>Avvisi su lezioni, votazioni e nuovi materiali.</p>
          <p className="text-xs text-slate-400 mt-3">Configurazione disponibile nelle prossime versioni</p>
        </DashboardCard>

        <DashboardCard title="Metodi di pagamento">
          <p>Gestione carte e acquisto crediti.</p>
          <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-500 font-light">
            Non ancora configurato. Sarà disponibile con Stripe.
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default StudenteProfilo;
