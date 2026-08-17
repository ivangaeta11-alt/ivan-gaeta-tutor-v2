import {
  getFolderById,
  getWorkspaceById,
} from "../data/materialsMock";
import type { MaterialFolder, MaterialsRole } from "../types";

export const MATERIALS_BASE_PATHS: Record<MaterialsRole, string> = {
  student: "/area-personale/studente/materiali",
  tutor: "/area-personale/tutor/materiali",
};

export function getMaterialsBasePath(role: MaterialsRole): string {
  return MATERIALS_BASE_PATHS[role];
}

/** @deprecated Usare getMaterialsBasePath("student") */
export const MATERIALS_BASE_PATH = MATERIALS_BASE_PATHS.student;

export interface MaterialsPathParts {
  isMaterials: boolean;
  role: MaterialsRole | null;
  workspaceId: string | null;
  folderId: string | null;
}

export function parseMaterialsPath(pathname: string): MaterialsPathParts {
  for (const [role, base] of Object.entries(MATERIALS_BASE_PATHS) as [
    MaterialsRole,
    string,
  ][]) {
    if (!pathname.startsWith(base)) continue;

    const remainder = pathname.slice(base.length).replace(/^\//, "");
    if (!remainder) {
      return {
        isMaterials: true,
        role,
        workspaceId: null,
        folderId: null,
      };
    }

    const [workspaceId, folderId] = remainder.split("/");
    return {
      isMaterials: true,
      role,
      workspaceId: workspaceId || null,
      folderId: folderId || null,
    };
  }

  return { isMaterials: false, role: null, workspaceId: null, folderId: null };
}

/** Folder depth changes within the same workspace (breadcrumb, back, browser history). */
export function isMaterialsInternalNavigation(
  prev: MaterialsPathParts,
  next: MaterialsPathParts
): boolean {
  if (!prev.isMaterials || !next.isMaterials) return false;
  if (!prev.workspaceId || !next.workspaceId) return false;
  return prev.workspaceId === next.workspaceId && prev.role === next.role;
}

/** First entry into Materiali or opening a workspace from the Materiali home list. */
export function shouldScrollMaterialsEntry(
  prev: MaterialsPathParts,
  next: MaterialsPathParts
): boolean {
  if (!next.isMaterials) return false;
  if (!prev.isMaterials || prev.role !== next.role) return true;
  if (!prev.workspaceId && next.workspaceId) return true;
  return false;
}

export function buildMaterialsPath(
  role: MaterialsRole,
  workspaceId?: string | null,
  folderId?: string | null
): string {
  const base = getMaterialsBasePath(role);
  if (!workspaceId) return base;
  if (!folderId) return `${base}/${workspaceId}`;
  return `${base}/${workspaceId}/${folderId}`;
}

export interface ResolvedMaterialsLocation {
  workspaceId: string | null;
  folderId: string | null;
  redirectTo: string | null;
}

export function resolveMaterialsLocation(
  role: MaterialsRole,
  workspaceParam?: string,
  folderParam?: string,
  folders: MaterialFolder[] = []
): ResolvedMaterialsLocation {
  const base = getMaterialsBasePath(role);

  if (!workspaceParam) {
    return { workspaceId: null, folderId: null, redirectTo: null };
  }

  const workspace = getWorkspaceById(workspaceParam);
  if (!workspace) {
    return {
      workspaceId: null,
      folderId: null,
      redirectTo: base,
    };
  }

  if (role === "tutor" && workspace.type === "guest") {
    return {
      workspaceId: null,
      folderId: null,
      redirectTo: base,
    };
  }

  if (!folderParam) {
    return { workspaceId: workspaceParam, folderId: null, redirectTo: null };
  }

  const folder =
    folders.find((f) => f.id === folderParam) ?? getFolderById(folderParam);

  if (!folder || folder.workspaceId !== workspaceParam) {
    return {
      workspaceId: workspaceParam,
      folderId: null,
      redirectTo: buildMaterialsPath(role, workspaceParam),
    };
  }

  return {
    workspaceId: workspaceParam,
    folderId: folderParam,
    redirectTo: null,
  };
}
