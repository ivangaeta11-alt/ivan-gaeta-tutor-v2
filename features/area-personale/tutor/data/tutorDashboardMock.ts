import type {
  AvailabilitySlot,
  RequiredAction,
  Tutor,
  TutorEarning,
  TutorGroup,
  TutorGuest,
  TutorLesson,
  TutorMaterial,
  TutorNotification,
  TutorStudent,
  TutorSubmission,
  PublishedMaterial,
  UnavailabilityPeriod,
  GroupVote,
} from "../types";

export const MOCK_TUTOR: Tutor = {
  id: "tut_demo_001",
  displayName: "Ivan Gaeta",
  email: "ivan.demo@example.com",
  photoInitials: "IG",
  description:
    "Tutor STEM con esperienza in Fisica e Matematica per studenti universitari e superiori.",
  subjects: ["Fisica", "Matematica"],
  modes: ["online", "in_presenza"],
  defaultVideoLink: "https://meet.example.com/ivan-gaeta",
};

export const MOCK_GROUPS: TutorGroup[] = [
  {
    id: "grp_smf_01",
    name: "Gruppo SMF 01",
    subject: "Fisica",
    effectiveMembers: 7,
    maxCapacity: 10,
    status: "aperto",
    recurringSlots: ["Martedì 18:00–19:30", "Giovedì 18:00–19:30"],
    nextLessonId: "tl_001",
    pendingSubmissions: 3,
    guestIds: ["gst_001"],
  },
  {
    id: "grp_fis_1",
    name: "Gruppo Fisica 1",
    subject: "Fisica",
    effectiveMembers: 4,
    maxCapacity: 5,
    status: "chiuso",
    recurringSlots: ["Lunedì 17:00–18:30"],
    nextLessonId: "tl_005",
    pendingSubmissions: 0,
    guestIds: [],
  },
];

export const MOCK_STUDENTS: TutorStudent[] = [
  { id: "stu_001", displayName: "Marco R.", initials: "MR", groupId: "grp_smf_01", initialLevel: "Intermedio", objectives: ["Superare l'esame di Fisica 1", "Migliorare il metodo di studio"], lessonsAttended: 12, absences: 1, isGuest: false },
  { id: "stu_002", displayName: "Laura B.", initials: "LB", groupId: "grp_smf_01", initialLevel: "Base", objectives: ["Recuperare lacune di cinematica"], lessonsAttended: 10, absences: 0, isGuest: false },
  { id: "stu_003", displayName: "Andrea S.", initials: "AS", groupId: "grp_smf_01", initialLevel: "Avanzato", objectives: ["Ottimizzare la preparazione d'esame"], lessonsAttended: 14, absences: 2, isGuest: false },
  { id: "stu_004", displayName: "Francesca C.", initials: "FC", groupId: "grp_smf_01", initialLevel: "Intermedio", objectives: ["Consolidare la dinamica"], lessonsAttended: 11, absences: 0, isGuest: false },
  { id: "stu_005", displayName: "Giulia P.", initials: "GP", groupId: "grp_smf_01", initialLevel: "Base", objectives: ["Preparazione semestre filtro"], lessonsAttended: 8, absences: 1, isGuest: false },
  { id: "stu_006", displayName: "Valerio T.", initials: "VT", groupId: "grp_smf_01", initialLevel: "Intermedio", objectives: ["Migliorare esercizi applicativi"], lessonsAttended: 9, absences: 0, isGuest: false },
  { id: "stu_007", displayName: "Elena L.", initials: "EL", groupId: "grp_smf_01", initialLevel: "Base", objectives: ["Recupero argomenti"], lessonsAttended: 7, absences: 1, isGuest: false },
  { id: "stu_008", displayName: "Davide M.", initials: "DM", groupId: "grp_fis_1", initialLevel: "Intermedio", objectives: ["Preparazione parziale"], lessonsAttended: 6, absences: 0, isGuest: false },
  { id: "stu_009", displayName: "Sara N.", initials: "SN", groupId: "grp_fis_1", initialLevel: "Base", objectives: ["Fisica generale"], lessonsAttended: 5, absences: 0, isGuest: false },
  { id: "stu_010", displayName: "Luca F.", initials: "LF", groupId: "grp_fis_1", initialLevel: "Intermedio", objectives: ["Esercitazione intensiva"], lessonsAttended: 6, absences: 1, isGuest: false },
  { id: "stu_011", displayName: "Chiara V.", initials: "CV", groupId: "grp_fis_1", initialLevel: "Avanzato", objectives: ["Perfezionamento"], lessonsAttended: 8, absences: 0, isGuest: false },
];

