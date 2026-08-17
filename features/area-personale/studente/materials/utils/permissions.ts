import type {
  MaterialPermissions,
  MaterialWorkspace,
  MaterialsArea,
} from "./types";

const READONLY: MaterialPermissions = {
  canView: true,
  canDownload: true,
  canUpload: false,
  canCreateFolder: false,
  canRename: false,
  canReplace: false,
  canDelete: false,
};

const STUDENT_MANAGED: MaterialPermissions = {
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

/** Permessi centralizzati per area e workspace — solo presentazione UI, non sicurezza backend. */
export function getMaterialPermissions(
  workspace: MaterialWorkspace,
  area: MaterialsArea
): MaterialPermissions {
  if (workspace.accessMode === "guest_limited") {
    return GUEST_LIMITED;
  }

  if (workspace.isArchived || workspace.accessMode === "archived_readonly") {
    return READONLY;
  }

  if (area === "tutor") {
    return READONLY;
  }

  if (area === "submissions") {
    return STUDENT_MANAGED;
  }

  return READONLY;
}

export function isArchivedWorkspace(workspace: MaterialWorkspace): boolean {
  return workspace.isArchived || workspace.accessMode === "archived_readonly";
}
