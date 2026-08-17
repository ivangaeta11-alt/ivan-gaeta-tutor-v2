import React from "react";
import { Image, FileText, BookOpen, FileDown, Link2 } from "lucide-react";
import PageHeader from "../../../features/area-personale/promoter/components/PageHeader";
import DashboardCard from "../../../features/area-personale/DashboardCard";

const PLACEHOLDER_SECTIONS = [
  {
    icon: Image,
    title: "Immagini social",
    description: "Template grafici per Instagram, Facebook e LinkedIn pronti da condividere.",
  },
  {
    icon: FileText,
    title: "Copy pronti",
    description: "Testi suggeriti per post, storie e messaggi diretti.",
  },
  {
    icon: BookOpen,
    title: "Descrizioni dei percorsi",
    description: "Schede informative sui percorsi formativi da presentare ai potenziali studenti.",
  },
  {
    icon: FileDown,
    title: "Volantini",
    description: "Materiali stampabili per eventi e attività locali.",
  },
  {
    icon: Link2,
    title: "Guida referral",
    description: "Istruzioni per usare link e codice referral in modo efficace.",
  },
];

const PromoterMateriale: React.FC = () => {
  return (
    <div className="min-w-0 max-w-full">
      <PageHeader
        title="Materiale promozionale"
        description="Risorse per promuovere i percorsi formativi. I contenuti saranno disponibili nelle prossime versioni."
      />

      <div className="p-5 mb-8 rounded-2xl bg-blue-50/60 border border-blue-100 text-sm text-slate-600 font-light break-words">
        Sezione in preparazione. Qui troverai tutto il materiale necessario per divulgare
        l'offerta formativa e tracciare le acquisizioni tramite il tuo link referral.
      </div>

      <div className="grid sm:grid-cols-2 gap-6 min-w-0">
        {PLACEHOLDER_SECTIONS.map(({ icon: Icon, title, description }) => (
          <DashboardCard key={title} title={title}>
            <div className="flex gap-4 min-w-0">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-slate-400" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="break-words">{description}</p>
                <p className="text-xs text-slate-400 mt-2">Disponibile a breve</p>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
};

export default PromoterMateriale;
