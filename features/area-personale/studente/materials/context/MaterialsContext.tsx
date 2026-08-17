import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import type {
  MaterialAssignment,
  MaterialFile,
  MaterialFolder,
  MaterialWorkspace,
  MaterialsSortField,
  MaterialsViewMode,
  RecentMaterialEntry,
} from "../types";
import {
  MOCK_MATERIAL_ASSIGNMENTS,
  MOCK_MATERIAL_FILES,
  MOCK_MATERIAL_FOLDERS,
  MOCK_MATERIAL_WORKSPACES,
  MOCK_RECENT_MATERIAL_ENTRIES,
  buildFolderPath,
  getFolderById,
  getWorkspaceById,
} from "../data/materialsMock";
import { getMaterialPermissions } from "../utils/permissions";
import {
  buildMaterialsPath,
  resolveMaterialsLocation,
} from "../utils/materialsRoutes";
import type { FileType, MaterialsArea } from "../types";

interface MaterialsContextValue {
  workspaces: MaterialWorkspace[];
  activeWorkspaces: MaterialWorkspace[];
  archivedWorkspaces: MaterialWorkspace[];
  guestWorkspaces: MaterialWorkspace[];
  navigation: { workspaceId: string | null; folderId: string | null };
  viewMode: MaterialsViewMode;
  sortField: MaterialsSortField;
  searchQuery: string;
  typeFilter: FileType | "all";
  folders: MaterialFolder[];
  files: MaterialFile[];
  assignments: MaterialAssignment[];
  recentEntries: RecentMaterialEntry[];
  openedIds: Set<string>;
  previewFile: MaterialFile | null;
  activeAssignment: MaterialAssignment | null;
  currentWorkspace: MaterialWorkspace | null;
  currentFolder: MaterialFolder | null;
  currentArea: MaterialsArea;
  permissions: ReturnType<typeof getMaterialPermissions>;
  breadcrumb: MaterialFolder[];
  setViewMode: (mode: MaterialsViewMode) => void;
  setSortField: (field: MaterialsSortField) => void;
  setSearchQuery: (q: string) => void;
  setTypeFilter: (t: FileType | "all") => void;
  openWorkspace: (workspaceId: string) => void;
  navigateToLocation: (workspaceId: string, folderId: string) => void;
  openFolder: (folderId: string) => void;
  openRecent: (entry: RecentMaterialEntry) => void;
  goHome: () => void;
  goBack: () => void;
  openPreview: (file: MaterialFile) => void;
  closePreview: () => void;
  openAssignment: (assignment: MaterialAssignment) => void;
  closeAssignment: () => void;
  markOpened: (id: string) => void;
  createFolder: (name: string) => void;
  uploadFile: (name: string, fileType: FileType) => void;
  renameFolder: (id: string, name: string) => void;
  renameFile: (id: string, name: string) => void;
  replaceFile: (id: string, name: string) => void;
  deleteFolder: (id: string) => void;
  deleteFile: (id: string) => void;
  updateAssignment: (
    id: string,
    patch: Partial<
      Pick<
        MaterialAssignment,
        "studentFile" | "studentComment" | "status"
      >
    >
  ) => void;
  globalSearchResults: {
    files: MaterialFile[];
    folders: MaterialFolder[];
    assignments: MaterialAssignment[];
  };
}

const MaterialsContext = createContext<MaterialsContextValue | null>(null);

function inferArea(folder: MaterialFolder | null): MaterialsArea {
  if (!folder) return "tutor";
  if (folder.systemKind === "submissions") return "submissions";
  if (folder.systemKind === "tutor") return "tutor";
  const path = buildFolderPath(folder.id);
  const root = path[0];
  return root?.systemKind === "submissions" ? "submissions" : "tutor";
}

