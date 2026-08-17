import type {
  CreditMovement,
  Lesson,
  Material,
  Notification,
  Student,
  StudyGroup,
  Submission,
  Vote,
  Wallet,
} from "../types";

export const MOCK_STUDENT: Student = {
  id: "stu_demo_001",
  displayName: "Marco R.",
  email: "marco.demo@example.com",
  personalCredits: 35,
  isActiveGroupMember: true,
};

export const MOCK_GROUP: StudyGroup = {
  id: "grp_smf_01",
  name: "Gruppo SMF 01",
  subject: "Fisica",
  tutorName: "Ivan Gaeta",
  effectiveMembers: 7,
  collectiveCredits: 120,
  recurringSlots: ["Martedì 18:00–19:30", "Giovedì 17:00–18:30"],
  openToNewMembers: true,
  members: [
    { id: "m1", initials: "MR", isGuest: false },
    { id: "m2", initials: "LB", isGuest: false },
    { id: "m3", initials: "AS", isGuest: false },
    { id: "m4", initials: "FC", isGuest: false },
    { id: "m5", initials: "GP", isGuest: false },
    { id: "m6", initials: "VT", isGuest: false },
    { id: "m7", initials: "EL", isGuest: false },
  ],
};

export const MOCK_LESSONS: Lesson[] = [
  {
    id: "les_001",
    kind: "group_recurring",
    groupId: "grp_smf_01",
    subject: "Fisica",
    groupName: "Gruppo SMF 01",
    date: "2026-08-19",
    startTime: "18:00",
    endTime: "19:30",
    mode: "online",
    status: "confermata",
    effectiveMembers: 7,
  },
  {
    id: "les_002",
    kind: "group_recurring",
    groupId: "grp_smf_01",
    subject: "Fisica",
    groupName: "Gruppo SMF 01",
    date: "2026-08-21",
    startTime: "17:00",
    endTime: "18:30",
    mode: "online",
    status: "votazione_aperta",
    effectiveMembers: 7,
  },
  {
    id: "les_003",
    kind: "group_recurring",
    groupId: "grp_smf_01",
    subject: "Fisica",
    groupName: "Gruppo SMF 01",
    date: "2026-08-26",
    startTime: "18:00",
    endTime: "19:30",
    mode: "online",
    status: "programmata",
    effectiveMembers: 7,
  },
  {
    id: "les_004",
    kind: "group_recurring",
    groupId: "grp_smf_01",
    subject: "Fisica",
    groupName: "Gruppo SMF 01",
    date: "2026-08-12",
    startTime: "18:00",
    endTime: "19:30",
    mode: "online",
    status: "non_confermata",
    effectiveMembers: 7,
  },
  {
    id: "les_005",
    kind: "group_recurring",
    groupId: "grp_smf_01",
    subject: "Fisica",
    groupName: "Gruppo SMF 01",
    date: "2026-08-05",
    startTime: "18:00",
    endTime: "19:30",
    mode: "online",
    status: "annullata_tutor",
    effectiveMembers: 7,
  },
  {
    id: "les_006",
    kind: "group_recurring",
    groupId: "grp_smf_01",
    subject: "Fisica",
    groupName: "Gruppo SMF 01",
    date: "2026-08-14",
    startTime: "18:00",
    endTime: "19:30",
    mode: "online",
    status: "svolta",
    effectiveMembers: 7,
  },
  {
    id: "les_007",
    kind: "group_recurring",
    groupId: "grp_smf_01",
    subject: "Fisica",
    groupName: "Gruppo SMF 01",
    date: "2026-07-29",
    startTime: "18:00",
    endTime: "19:30",
    mode: "online",
    status: "annullata_gruppo",
    effectiveMembers: 6,
  },
  {
    id: "les_008",
    kind: "group_extra",
    groupId: "grp_smf_01",
    subject: "Fisica",
    groupName: "Gruppo SMF 01",
    tutorName: "Ivan Gaeta",
    date: "2026-08-30",
    startTime: "18:00",
    endTime: "19:30",
    mode: "online",
    status: "confermata",
    effectiveMembers: 7,
    durationMinutes: 90,
    costCredits: 40,
    proposalId: "prop_002",
  },
];

