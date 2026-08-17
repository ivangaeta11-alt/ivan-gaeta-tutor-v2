import type {
  MaterialAssignment,
  MaterialFile,
  MaterialFolder,
  MaterialWorkspace,
  RecentMaterialEntry,
} from "../types";

const WS_GRP_SMF = "ws_grp_smf_01";
const WS_IND_FIS = "ws_ind_fisica";
const WS_ARCH_FIS1 = "ws_arch_fisica1";
const WS_ARCH_TOLC = "ws_arch_tolc";
const WS_GUEST = "ws_guest_trial";

export const MOCK_MATERIAL_WORKSPACES: MaterialWorkspace[] = [
  {
    id: WS_GRP_SMF,
    name: "Gruppo SMF 01",
    type: "group",
    subject: "Fisica",
    tutorName: "Ivan Gaeta",
    status: "active",
    accessMode: "student_managed",
    effectiveMembers: 7,
    fileCount: 24,
    lastUpdated: "2026-08-17",
    newContentCount: 3,
    isArchived: false,
  },
  {
    id: WS_IND_FIS,
    name: "Lezioni individuali – Fisica",
    type: "individual",
    subject: "Fisica",
    tutorName: "Ivan Gaeta",
    status: "active",
    accessMode: "student_managed",
    fileCount: 12,
    lastUpdated: "2026-08-16",
    newContentCount: 1,
    isArchived: false,
  },
  {
    id: WS_ARCH_FIS1,
    name: "Gruppo Fisica 1",
    type: "group",
    subject: "Fisica",
    tutorName: "Ivan Gaeta",
    status: "completed",
    accessMode: "archived_readonly",
    fileCount: 18,
    lastUpdated: "2026-06-30",
    newContentCount: 0,
    isArchived: true,
  },
  {
    id: WS_ARCH_TOLC,
    name: "Percorso TOLC",
    type: "individual",
    subject: "Preparazione TOLC",
    tutorName: "Ivan Gaeta",
    status: "completed",
    accessMode: "archived_readonly",
    fileCount: 9,
    lastUpdated: "2026-05-15",
    newContentCount: 0,
    isArchived: true,
  },
  {
    id: WS_GUEST,
    name: "Materiali per la prova",
    type: "guest",
    subject: "Fisica",
    tutorName: "Ivan Gaeta",
    status: "guest",
    accessMode: "guest_limited",
    fileCount: 2,
    lastUpdated: "2026-08-10",
    newContentCount: 0,
    isArchived: false,
  },
];

function sysFolder(
  id: string,
  workspaceId: string,
  name: string,
  systemKind: "tutor" | "submissions"
): MaterialFolder {
  return {
    id,
    workspaceId,
    parentId: null,
    name,
    isSystem: true,
    systemKind,
    lastUpdated: "2026-08-17",
    newContentCount: systemKind === "tutor" ? 2 : 0,
  };
}

function folder(
  id: string,
  workspaceId: string,
  parentId: string,
  name: string,
  lastUpdated = "2026-08-15"
): MaterialFolder {
  return {
    id,
    workspaceId,
    parentId,
    name,
    isSystem: false,
    lastUpdated,
    newContentCount: 0,
  };
}

function file(
  id: string,
  workspaceId: string,
  parentId: string,
  name: string,
  fileType: MaterialFile["fileType"],
  opts: Partial<MaterialFile> = {}
): MaterialFile {
  return {
    id,
    workspaceId,
    parentId,
    name,
    fileType,
    sizeLabel: opts.sizeLabel ?? "1,2 MB",
    author: opts.author ?? "Ivan Gaeta",
    publishedBy: opts.publishedBy ?? "Ivan Gaeta",
    lastModified: opts.lastModified ?? "2026-08-15",
    isNew: opts.isNew ?? false,
    area: opts.area ?? "tutor",
  };
}

/** Cartelle condivise per workspace attivi (stessa struttura tutor) */
function buildTutorTree(workspaceId: string, prefix: string): MaterialFolder[] {
  const tutorRoot = sysFolder(`${prefix}_tutor`, workspaceId, "Materiali del tutor", "tutor");
  const submissionsRoot = sysFolder(
    `${prefix}_submissions`,
    workspaceId,
    "Le mie consegne",
    "submissions"
  );

  const teoria = folder(`${prefix}_teoria`, workspaceId, tutorRoot.id, "Teoria");
  const esercizi = folder(`${prefix}_esercizi`, workspaceId, tutorRoot.id, "Esercizi");
  const formulari = folder(`${prefix}_formulari`, workspaceId, tutorRoot.id, "Formulari");
  const registrazioni = folder(
    `${prefix}_registrazioni`,
    workspaceId,
    tutorRoot.id,
    "Registrazioni delle lezioni"
  );

  return [
    tutorRoot,
    submissionsRoot,
    teoria,
    folder(`${prefix}_cin`, workspaceId, teoria.id, "Cinematica"),
    folder(`${prefix}_din`, workspaceId, teoria.id, "Dinamica"),
    folder(`${prefix}_ter`, workspaceId, teoria.id, "Termodinamica"),
    esercizi,
    folder(`${prefix}_guidati`, workspaceId, esercizi.id, "Esercizi guidati"),
    folder(`${prefix}_assegnati`, workspaceId, esercizi.id, "Esercizi assegnati"),
    folder(`${prefix}_sim`, workspaceId, esercizi.id, "Simulazioni"),
    formulari,
    registrazioni,
  ];
}

