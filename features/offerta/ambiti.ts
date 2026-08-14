import { Microscope, PencilRuler, GraduationCap, School, type LucideIcon } from "lucide-react";

export interface Ambito {
  slug: string;
  path: string;
  tileTitle: string;
  pageTitle: string;
  description: string;
  intro: string;
  icon: LucideIcon;
  color: "blue" | "emerald" | "indigo" | "amber";
  accent: string;
}

export const ambiti: Ambito[] = [
  {
    slug: "semestre-filtro",
    path: "/offerta-formativa/semestre-filtro",
    tileTitle: "Semestre Filtro Medicina",
    pageTitle: "Fisica per il Semestre Filtro di Medicina",
    description:
      "Preparazione specifica per il modulo di Fisica. Superiamo gli sbarramenti del primo anno con esercizi mirati e ripasso teorico strutturato.",
    intro:
      "Un percorso dedicato a superare il modulo di Fisica del semestre filtro, con metodo rigoroso e pratica mirata.",
    icon: Microscope,
    color: "blue",
    accent: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    slug: "tolc",
    path: "/offerta-formativa/tolc",
    tileTitle: "Preparazione TOLC",
    pageTitle: "Preparazione TOLC",
    description:
      "Logica, Matematica e Fisica per i test d'ingresso (MED, VET, S, I). Strategie di risoluzione rapida per massimizzare il punteggio.",
    intro:
      "Preparazione mirata ai test TOLC, con focus su velocità, accuratezza e gestione del tempo in sede d'esame.",
    icon: PencilRuler,
    color: "emerald",
    accent: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    slug: "esami-universitari",
    path: "/offerta-formativa/esami-universitari",
    tileTitle: "Esami universitari",
    pageTitle: "Preparazione agli esami universitari",
    description:
      "Analisi I e II, Fisica Generale e Statistica. Supporto per facoltà STEM con un focus rigoroso sul metodo di studio scientifico.",
    intro:
      "Supporto strutturato per gli esami scientifici universitari, dal ripasso teorico alla risoluzione di problemi.",
    icon: GraduationCap,
    color: "indigo",
    accent: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    slug: "superiori",
    path: "/offerta-formativa/superiori",
    tileTitle: "Studenti delle superiori",
    pageTitle: "Matematica e Fisica per le scuole superiori",
    description:
      "Supporto in Matematica e Fisica per tutto il percorso delle superiori. Consolidamento delle basi e preparazione alla maturità e ai test d'ingresso universitari.",
    intro:
      "Accompagnamento in Matematica e Fisica lungo il percorso delle superiori, fino alla maturità e ai test di ingresso.",
    icon: School,
    color: "amber",
    accent: "bg-amber-50 text-amber-600 border-amber-100",
  },
];

export function getAmbitoBySlug(slug: string): Ambito | undefined {
  return ambiti.find((a) => a.slug === slug);
}