export const MOCK_GUEST: TutorGuest = {
  id: "gst_001",
  displayName: "Guest — Tommaso G.",
  initials: "TG",
  groupId: "grp_smf_01",
  initialLevel: "Da valutare",
  objectives: ["Prova lezione di ingresso"],
  lessonsAttended: 1,
  absences: 0,
  isGuest: true,
  trialLessonId: "tl_003",
  trialDate: "2026-08-14",
};

export const MOCK_LESSONS: TutorLesson[] = [
  {
    id: "tl_001",
    groupId: "grp_smf_01",
    subject: "Fisica",
    label: "Gruppo SMF 01",
    date: "2026-08-19",
    startTime: "18:00",
    endTime: "19:30",
    mode: "online",
    status: "confermata",
    type: "gruppo",
    participantCount: 7,
    videoLink: "https://meet.example.com/smf-01-19ago",
    topics: ["Dinamica — seconda legge di Newton"],
    materials: ["mat_001"],
    privateNotes: "Ripassare esercizi del cap. 4",
  },
  {
    id: "tl_002",
    groupId: "grp_smf_01",
    subject: "Fisica",
    label: "Gruppo SMF 01",
    date: "2026-08-21",
    startTime: "18:00",
    endTime: "19:30",
    mode: "online",
    status: "modifica_proposta",
    type: "gruppo",
    participantCount: 7,
    topics: ["Cinematica avanzata"],
  },
  {
    id: "tl_003",
    groupId: "grp_smf_01",
    subject: "Fisica",
    label: "Gruppo SMF 01 — Prova",
    date: "2026-08-14",
    startTime: "18:00",
    endTime: "19:30",
    mode: "online",
    status: "da_completare",
    type: "prova",
    participantCount: 1,
    topics: ["Valutazione ingresso guest"],
  },
  {
    id: "tl_004",
    studentId: "stu_001",
    subject: "Fisica",
    label: "Mario Rossi",
    date: "2026-08-20",
    startTime: "10:00",
    endTime: "11:00",
    mode: "online",
    status: "confermata",
    type: "individuale",
    participantCount: 1,
    videoLink: "https://meet.example.com/ind-mario",
    topics: ["Ripasso dinamica"],
  },
  {
    id: "tl_005",
    groupId: "grp_fis_1",
    subject: "Fisica",
    label: "Gruppo Fisica 1",
    date: "2026-08-18",
    startTime: "17:00",
    endTime: "18:30",
    mode: "online",
    status: "in_attesa_conferma",
    type: "gruppo",
    participantCount: 4,
    topics: ["Termodinamica — intro"],
  },
  {
    id: "tl_006",
    groupId: "grp_smf_01",
    subject: "Fisica",
    label: "Gruppo SMF 01",
    date: "2026-08-12",
    startTime: "18:00",
    endTime: "19:30",
    mode: "online",
    status: "non_confermata",
    type: "gruppo",
    participantCount: 7,
    topics: ["Esercizi gruppo"],
  },
  {
    id: "tl_007",
    groupId: "grp_smf_01",
    subject: "Fisica",
    label: "Gruppo SMF 01",
    date: "2026-08-05",
    startTime: "18:00",
    endTime: "19:30",
    mode: "online",
    status: "annullata_tutor",
    type: "gruppo",
    participantCount: 7,
  },
  {
    id: "tl_008",
    groupId: "grp_fis_1",
    subject: "Fisica",
    label: "Gruppo Fisica 1",
    date: "2026-08-11",
    startTime: "17:00",
    endTime: "18:30",
    mode: "online",
    status: "svolta",
    type: "gruppo",
    participantCount: 4,
    topics: ["Equilibrio termico"],
  },
  {
    id: "tl_009",
    groupId: "grp_smf_01",
    subject: "Fisica",
    label: "Gruppo SMF 01",
    date: "2026-07-29",
    startTime: "18:00",
    endTime: "19:30",
    mode: "online",
    status: "annullata_gruppo",
    type: "gruppo",
    participantCount: 6,
  },
  {
    id: "tl_010",
    groupId: "grp_smf_01",
    subject: "Fisica",
    label: "Gruppo SMF 01 — Aggiuntiva",
    date: "2026-08-22",
    startTime: "16:00",
    endTime: "17:30",
    mode: "online",
    status: "programmata",
    type: "gruppo",
    participantCount: 7,
    topics: ["Simulazione d'esame"],
  },
];

