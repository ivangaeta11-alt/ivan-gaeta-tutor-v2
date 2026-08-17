import type {
  MaterialPermissions,
  MaterialWorkspace,
  MaterialsArea,
  MaterialsRole,
} from "../types";

const READONLY: MaterialPermissions = {
  canView: true,
  canDownload: true,
  canUpload: false,
  canCreateFolder: false,
  canRename: false,
  canReplace: false,
  canDelete: false,
};

const STUDENT_SUBMISSIONS: MaterialPermissions = {
  canView: true,
  canDownload: true,
  canUpload: true,
  canCreateFolder: true,
  canRename: true,
  canReplace: true,
  canDelete: true,
};

const TUTOR_MANAGED: MaterialPermissions = {
  canView: true,
  canDownload: true,
  canUpload: true,
  canCreateFolder: true,
  canRename: true,
  canReplace: true,
  canDelete: true,
};

const GUEST_LIMITED: MaterialPermissions = {
  canView: true,
  canDownload: true,
  canUpload: false,
  canCreateFolder: false,
  canRename: false,
  canReplace: false,
  canDelete: false,
};

/** Permessi UI centralizzati per ruolo, area e workspace — demo, non sicurezza backend. */
export function getMaterialPermissions(
  role: MaterialsRole,
  workspace: MaterialWorkspace,
  area: MaterialsArea
): MaterialPermissions {
  if (workspace.accessMode === "guest_limited") {
    return GUEST_LIMITED;
  }

  if (workspace.isArchived || workspace.accessMode === "archived_readonly") {
    return READONLY;
  }

  if (role === "tutor") {
    if (area === "tutor") {
      return TUTOR_MANAGED;
    }
    return READONLY;
  }

  if (area === "tutor") {
    return READONLY;
  }

  if (area === "submissions") {
    return STUDENT_SUBMISSIONS;
  }

  return READONLY;
}

export function isArchivedWorkspace(workspace: MaterialWorkspace): boolean {
  return workspace.isArchived || workspace.accessMode === "archived_readonly";
}

export function getSystemFolderDisplayName(
  folder: { name: string; systemKind?: MaterialsArea },
  role: MaterialsRole
): string {
  if (folder.systemKind === "submissions" && role === "tutor") {
    return "Svolgimenti degli studenti";
  }
  return folder.name;
}