export const MOCK_NEXT_LESSON = MOCK_LESSONS[0];

export const MOCK_WALLETS: Wallet[] = [
  {
    type: "personal",
    label: "Crediti personali",
    balance: MOCK_STUDENT.personalCredits,
  },
  {
    type: "collective",
    label: `Wallet ${MOCK_GROUP.name}`,
    balance: MOCK_GROUP.collectiveCredits,
    groupId: MOCK_GROUP.id,
    hint: "Saldo sufficiente per le prossime 2 lezioni",
  },
];

export const MOCK_VOTES: Vote[] = [
  {
    id: "vote_001",
    lessonId: "les_002",
    title: "Spostamento lezione del 21 agosto",
    description:
      "Proposta di spostare la lezione del giovedì 21 agosto dalle 17:00 alle 19:00.",
    favorable: 4,
    against: 1,
    notVoted: 2,
    deadline: "2026-08-18T23:59:00",
  },
];

export const MOCK_RECENT_MATERIALS: Material[] = [
  {
    id: "mat_001",
    type: "dispensa",
    title: "Cinematica",
    date: "2026-08-15",
    groupId: "grp_smf_01",
  },
  {
    id: "mat_002",
    type: "esercizi",
    title: "Moto parabolico",
    date: "2026-08-13",
    groupId: "grp_smf_01",
  },
  {
    id: "mat_003",
    type: "registrazione",
    title: "Lezione del 14 agosto",
    date: "2026-08-14",
    groupId: "grp_smf_01",
  },
];

export const MOCK_TUTOR_MATERIALS: Material[] = [
  ...MOCK_RECENT_MATERIALS,
  {
    id: "mat_004",
    type: "formulario",
    title: "Formulario Fisica 1",
    date: "2026-08-01",
    groupId: "grp_smf_01",
  },
  {
    id: "mat_005",
    type: "esercizi",
    title: "Forze e equilibrio",
    date: "2026-08-08",
    groupId: "grp_smf_01",
  },
  {
    id: "mat_006",
    type: "dispensa",
    title: "Dinamica",
    date: "2026-08-10",
    groupId: "grp_smf_01",
  },
];

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: "sub_001",
    title: "Esercizi Cinematica — Set A",
    status: "da_correggere",
    submittedDate: "2026-08-16",
  },
  {
    id: "sub_002",
    title: "Verifica Moto rettilineo",
    status: "corretta",
    submittedDate: "2026-08-10",
  },
  {
    id: "sub_003",
    title: "Compiti Moto parabolico",
    status: "da_consegnare",
    dueDate: "2026-08-22",
  },
];

export const MOCK_CREDIT_MOVEMENTS: CreditMovement[] = [
  {
    id: "mov_001",
    date: "2026-08-10",
    amount: 50,
    description: "Acquisto crediti",
    walletType: "personal",
  },
  {
    id: "mov_002",
    date: "2026-08-11",
    amount: -20,
    description: "Trasferimento al Gruppo SMF 01",
    walletType: "personal",
    groupId: "grp_smf_01",
  },
  {
    id: "mov_003",
    date: "2026-08-12",
    amount: -25,
    description: "Lezione individuale",
    walletType: "personal",
  },
  {
    id: "mov_004",
    date: "2026-08-14",
    amount: -40,
    description: "Lezione di gruppo",
    walletType: "collective",
    groupId: "grp_smf_01",
  },
  {
    id: "mov_005",
    date: "2026-08-05",
    amount: 40,
    description: "Rimborso per lezione annullata dal tutor",
    walletType: "collective",
    groupId: "grp_smf_01",
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "not_001",
    message: "Votazione aperta: spostamento lezione del 21 agosto",
    date: "2026-08-17",
    read: false,
  },
  {
    id: "not_002",
    message: "Nuova dispensa disponibile: Cinematica",
    date: "2026-08-15",
    read: false,
  },
  {
    id: "not_003",
    message: "Lezione del 19 agosto confermata",
    date: "2026-08-18",
    read: true,
  },
];

export const CREDIT_EURO_RATIO = 1;
