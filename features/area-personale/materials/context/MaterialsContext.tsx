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
import type { FileType, MaterialsArea, MaterialsRole } from "../types";
import { materialsSessionState, type CreateAssignmentInput } from "../data/materialsSessionState";

interface MaterialsContextValue {
  role: MaterialsRole;
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
  createAssignment: (input: CreateAssignmentInput) => void;
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

export const MaterialsProvider: React.FC<{
  children: React.ReactNode;
  role: MaterialsRole;
}> = ({ children, role }) => {
  const { workspaceId: workspaceParam, folderId: folderParam } = useParams<{
    workspaceId?: string;
    folderId?: string;
  }>();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<MaterialsViewMode>("list");
  const [sortField, setSortField] = useState<MaterialsSortField>("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<FileType | "all">("all");
  const [folders, setFoldersState] = useState<MaterialFolder[]>(
    () => materialsSessionState.folders
  );
  const [files, setFilesState] = useState<MaterialFile[]>(
    () => materialsSessionState.files
  );
  const [assignments, setAssignmentsState] = useState<MaterialAssignment[]>(
    () => materialsSessionState.assignments
  );
  const [recentEntries, setRecentEntries] = useState(MOCK_RECENT_MATERIAL_ENTRIES);
  const [openedIds, setOpenedIds] = useState<Set<string>>(new Set());
  const [previewFile, setPreviewFile] = useState<MaterialFile | null>(null);
  const [activeAssignment, setActiveAssignment] = useState<MaterialAssignment | null>(
    null
  );

  const setAssignments = useCallback(
    (
      updater:
        | MaterialAssignment[]
        | ((prev: MaterialAssignment[]) => MaterialAssignment[])
    ) => {
      setAssignmentsState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        materialsSessionState.assignments = next;
        return next;
      });
    },
    []
  );

  const resolvedLocation = useMemo(
    () =>
      resolveMaterialsLocation(role, workspaceParam, folderParam, folders),
    [role, workspaceParam, folderParam, folders]
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

  const allWorkspaces = MOCK_MATERIAL_WORKSPACES;
  const workspaces = useMemo(
    () =>
      role === "tutor"
        ? allWorkspaces.filter((w) => w.type !== "guest")
        : allWorkspaces,
    [role, allWorkspaces]
  );
  const activeWorkspaces = workspaces.filter(
    (w) => w.status === "active" && !w.isArchived
  );
  const archivedWorkspaces = workspaces.filter((w) => w.isArchived);
  const guestWorkspaces =
    role === "student" ? workspaces.filter((w) => w.status === "guest") : [];

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
    ? getMaterialPermissions(role, currentWorkspace, currentArea)
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

  const setFolders = useCallback(
    (updater: MaterialFolder[] | ((prev: MaterialFolder[]) => MaterialFolder[])) => {
      setFoldersState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        materialsSessionState.folders = next;
        return next;
      });
    },
    []
  );

  const setFiles = useCallback(
    (updater: MaterialFile[] | ((prev: MaterialFile[]) => MaterialFile[])) => {
      setFilesState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        materialsSessionState.files = next;
        return next;
      });
    },
    []
  );

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
      navigate(buildMaterialsPath(role, workspaceId));
      setSearchQuery("");
      setTypeFilter("all");
    },
    [navigate, role]
  );

  const navigateToLocation = useCallback(
    (workspaceId: string, folderId: string) => {
      navigate(buildMaterialsPath(role, workspaceId, folderId));
      setSearchQuery("");
      setTypeFilter("all");
    },
    [navigate, role]
  );

  const openFolder = useCallback(
    (folderId: string) => {
      const folder =
        folders.find((f) => f.id === folderId) ?? getFolderById(folderId);
      if (!folder) return;
      navigate(buildMaterialsPath(role, folder.workspaceId, folderId));
      setSearchQuery("");
    },
    [navigate, folders, role]
  );

  const openRecent = useCallback(
    (entry: RecentMaterialEntry) => {
      if (entry.assignmentId) {
        const asg = assignments.find((a) => a.id === entry.assignmentId);
        if (asg) {
          navigate(buildMaterialsPath(role, entry.workspaceId, entry.targetFolderId));
          setActiveAssignment(asg);
          return;
        }
      }
      navigate(buildMaterialsPath(role, entry.workspaceId, entry.targetFolderId));
      markOpened(entry.id);
    },
    [assignments, markOpened, navigate, role]
  );

  const goHome = useCallback(() => {
    navigate(buildMaterialsPath(role));
    setSearchQuery("");
    setActiveAssignment(null);
    setPreviewFile(null);
  }, [navigate, role]);

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
    [navigation, permissions.canCreateFolder, setFolders]
  );

  const uploadFile = useCallback(
    (name: string, fileType: FileType) => {
      if (!navigation.workspaceId || !navigation.folderId || !permissions.canUpload) {
        return;
      }
      const author = role === "tutor" ? "Ivan Gaeta" : "Marco R.";
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
          author,
          publishedBy: author,
          lastModified: new Date().toISOString().slice(0, 10),
          isNew: false,
          area: currentArea,
        },
      ]);
    },
    [navigation, permissions.canUpload, role, currentArea, setFiles]
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
    [folders, permissions.canRename, setFolders]
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
    [permissions.canRename, setFiles]
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
    [permissions.canReplace, setFiles]
  );

  const deleteFolder = useCallback(
    (id: string) => {
      const folder = folders.find((f) => f.id === id);
      if (!folder || folder.isSystem || !permissions.canDelete) return;
      setFolders((prev) => prev.filter((f) => f.id !== id && f.parentId !== id));
      setFiles((prev) => prev.filter((f) => f.parentId !== id));
    },
    [folders, permissions.canDelete, setFolders, setFiles]
  );

  const deleteFile = useCallback(
    (id: string) => {
      if (!permissions.canDelete) return;
      setFiles((prev) => prev.filter((f) => f.id !== id));
    },
    [permissions.canDelete, setFiles]
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
    [setAssignments]
  );

  const createAssignment = useCallback(
    (input: CreateAssignmentInput) => {
      if (role !== "tutor") return;
      const workspace = getWorkspaceById(input.workspaceId);
      if (!workspace || workspace.isArchived) return;

      const id = `asg_${Date.now()}`;
      const newAssignment: MaterialAssignment = {
        id,
        workspaceId: input.workspaceId,
        title: input.title,
        instructions: input.instructions,
        subject: workspace.subject,
        tutorName: "Ivan Gaeta",
        publishedAt: new Date().toISOString().slice(0, 10),
        dueDate: input.dueDate,
        tutorAttachments: input.attachmentName
          ? [
              {
                id: `att_${Date.now()}`,
                name: input.attachmentName,
                fileType: "pdf",
              },
            ]
          : [],
        status: "da_consegnare",
      };
      setAssignments((prev) => [newAssignment, ...prev]);
    },
    [role, setAssignments]
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
      role,
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
      createAssignment,
      globalSearchResults,
    }),
    [
      role,
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
      createAssignment,
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