export const MOCK_MATERIAL_FOLDERS: MaterialFolder[] = [
  ...buildTutorTree(WS_GRP_SMF, "smf"),
  ...buildTutorTree(WS_IND_FIS, "ind"),
  ...buildTutorTree(WS_ARCH_FIS1, "af1"),
  ...buildTutorTree(WS_ARCH_TOLC, "tolc"),
  sysFolder("guest_root", WS_GUEST, "Materiali condivisi per la prova", "tutor"),
];

export const MOCK_MATERIAL_FILES: MaterialFile[] = [
  // Gruppo SMF 01
  file("f_smf_cin1", WS_GRP_SMF, "smf_cin", "Dispensa – Cinematica.pdf", "pdf", {
    lastModified: "2026-08-17",
    isNew: true,
  }),
  file("f_smf_cin2", WS_GRP_SMF, "smf_cin", "Appunti lezione cinematica.pdf", "pdf", {
    lastModified: "2026-08-14",
  }),
  file("f_smf_din1", WS_GRP_SMF, "smf_din", "Dispensa – Dinamica.pdf", "pdf", {
    lastModified: "2026-08-10",
  }),
  file("f_smf_es1", WS_GRP_SMF, "smf_assegnati", "Esercizi sul moto parabolico.pdf", "exercise_sheet", {
    lastModified: "2026-08-13",
  }),
  file("f_smf_form", WS_GRP_SMF, "smf_formulari", "Formulario di cinematica.pdf", "pdf", {
    lastModified: "2026-08-01",
  }),
  file("f_smf_sim1", WS_GRP_SMF, "smf_sim", "Simulazione 1.pdf", "pdf", {
    lastModified: "2026-08-12",
  }),
  file("f_smf_reg1", WS_GRP_SMF, "smf_registrazioni", "Registrazione – Lezione del 17 agosto", "video", {
    lastModified: "2026-08-17",
    isNew: true,
    sizeLabel: "245 MB",
  }),
  file("f_smf_reg2", WS_GRP_SMF, "smf_registrazioni", "Registrazione – Lezione del 14 agosto", "video", {
    lastModified: "2026-08-14",
    sizeLabel: "238 MB",
  }),
  file("f_smf_guid1", WS_GRP_SMF, "smf_guidati", "Esercizi guidati – Vettori.pdf", "exercise_sheet", {
    lastModified: "2026-08-08",
  }),

  // Individuali Fisica
  file("f_ind_cin1", WS_IND_FIS, "ind_cin", "Dispensa – Cinematica.pdf", "pdf", {
    lastModified: "2026-08-16",
    isNew: true,
  }),
  file("f_ind_reg1", WS_IND_FIS, "ind_registrazioni", "Registrazione – Lezione individuale 16 agosto", "video", {
    lastModified: "2026-08-16",
    sizeLabel: "120 MB",
  }),

  // Archivio Fisica 1 (subset)
  file("f_af1_cin", WS_ARCH_FIS1, "af1_cin", "Dispensa – Cinematica.pdf", "pdf", {
    lastModified: "2026-06-20",
  }),
  file("f_af1_reg", WS_ARCH_FIS1, "af1_registrazioni", "Registrazione – Lezione del 15 giugno", "video", {
    lastModified: "2026-06-15",
    sizeLabel: "210 MB",
  }),

  // Archivio TOLC
  file("f_tolc1", WS_ARCH_TOLC, "tolc_teoria", "Introduzione TOLC.pdf", "pdf", {
    lastModified: "2026-05-10",
  }),

  // Guest
  file("f_guest1", WS_GUEST, "guest_root", "Dispensa prova – Cinematica.pdf", "pdf", {
    lastModified: "2026-08-10",
  }),
  file("f_guest2", WS_GUEST, "guest_root", "Esercizio dimostrativo.pdf", "exercise_sheet", {
    lastModified: "2026-08-10",
  }),
];

