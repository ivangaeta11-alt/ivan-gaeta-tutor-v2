import {
  getFolderById,
  getWorkspaceById,
} from "../data/materialsMock";
import type { MaterialFolder } from "../types";

export const MATERIALS_BASE_PATH = "/area-personale/studente/materiali";

export interface MaterialsPathParts {
  isMaterials: boolean;
  workspaceId: string | null;
  folderId: string | null;
}

export function parseMaterialsPath(pathname: string): MaterialsPathParts {
  if (!pathname.startsWith(MATERIALS_BASE_PATH)) {
    return { isMaterials: false, workspaceId: null, folderId: null };
  }

  const remainder = pathname.slice(MATERIALS_BASE_PATH.length).replace(/^\//, "");
  if (!remainder) {
    return { isMaterials: true, workspaceId: null, folderId: null };
  }

  const [workspaceId, folderId] = remainder.split("/");
  return {
    isMaterials: true,
    workspaceId: workspaceId || null,
    folderId: folderId || null,
  };
}

/** Folder depth changes within the same workspace (breadcrumb, back, browser history). */
export function isMaterialsInternalNavigation(
  prev: MaterialsPathParts,
  next: MaterialsPathParts
): boolean {
  if (!prev.isMaterials || !next.isMaterials) return false;
  if (!prev.workspaceId || !next.workspaceId) return false;
  return prev.workspaceId === next.workspaceId;
}

/** First entry into Materiali or opening a workspace from the Materiali home list. */
export function shouldScrollMaterialsEntry(
  prev: MaterialsPathParts,
  next: MaterialsPathParts
): boolean {
  if (!next.isMaterials) return false;
  if (!prev.isMaterials) return true;
  if (!prev.workspaceId && next.workspaceId) return true;
  return false;
}

export function buildMaterialsPath(
  workspaceId?: string | null,
  folderId?: string | null
): string {
  if (!workspaceId) return MATERIALS_BASE_PATH;
  if (!folderId) return `${MATERIALS_BASE_PATH}/${workspaceId}`;
  return `${MATERIALS_BASE_PATH}/${workspaceId}/${folderId}`;
}

export interface ResolvedMaterialsLocation {
  workspaceId: string | null;
  folderId: string | null;
  redirectTo: string | null;
}

export function resolveMaterialsLocation(
  workspaceParam?: string,
  folderParam?: string,
  folders: MaterialFolder[] = []
): ResolvedMaterialsLocation {
  if (!workspaceParam) {
    return { workspaceId: null, folderId: null, redirectTo: null };
  }

  const workspace = getWorkspaceById(workspaceParam);
  if (!workspace) {
    return {
      workspaceId: null,
      folderId: null,
      redirectTo: MATERIALS_BASE_PATH,
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
      redirectTo: buildMaterialsPath(workspaceParam),
    };
  }

  return {
    workspaceId: workspaceParam,
    folderId: folderParam,
    redirectTo: null,
  };
}
