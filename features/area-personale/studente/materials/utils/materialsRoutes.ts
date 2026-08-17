import {
  getFolderById,
  getWorkspaceById,
} from "../data/materialsMock";
import type { MaterialFolder } from "../types";

export const MATERIALS_BASE_PATH = "/area-personale/studente/materiali";

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
