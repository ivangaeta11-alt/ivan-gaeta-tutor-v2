/** Tipi per il file manager didattico studenti */

export type WorkspaceType = "group" | "individual" | "guest";

export type WorkspaceStatus = "active" | "completed" | "guest";

export type WorkspaceAccessMode =
  | "tutor_readonly"
  | "student_managed"
  | "archived_readonly"
  | "guest_limited";

export type FileType = "pdf" | "video" | "image" | "document" | "exercise_sheet";

export type MaterialItemKind = "folder" | "file" | "assignment";

export type AssignmentStatus = "da_consegnare" | "consegnata" | "da_correggere" | "corretta";

export type MaterialsViewMode = "list" | "grid";

export type MaterialsSortField = "name" | "date" | "type";

export type MaterialsArea = "tutor" | "submissions";

export type MaterialsRole = "student" | "tutor";

export interface MaterialPermissions {
  canView: boolean;
  canDownload: boolean;
  canUpload: boolean;
  canCreateFolder: boolean;
  canRename: boolean;
  canReplace: boolean;
  canDelete: boolean;
}

export interface MaterialWorkspace {
  id: string;
  name: string;
  type: WorkspaceType;
  subject: string;
  tutorName: string;
  status: WorkspaceStatus;
  accessMode: WorkspaceAccessMode;
  effectiveMembers?: number;
  fileCount: number;
  lastUpdated: string;
  newContentCount: number;
  isArchived: boolean;
}

export interface MaterialFolder {
  id: string;
  workspaceId: string;
  parentId: string | null;
  name: string;
  isSystem: boolean;
  systemKind?: MaterialsArea;
  lastUpdated: string;
  newContentCount?: number;
}

export interface MaterialFile {
  id: string;
  workspaceId: string;
  parentId: string;
  name: string;
  fileType: FileType;
  sizeLabel: string;
  author: string;
  publishedBy: string;
  lastModified: string;
  isNew: boolean;
  area: MaterialsArea;
}

export interface MaterialAssignment {
  id: string;
  workspaceId: string;
  title: string;
  instructions: string;
  subject: string;
  tutorName: string;
  publishedAt: string;
  dueDate?: string;
  tutorAttachments: { id: string; name: string; fileType: FileType }[];
  studentFile?: { name: string; uploadedAt: string };
  studentComment?: string;
  tutorCorrection?: string;
  status: AssignmentStatus;
}

export interface RecentMaterialEntry {
  id: string;
  name: string;
  fileType: FileType | "assignment" | "correction";
  workspaceId: string;
  workspaceName: string;
  folderPath: string;
  date: string;
  author: string;
  isNew: boolean;
  /** Navigazione: cartella di destinazione */
  targetFolderId: string;
  assignmentId?: string;
}

export interface MaterialsNavigation {
  workspaceId: string | null;
  folderId: string | null;
}

export const ASSIGNMENT_STATUS_LABELS: Record<AssignmentStatus, string> = {
  da_consegnare: "Da consegnare",
  consegnata: "Consegnata",
  da_correggere: "Da correggere",
  corretta: "Corretta",
};

export const FILE_TYPE_LABELS: Record<FileType, string> = {
  pdf: "PDF",
  video: "Video",
  image: "Immagine",
  document: "Documento",
  exercise_sheet: "Foglio esercizi",
};

export const WORKSPACE_TYPE_LABELS: Record<WorkspaceType, string> = {
  group: "Gruppo",
  individual: "Individuale",
  guest: "Prova",
};