function sortItems<T extends { name?: string; lastModified?: string; fileType?: string }>(
  items: T[],
  field: MaterialsSortField
): T[] {
  return [...items].sort((a, b) => {
    if (field === "name") {
      return (a.name ?? "").localeCompare(b.name ?? "", "it");
    }
    if (field === "date") {
      return (b.lastModified ?? "").localeCompare(a.lastModified ?? "");
    }
    return (a.fileType ?? "").localeCompare(b.fileType ?? "", "it");
  });
}

export const MaterialsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { workspaceId: workspaceParam, folderId: folderParam } = useParams<{
    workspaceId?: string;
    folderId?: string;
  }>();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<MaterialsViewMode>("list");
  const [sortField, setSortField] = useState<MaterialsSortField>("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<FileType | "all">("all");
  const [folders, setFolders] = useState<MaterialFolder[]>(MOCK_MATERIAL_FOLDERS);
  const [files, setFiles] = useState<MaterialFile[]>(MOCK_MATERIAL_FILES);
  const [assignments, setAssignments] = useState<MaterialAssignment[]>(
    MOCK_MATERIAL_ASSIGNMENTS
  );
  const [recentEntries, setRecentEntries] = useState(MOCK_RECENT_MATERIAL_ENTRIES);
  const [openedIds, setOpenedIds] = useState<Set<string>>(new Set());
  const [previewFile, setPreviewFile] = useState<MaterialFile | null>(null);
  const [activeAssignment, setActiveAssignment] = useState<MaterialAssignment | null>(
    null
  );

  const resolvedLocation = useMemo(
    () => resolveMaterialsLocation(workspaceParam, folderParam, folders),
    [workspaceParam, folderParam, folders]
  );

  useEffect(() => {
    if (resolvedLocation.redirectTo) {
      navigate(resolvedLocation.redirectTo, { replace: true });
    }
  }, [resolvedLocation.redirectTo, navigate]);

  const navigation = useMemo(
    () => ({
      workspaceId: resolvedLocation.redirectTo
        ? null
        : resolvedLocation.workspaceId,
      folderId: resolvedLocation.redirectTo ? null : resolvedLocation.folderId,
    }),
    [resolvedLocation]
  );

  const workspaces = MOCK_MATERIAL_WORKSPACES;
  const activeWorkspaces = workspaces.filter(
    (w) => w.status === "active" && !w.isArchived
  );
  const archivedWorkspaces = workspaces.filter((w) => w.isArchived);
  const guestWorkspaces = workspaces.filter((w) => w.status === "guest");

  const currentWorkspace = navigation.workspaceId
    ? getWorkspaceById(navigation.workspaceId) ?? null
    : null;
  const currentFolder = navigation.folderId
    ? folders.find((f) => f.id === navigation.folderId) ??
      getFolderById(navigation.folderId) ??
      null
    : null;
  const currentArea = inferArea(currentFolder);
  const permissions = currentWorkspace
    ? getMaterialPermissions(currentWorkspace, currentArea)
    : {
        canView: true,
        canDownload: false,
        canUpload: false,
        canCreateFolder: false,
        canRename: false,
        canReplace: false,
        canDelete: false,
      };

  const breadcrumb = useMemo(() => {
    if (!currentFolder) return [];
    const path: MaterialFolder[] = [];
    let cur: MaterialFolder | undefined = currentFolder;
    while (cur) {
      path.unshift(cur);
      cur = cur.parentId ? folders.find((f) => f.id === cur!.parentId) : undefined;
    }
    return path;
  }, [currentFolder, folders]);

  const markOpened = useCallback((id: string) => {
    setOpenedIds((prev) => new Set(prev).add(id));
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isNew: false } : f))
    );
    setRecentEntries((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isNew: false } : r))
    );
  }, []);

  const openWorkspace = useCallback(
    (workspaceId: string) => {
      navigate(buildMaterialsPath(workspaceId));
      setSearchQuery("");
      setTypeFilter("all");
    },
    [navigate]
  );

  const navigateToLocation = useCallback(
    (workspaceId: string, folderId: string) => {
      navigate(buildMaterialsPath(workspaceId, folderId));
      setSearchQuery("");
      setTypeFilter("all");
    },
    [navigate]
  );

  const openFolder = useCallback(
    (folderId: string) => {
      const folder =
        folders.find((f) => f.id === folderId) ?? getFolderById(folderId);
      if (!folder) return;
      navigate(buildMaterialsPath(folder.workspaceId, folderId));
      setSearchQuery("");
    },
    [navigate, folders]
  );

  const openRecent = useCallback(
    (entry: RecentMaterialEntry) => {
      if (entry.assignmentId) {
        const asg = assignments.find((a) => a.id === entry.assignmentId);
        if (asg) {
          navigate(buildMaterialsPath(entry.workspaceId, entry.targetFolderId));
          setActiveAssignment(asg);
          return;
        }
      }
      navigate(buildMaterialsPath(entry.workspaceId, entry.targetFolderId));
      markOpened(entry.id);
    },
    [assignments, markOpened, navigate]
  );

  const goHome = useCallback(() => {
    navigate(buildMaterialsPath());
    setSearchQuery("");
    setActiveAssignment(null);
    setPreviewFile(null);
  }, [navigate]);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const openPreview = useCallback(
    (file: MaterialFile) => {
      markOpened(file.id);
      setPreviewFile(file);
    },
    [markOpened]
  );

  const closePreview = useCallback(() => setPreviewFile(null), []);

  const openAssignment = useCallback((assignment: MaterialAssignment) => {
    setActiveAssignment(assignment);
  }, []);

  const closeAssignment = useCallback(() => setActiveAssignment(null), []);

  const createFolder = useCallback(
    (name: string) => {
      if (!navigation.workspaceId || !navigation.folderId || !permissions.canCreateFolder) {
        return;
      }
      const id = `folder_${Date.now()}`;
      setFolders((prev) => [
        ...prev,
        {
          id,
          workspaceId: navigation.workspaceId!,
          parentId: navigation.folderId!,
          name,
          isSystem: false,
          lastUpdated: new Date().toISOString().slice(0, 10),
        },
      ]);
    },
    [navigation, permissions.canCreateFolder]
  );

  const uploadFile = useCallback(
    (name: string, fileType: FileType) => {
      if (!navigation.workspaceId || !navigation.folderId || !permissions.canUpload) {
        return;
      }
      const id = `file_${Date.now()}`;
      setFiles((prev) => [
        ...prev,
        {
          id,
          workspaceId: navigation.workspaceId!,
          parentId: navigation.folderId!,
          name,
          fileType,
          sizeLabel: "850 KB",
          author: "Marco R.",
          publishedBy: "Marco R.",
          lastModified: new Date().toISOString().slice(0, 10),
          isNew: false,
          area: "submissions",
        },
      ]);
    },
    [navigation, permissions.canUpload]
  );

  const renameFolder = useCallback(
    (id: string, name: string) => {
      const folder = folders.find((f) => f.id === id);
      if (!folder || folder.isSystem || !permissions.canRename) return;
      setFolders((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, name, lastUpdated: new Date().toISOString().slice(0, 10) } : f
        )
      );
    },
    [folders, permissions.canRename]
  );

  const renameFile = useCallback(
    (id: string, name: string) => {
      if (!permissions.canRename) return;
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? { ...f, name, lastModified: new Date().toISOString().slice(0, 10) }
            : f
        )
      );
    },
    [permissions.canRename]
  );

  const replaceFile = useCallback(
    (id: string, name: string) => {
      if (!permissions.canReplace) return;
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? { ...f, name, lastModified: new Date().toISOString().slice(0, 10) }
            : f
        )
      );
    },
    [permissions.canReplace]
  );

  const deleteFolder = useCallback(
    (id: string) => {
      const folder = folders.find((f) => f.id === id);
      if (!folder || folder.isSystem || !permissions.canDelete) return;
      setFolders((prev) => prev.filter((f) => f.id !== id && f.parentId !== id));
      setFiles((prev) => prev.filter((f) => f.parentId !== id));
    },
    [folders, permissions.canDelete]
  );

  const deleteFile = useCallback(
    (id: string) => {
      if (!permissions.canDelete) return;
      setFiles((prev) => prev.filter((f) => f.id !== id));
    },
    [permissions.canDelete]
  );

  const updateAssignment = useCallback(
    (
      id: string,
      patch: Partial<
        Pick<MaterialAssignment, "studentFile" | "studentComment" | "status">
      >
    ) => {
      setAssignments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...patch } : a))
      );
      setActiveAssignment((prev) =>
        prev && prev.id === id ? { ...prev, ...patch } : prev
      );
    },
    []
  );

  const globalSearchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q || navigation.workspaceId) {
      return { files: [], folders: [], assignments: [] };
    }
    const accessibleIds = new Set(
      workspaces.filter((w) => w.status !== "guest").map((w) => w.id)
    );
    return {
      files: files.filter(
        (f) =>
          accessibleIds.has(f.workspaceId) &&
          f.name.toLowerCase().includes(q)
      ),
      folders: folders.filter(
        (f) =>
          accessibleIds.has(f.workspaceId) &&
          !f.isSystem &&
          f.name.toLowerCase().includes(q)
      ),
      assignments: assignments.filter(
        (a) =>
          accessibleIds.has(a.workspaceId) &&
          a.title.toLowerCase().includes(q)
      ),
    };
  }, [searchQuery, navigation.workspaceId, workspaces, files, folders, assignments]);

  const value = useMemo<MaterialsContextValue>(
    () => ({
      workspaces,
      activeWorkspaces,
      archivedWorkspaces,
      guestWorkspaces,
      navigation,
      viewMode,
      sortField,
      searchQuery,
      typeFilter,
      folders,
      files,
      assignments,
      recentEntries,
      openedIds,
      previewFile,
      activeAssignment,
      currentWorkspace,
      currentFolder,
      currentArea,
      permissions,
      breadcrumb,
      setViewMode,
      setSortField,
      setSearchQuery,
      setTypeFilter,
      openWorkspace,
      navigateToLocation,
      openFolder,
      openRecent,
      goHome,
      goBack,
      openPreview,
      closePreview,
      openAssignment,
      closeAssignment,
      markOpened,
      createFolder,
      uploadFile,
      renameFolder,
      renameFile,
      replaceFile,
      deleteFolder,
      deleteFile,
      updateAssignment,
      globalSearchResults,
    }),
    [
      workspaces,
      activeWorkspaces,
      archivedWorkspaces,
      guestWorkspaces,
      navigation,
      viewMode,
      sortField,
      searchQuery,
      typeFilter,
      folders,
      files,
      assignments,
      recentEntries,
      openedIds,
      previewFile,
      activeAssignment,
      currentWorkspace,
      currentFolder,
      currentArea,
      permissions,
      breadcrumb,
      openWorkspace,
      navigateToLocation,
      openFolder,
      openRecent,
      goHome,
      goBack,
      openPreview,
      closePreview,
      openAssignment,
      closeAssignment,
      markOpened,
      createFolder,
      uploadFile,
      renameFolder,
      renameFile,
      replaceFile,
      deleteFolder,
      deleteFile,
      updateAssignment,
      globalSearchResults,
    ]
  );

  return (
    <MaterialsContext.Provider value={value}>{children}</MaterialsContext.Provider>
  );
};

export function useMaterials(): MaterialsContextValue {
  const ctx = useContext(MaterialsContext);
  if (!ctx) {
    throw new Error("useMaterials must be used within MaterialsProvider");
  }
  return ctx;
}

export { sortItems, inferArea };