export const MOCK_NEXT_LESSON = MOCK_LESSONS[0];

export const MOCK_REQUIRED_ACTIONS: RequiredAction[] = [
  { id: "ra_001", type: "Consegne", title: "3 consegne da correggere — Gruppo SMF 01", priority: "alta", dueDate: "2026-08-20", actionLabel: "Correggi" },
  { id: "ra_002", type: "Materiali", title: "Registrazione lezione del 14 agosto da caricare", priority: "media", dueDate: "2026-08-21", actionLabel: "Carica" },
  { id: "ra_003", type: "Prova", title: "Valutazione guest Tommaso G. da completare", priority: "alta", dueDate: "2026-08-19", actionLabel: "Valuta" },
  { id: "ra_004", type: "Calendario", title: "Modifica orario approvata dal gruppo SMF 01", priority: "bassa", dueDate: "2026-08-18", actionLabel: "Visualizza" },
  { id: "ra_005", type: "Lezione", title: "Lezione del 12 agosto non confermata — saldo insufficiente", priority: "media", actionLabel: "Dettagli" },
];

export const MOCK_WEEKLY_SUMMARY = {
  scheduledLessons: 8,
  lessonsToday: 2,
  pendingSubmissions: 3,
  earningsMatured: 180,
};

export const MOCK_LIBRARY: TutorMaterial[] = [
  { id: "lib_001", type: "dispensa", title: "Cinematica — dispensa base", createdAt: "2026-07-01", reusable: true },
  { id: "lib_002", type: "formulario", title: "Formulario Fisica 1", createdAt: "2026-07-05", reusable: true },
  { id: "lib_003", type: "esercizi", title: "Esercizi Dinamica — set A", createdAt: "2026-07-15", reusable: true },
  { id: "lib_004", type: "simulazione", title: "Simulazione parziale Fisica", createdAt: "2026-08-01", reusable: true },
];

export const MOCK_PUBLISHED: PublishedMaterial[] = [
  { id: "pub_001", title: "Cinematica", type: "dispensa", target: "Gruppo SMF 01", date: "2026-08-15", author: "Ivan Gaeta", published: true },
  { id: "pub_002", title: "Moto parabolico — esercizi", type: "esercizi", target: "Gruppo SMF 01", date: "2026-08-13", author: "Ivan Gaeta", published: true },
  { id: "pub_003", title: "Lezione del 14 agosto", type: "registrazione", target: "Gruppo SMF 01", date: "2026-08-14", author: "Ivan Gaeta", published: false },
];

export const MOCK_SUBMISSIONS: TutorSubmission[] = [
  { id: "sub_001", studentId: "stu_001", studentName: "Marco R.", groupId: "grp_smf_01", groupName: "Gruppo SMF 01", exerciseTitle: "Esercizi Cinematica — Set A", submittedDate: "2026-08-16", status: "da_correggere", fileName: "cinematica_marco.pdf" },
  { id: "sub_002", studentId: "stu_003", studentName: "Andrea S.", groupId: "grp_smf_01", groupName: "Gruppo SMF 01", exerciseTitle: "Verifica Moto rettilineo", submittedDate: "2026-08-15", status: "da_correggere", fileName: "moto_andrea.pdf" },
  { id: "sub_003", studentId: "stu_005", studentName: "Giulia P.", groupId: "grp_smf_01", groupName: "Gruppo SMF 01", exerciseTitle: "Compiti Moto parabolico", dueDate: "2026-08-22", status: "da_consegnare" },
  { id: "sub_004", studentId: "stu_002", studentName: "Laura B.", groupId: "grp_smf_01", groupName: "Gruppo SMF 01", exerciseTitle: "Esercizi Forze", submittedDate: "2026-08-10", status: "corretta", fileName: "forze_laura.pdf" },
];

