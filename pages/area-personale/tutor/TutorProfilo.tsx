import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import DashboardCard from "../../../features/area-personale/DashboardCard";
import InfoNotice from "../../../features/area-personale/studente/components/InfoNotice";
import {
  MOCK_TUTOR,
  MOCK_AVAILABILITY,
  MOCK_UNAVAILABILITY,
} from "../../../features/area-personale/tutor/data";
import { tutorAvailabilitySession } from "../../../features/area-personale/tutor/data/tutorAvailabilitySession";
import { formatDateShort } from "../../../features/area-personale/studente/utils/format";

const TutorProfilo: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [description, setDescription] = useState(MOCK_TUTOR.description);
  const [videoLink, setVideoLink] = useState(MOCK_TUTOR.defaultVideoLink);

  return (
    <div>
      <PageHeader title="Profilo e disponibilità" description="Dati professionali e fasce orarie." />

      {saved && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-sm text-emerald-800">
          Modifiche salvate localmente (demo).
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <DashboardCard title="Profilo">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-xl font-bold text-blue-700">
              {MOCK_TUTOR.photoInitials}
            </div>
            <div>
              <p className="font-bold text-slate-900">{MOCK_TUTOR.displayName}</p>
              <p className="text-sm text-slate-500">{MOCK_TUTOR.email}</p>
            </div>
          </div>
          <label className="block mb-3">
            <span className="text-xs font-semibold text-slate-600">Descrizione</span>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
          </label>
          <p className="text-sm text-slate-600 mb-1">Materie: {MOCK_TUTOR.subjects.join(", ")}</p>
          <p className="text-sm text-slate-600">Modalità: {MOCK_TUTOR.modes.map((m) => (m === "online" ? "Online" : "In presenza")).join(", ")}</p>
        </DashboardCard>

        <DashboardCard title="Videolezione">
          <label className="block">
            <span className="text-xs font-semibold text-slate-600">Link abituale</span>
            <input type="url" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-mono" />
          </label>
        </DashboardCard>
      </div>

      <DashboardCard title="Disponibilità settimanale">
        <ul className="space-y-2 mb-4">
          {MOCK_AVAILABILITY.map((slot) => (
            <li key={slot.day} className="flex justify-between text-sm p-2 rounded-lg bg-slate-50">
              <span className="font-medium">{slot.day}</span>
              <span className="text-slate-600">{slot.start} – {slot.end}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-slate-500 mb-2">
          Slot su date specifiche nel calendario: {tutorAvailabilitySession.slots.length} registrati
          (demo).
        </p>
        <Link
          to="/area-personale/tutor/calendario"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Gestisci disponibilità nel calendario →
        </Link>
      </DashboardCard>

      <div className="mt-6">
        <DashboardCard title="Periodi di indisponibilità">
          <ul className="space-y-2">
            {MOCK_UNAVAILABILITY.map((p) => (
              <li key={p.start} className="text-sm text-slate-600">
                {formatDateShort(p.start)} – {formatDateShort(p.end)}: {p.reason}
              </li>
            ))}
          </ul>
        </DashboardCard>
      </div>

      <InfoNotice>
        Le modifiche alla disponibilità non cambiano automaticamente le lezioni già programmate.
      </InfoNotice>

      <button
        type="button"
        onClick={() => setSaved(true)}
        className="mt-6 px-4 py-2.5 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700"
      >
        Salva modifiche (demo)
      </button>
    </div>
  );
};

export default TutorProfilo;
