import React, { useMemo, useState } from "react";
import { ArrowLeft, FolderPlus, Upload } from "lucide-react";
import MaterialsBreadcrumbs from "./MaterialsBreadcrumbs";
import MaterialsToolbar from "./MaterialsToolbar";
import MaterialItemRow, { type ExplorerItem } from "./MaterialItemRow";
import MaterialItemCard from "./MaterialItemCard";
import EmptyFolderState from "./EmptyFolderState";
import ArchivedWorkspaceNotice from "./ArchivedWorkspaceNotice";
import FilePreviewModal from "./FilePreviewModal";
import AssignmentDetailsModal from "./AssignmentDetailsModal";
import TutorAssignmentModal from "./TutorAssignmentModal";
import CreateFolderDialog from "./CreateFolderDialog";
import UploadFileDialog from "./UploadFileDialog";
import ConfirmDialog from "../../studente/components/ConfirmDialog";
import { useMaterials } from "../context/MaterialsContext";
import { isArchivedWorkspace, getSystemFolderDisplayName } from "../utils/permissions";
import type { FileType } from "../types";

const MaterialsExplorer: React.FC = () => {
  const {
    role,
    currentWorkspace,
    navigation,
    folders,
    files,
    assignments,
    viewMode,
    sortField,
    searchQuery,
    typeFilter,
    permissions,
    currentArea,
    previewFile,
    activeAssignment,
    setViewMode,
    setSortField,
    setSearchQuery,
    setTypeFilter,
    openFolder,
    goBack,
    openPreview,
    closePreview,
    openAssignment,
    closeAssignment,
    createFolder,
    uploadFile,
    renameFolder,
    renameFile,
    replaceFile,
    deleteFolder,
    deleteFile,
  } = useMaterials();

  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    kind: "folder" | "file";
    id: string;
    name: string;
  } | null>(null);

  const items = useMemo((): ExplorerItem[] => {
    if (!currentWorkspace) return [];

    const wsId = currentWorkspace.id;
    const folderId = navigation.folderId;
    const q = searchQuery.trim().toLowerCase();

    let childFolders: typeof folders = [];
    let folderFiles: typeof files = [];
    let folderAssignments: typeof assignments = [];

    if (!folderId) {
      if (currentWorkspace.status === "guest") {
        childFolders = folders.filter(
          (f) => f.workspaceId === wsId && f.parentId === null
        );
      } else {
        childFolders = folders.filter(
          (f) => f.workspaceId === wsId && f.parentId === null && f.isSystem
        );
      }
    } else {
      childFolders = folders.filter(
        (f) => f.workspaceId === wsId && f.parentId === folderId
      );
      folderFiles = files.filter(
        (f) => f.workspaceId === wsId && f.parentId === folderId
      );
      const current = folders.find((f) => f.id === folderId);
      if (current?.systemKind === "submissions" && role === "student") {
        folderAssignments = assignments.filter((a) => a.workspaceId === wsId);
      } else if (current?.systemKind === "submissions" && role === "tutor") {
        folderAssignments = assignments.filter((a) => a.workspaceId === wsId);
      }
    }

    const result: ExplorerItem[] = [
      ...childFolders.map((f) => ({ kind: "folder" as const, data: f })),
      ...folderFiles.map((f) => ({ kind: "file" as const, data: f })),
      ...folderAssignments.map((a) => ({ kind: "assignment" as const, data: a })),
    ];

    return result.filter((item) => {
      const name =
        item.kind === "assignment" ? item.data.title : item.data.name;
      if (q && !name.toLowerCase().includes(q)) return false;
      if (typeFilter !== "all" && item.kind === "file" && item.data.fileType !== typeFilter) {
        return false;
      }
      return true;
    });
  }, [
    currentWorkspace,
    navigation.folderId,
    folders,
    files,
    assignments,
    searchQuery,
    typeFilter,
    role,
  ]);

  const sortedItems = useMemo(() => {
    const getSortKey = (item: ExplorerItem) => {
      if (sortField === "name") {
        return item.kind === "assignment" ? item.data.title : item.data.name;
      }
      if (sortField === "date") {
        if (item.kind === "file") return item.data.lastModified;
        if (item.kind === "folder") return item.data.lastUpdated;
        return item.data.publishedAt;
      }
      if (item.kind === "file") return item.data.fileType;
      if (item.kind === "assignment") return "assignment";
      return "folder";
    };

    return [...items].sort((a, b) => {
      const folderBoost =
        (a.kind === "folder" ? 0 : 1) - (b.kind === "folder" ? 0 : 1);
      if (folderBoost !== 0) return folderBoost;
      const ka = getSortKey(a);
      const kb = getSortKey(b);
      if (sortField === "date") return kb.localeCompare(ka);
      return ka.localeCompare(kb, "it");
    });
  }, [items, sortField]);

  if (!currentWorkspace) return null;

  const archived = isArchivedWorkspace(currentWorkspace);
  const showSubmissionsNotice =
    currentArea === "submissions" && !archived && currentWorkspace.status !== "guest";

  const handleOpen = (item: ExplorerItem) => {
    if (item.kind === "folder") openFolder(item.data.id);
    else if (item.kind === "file") openPreview(item.data);
    else openAssignment(item.data);
  };

  const emptyMessage = (() => {
    if (!navigation.folderId) {
      return "Seleziona una cartella di sistema per iniziare.";
    }
    if (role === "tutor" && currentArea === "submissions") {
      return "Nessuno svolgimento caricato dagli studenti.";
    }
    if (role === "tutor" && currentArea === "tutor" && permissions.canUpload) {
      return "Nessun file in questa cartella. Carica un file o crea una sottocartella.";
    }
    return "Nessun elemento in questa cartella.";
  })();

  const getItemDisplayName = (item: ExplorerItem) => {
    if (item.kind === "folder") {
      return getSystemFolderDisplayName(item.data, role);
    }
    if (item.kind === "assignment" && role === "tutor" && item.data.studentFile) {
      return item.data.studentFile.name;
    }
    return item.kind === "assignment" ? item.data.title : item.data.name;
  };

  const getDownloadHandler = (item: ExplorerItem) => {
    if (item.kind === "file" && permissions.canDownload) {
      return () => window.alert(`Download simulato: ${item.data.name}`);
    }
    if (
      item.kind === "assignment" &&
      role === "tutor" &&
      item.data.studentFile
    ) {
      return () =>
        window.alert(`Download simulato: ${item.data.studentFile!.name}`);
    }
    return undefined;
  };

  const toolbarActions =
    permissions.canCreateFolder || permissions.canUpload ? (
      <>
        {permissions.canCreateFolder && navigation.folderId && (
          <button
            type="button"
            onClick={() => setCreateFolderOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:border-blue-200"
          >
            <FolderPlus className="w-4 h-4" /> Nuova cartella
          </button>
        )}
        {permissions.canUpload && navigation.folderId && (
          <button
            type="button"
            onClick={() => setUploadOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-100"
          >
            <Upload className="w-4 h-4" /> Carica file
          </button>
        )}
      </>
    ) : null;

  return (
    <div className="min-w-0 max-w-full">
      <button
        type="button"
        onClick={goBack}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 mb-4"
      >
        <ArrowLeft className="w-4 h-4 shrink-0" /> Indietro
      </button>

      <MaterialsBreadcrumbs />

      {archived && (
        <div className="mb-4">
          <ArchivedWorkspaceNotice />
        </div>
      )}

      {showSubmissionsNotice && navigation.folderId && (
        <div className="mb-4 p-3 rounded-xl bg-violet-50/60 border border-violet-100 text-xs text-violet-800">
          {role === "tutor"
            ? "Svolgimenti degli studenti: area di sola consultazione e download."
            : "Le mie consegne: area privata visibile a te, al tutor assegnato e a Ivan."}
        </div>
      )}

      <MaterialsToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchScope="workspace"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortField={sortField}
        onSortChange={setSortField}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        actions={toolbarActions}
      />

      {viewMode === "list" && sortedItems.length > 0 && (
        <div className="hidden sm:grid sm:grid-cols-[1fr_repeat(4,minmax(0,1fr))_auto] gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          <span>Nome</span>
          <span>Tipo</span>
          <span>Pubblicato da</span>
          <span>Ultima modifica</span>
          <span>Dimensione</span>
          <span>Azioni</span>
        </div>
      )}

      {sortedItems.length === 0 ? (
        <EmptyFolderState message={emptyMessage} />
      ) : viewMode === "list" ? (
        <div className="space-y-2">
          {sortedItems.map((item) => (
            <MaterialItemRow
              key={
                item.kind === "assignment"
                  ? item.data.id
                  : item.data.id
              }
              item={item}
              displayName={getItemDisplayName(item)}
              showStatus={role === "student" && currentArea === "submissions"}
              onOpen={() => handleOpen(item)}
              onDownload={getDownloadHandler(item)}
              onRename={
                item.kind === "folder" &&
                !item.data.isSystem &&
                permissions.canRename
                  ? () => {
                      const n = window.prompt("Nuovo nome", item.data.name);
                      if (n?.trim()) renameFolder(item.data.id, n.trim());
                    }
                  : item.kind === "file" && permissions.canRename
                    ? () => {
                        const n = window.prompt("Nuovo nome", item.data.name);
                        if (n?.trim()) renameFile(item.data.id, n.trim());
                      }
                    : undefined
              }
              onReplace={
                item.kind === "file" && permissions.canReplace
                  ? () => {
                      const n = window.prompt("Nome file sostitutivo", item.data.name);
                      if (n?.trim()) replaceFile(item.data.id, n.trim());
                    }
                  : undefined
              }
              onDelete={
                ((item.kind === "folder" &&
                  !item.data.isSystem &&
                  permissions.canDelete) ||
                  (item.kind === "file" && permissions.canDelete))
                  ? () =>
                      setDeleteTarget({
                        kind: item.kind as "folder" | "file",
                        id: item.data.id,
                        name: item.data.name,
                      })
                  : undefined
              }
            />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedItems.map((item) => (
            <MaterialItemCard
              key={item.kind === "assignment" ? item.data.id : item.data.id}
              item={item}
              onOpen={() => handleOpen(item)}
              onDownload={getDownloadHandler(item)}
              onDelete={
                item.kind === "file" && permissions.canDelete
                  ? () =>
                      setDeleteTarget({
                        kind: "file",
                        id: item.data.id,
                        name: item.data.name,
                      })
                  : undefined
              }
            />
          ))}
        </div>
      )}

      {previewFile && (
        <FilePreviewModal file={previewFile} onClose={closePreview} />
      )}
      {activeAssignment && role === "student" && (
        <AssignmentDetailsModal assignment={activeAssignment} onClose={closeAssignment} />
      )}
      {activeAssignment && role === "tutor" && (
        <TutorAssignmentModal assignment={activeAssignment} onClose={closeAssignment} />
      )}
      <CreateFolderDialog
        open={createFolderOpen}
        onConfirm={(name) => {
          createFolder(name);
          setCreateFolderOpen(false);
        }}
        onCancel={() => setCreateFolderOpen(false)}
      />
      <UploadFileDialog
        open={uploadOpen}
        onUpload={(name, fileType) => uploadFile(name, fileType as FileType)}
        onCancel={() => setUploadOpen(false)}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        title="Elimina elemento"
        message={`Eliminare "${deleteTarget?.name}"? Questa azione è simulata e vale solo per la sessione corrente.`}
        confirmLabel="Elimina"
        onConfirm={() => {
          if (deleteTarget?.kind === "folder") deleteFolder(deleteTarget.id);
          else if (deleteTarget) deleteFile(deleteTarget.id);
          setDeleteTarget(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default MaterialsExplorer;