export const MOCK_EARNINGS: TutorEarning[] = [
  { id: "earn_001", date: "2026-08-19", label: "Gruppo SMF 01", lessonType: "gruppo", durationMinutes: 90, amount: 45, status: "in_attesa" },
  { id: "earn_002", date: "2026-08-15", label: "Mario Rossi", lessonType: "individuale", durationMinutes: 60, amount: 20, status: "maturato" },
  { id: "earn_003", date: "2026-08-11", label: "Gruppo Fisica 1", lessonType: "gruppo", durationMinutes: 90, amount: 35, status: "liquidato" },
  { id: "earn_004", date: "2026-08-14", label: "Prova Gruppo SMF 01", lessonType: "prova", durationMinutes: 90, amount: 20, status: "previsto" },
  { id: "earn_005", date: "2026-08-05", label: "Lezione annullata", lessonType: "gruppo", durationMinutes: 90, amount: 0, status: "annullato" },
];

export const MOCK_NOTIFICATIONS: TutorNotification[] = [
  { id: "tn_001", message: "3 consegne in attesa di correzione — Gruppo SMF 01", date: "2026-08-17", read: false },
  { id: "tn_002", message: "Valutazione guest Tommaso G. da completare", date: "2026-08-17", read: false },
  { id: "tn_003", message: "Lezione SMF 01 del 19 agosto confermata", date: "2026-08-18", read: true },
];

export const MOCK_AVAILABILITY: AvailabilitySlot[] = [
  { day: "Lunedì", start: "09:00", end: "13:00" },
  { day: "Martedì", start: "14:00", end: "20:00" },
  { day: "Mercoledì", start: "09:00", end: "13:00" },
  { day: "Giovedì", start: "14:00", end: "20:00" },
  { day: "Venerdì", start: "09:00", end: "12:00" },
];

export const MOCK_UNAVAILABILITY: UnavailabilityPeriod[] = [
  { start: "2026-08-25", end: "2026-08-31", reason: "Ferie estive" },
];

export const MOCK_GROUP_VOTES: GroupVote[] = [
  { id: "gv_001", title: "Spostamento lezione del 21 agosto", deadline: "2026-08-18T23:59:00" },
];

export const MOCK_TOPICS_COVERED = [
  "Cinematica e moto rettilineo",
  "Moto parabolico",
  "Forze e equilibrio",
  "Principi della dinamica",
];

export function getGroupById(id: string) {
  return MOCK_GROUPS.find((g) => g.id === id);
}

export function getStudentById(id: string) {
  return MOCK_STUDENTS.find((s) => s.id === id) ?? (id === MOCK_GUEST.id ? MOCK_GUEST : undefined);
}

export function getLessonById(id: string) {
  return MOCK_LESSONS.find((l) => l.id === id);
}

export function getStudentsByGroup(groupId: string) {
  return MOCK_STUDENTS.filter((s) => s.groupId === groupId);
}

export function getLessonsByGroup(groupId: string) {
  return MOCK_LESSONS.filter((l) => l.groupId === groupId);
}

export function getEarningsSummary() {
  const sum = (status: TutorEarning["status"] | TutorEarning["status"][]) => {
    const statuses = Array.isArray(status) ? status : [status];
    return MOCK_EARNINGS.filter((e) => statuses.includes(e.status)).reduce((s, e) => s + e.amount, 0);
  };
  return {
    previsto: sum("previsto"),
    inAttesa: sum("in_attesa"),
    maturato: sum("maturato"),
    liquidato: sum("liquidato"),
  };
}