export const MOCK_MATERIAL_ASSIGNMENTS: MaterialAssignment[] = [
  {
    id: "asg_smf_1",
    workspaceId: WS_GRP_SMF,
    title: "Esercizi di cinematica",
    instructions:
      "Svolgi gli esercizi 1–8 del foglio allegato. Carica la scansione in PDF o una foto leggibile.",
    subject: "Fisica",
    tutorName: "Ivan Gaeta",
    publishedAt: "2026-08-15",
    dueDate: "2026-08-22",
    tutorAttachments: [
      { id: "att_1", name: "Foglio esercizi cinematica.pdf", fileType: "pdf" },
    ],
    status: "da_consegnare",
  },
  {
    id: "asg_smf_2",
    workspaceId: WS_GRP_SMF,
    title: "Simulazione 1",
    instructions: "Completa la simulazione e carica le risposte entro la scadenza.",
    subject: "Fisica",
    tutorName: "Ivan Gaeta",
    publishedAt: "2026-08-10",
    dueDate: "2026-08-18",
    tutorAttachments: [{ id: "att_2", name: "Simulazione 1.pdf", fileType: "pdf" }],
    studentFile: { name: "Simulazione_1_MarcoR.pdf", uploadedAt: "2026-08-16" },
    studentComment: "Ho avuto dubbi sull'esercizio 4.",
    status: "da_correggere",
  },
  {
    id: "asg_smf_3",
    workspaceId: WS_GRP_SMF,
    title: "Esercizi sul moto parabolico",
    instructions: "Risolvi gli esercizi proposti e carica la soluzione.",
    subject: "Fisica",
    tutorName: "Ivan Gaeta",
    publishedAt: "2026-08-01",
    tutorAttachments: [
      { id: "att_3", name: "Esercizi moto parabolico.pdf", fileType: "pdf" },
    ],
    studentFile: { name: "Parabolico_MarcoR.pdf", uploadedAt: "2026-08-08" },
    tutorCorrection:
      "Ottimo lavoro. Attenzione al segno nella componente verticale al punto B. Voto: 28/30.",
    status: "corretta",
  },
  {
    id: "asg_ind_1",
    workspaceId: WS_IND_FIS,
    title: "Verifica argomenti cinematica",
    instructions: "Esercizi personalizzati sulla lezione del 16 agosto.",
    subject: "Fisica",
    tutorName: "Ivan Gaeta",
    publishedAt: "2026-08-16",
    dueDate: "2026-08-23",
    tutorAttachments: [{ id: "att_4", name: "Verifica cinematica.pdf", fileType: "pdf" }],
    status: "da_consegnare",
  },
];

export const MOCK_RECENT_MATERIAL_ENTRIES: RecentMaterialEntry[] = [
  {
    id: "rec_1",
    name: "Dispensa – Cinematica",
    fileType: "pdf",
    workspaceId: WS_GRP_SMF,
    workspaceName: "Gruppo SMF 01",
    folderPath: "Materiali del tutor / Teoria / Cinematica",
    date: "2026-08-17",
    author: "Ivan Gaeta",
    isNew: true,
    targetFolderId: "smf_cin",
  },
  {
    id: "rec_2",
    name: "Registrazione – Lezione del 17 agosto",
    fileType: "video",
    workspaceId: WS_GRP_SMF,
    workspaceName: "Gruppo SMF 01",
    folderPath: "Materiali del tutor / Registrazioni delle lezioni",
    date: "2026-08-17",
    author: "Ivan Gaeta",
    isNew: true,
    targetFolderId: "smf_registrazioni",
  },
  {
    id: "rec_3",
    name: "Correzione – Simulazione 1",
    fileType: "correction",
    workspaceId: WS_IND_FIS,
    workspaceName: "Lezioni individuali – Fisica",
    folderPath: "Le mie consegne",
    date: "2026-08-16",
    author: "Ivan Gaeta",
    isNew: false,
    targetFolderId: "ind_submissions",
    assignmentId: "asg_ind_1",
  },
];

export function getWorkspaceById(id: string): MaterialWorkspace | undefined {
  return MOCK_MATERIAL_WORKSPACES.find((w) => w.id === id);
}

export function getFolderById(id: string): MaterialFolder | undefined {
  return MOCK_MATERIAL_FOLDERS.find((f) => f.id === id);
}

export function getAssignmentsForWorkspace(workspaceId: string): MaterialAssignment[] {
  return MOCK_MATERIAL_ASSIGNMENTS.filter((a) => a.workspaceId === workspaceId);
}

export function getRootFolders(workspaceId: string): MaterialFolder[] {
  return MOCK_MATERIAL_FOLDERS.filter(
    (f) => f.workspaceId === workspaceId && f.parentId === null
  );
}

export function getChildFolders(workspaceId: string, parentId: string): MaterialFolder[] {
  return MOCK_MATERIAL_FOLDERS.filter(
    (f) => f.workspaceId === workspaceId && f.parentId === parentId
  );
}

export function getFilesInFolder(workspaceId: string, parentId: string): MaterialFile[] {
  return MOCK_MATERIAL_FILES.filter(
    (f) => f.workspaceId === workspaceId && f.parentId === parentId
  );
}

export function buildFolderPath(folderId: string): MaterialFolder[] {
  const path: MaterialFolder[] = [];
  let current = getFolderById(folderId);
  while (current) {
    path.unshift(current);
    current = current.parentId ? getFolderById(current.parentId) : undefined;
  }
  return path;
}
