import React from "react";
import PageHeader from "../../components/PageHeader";
import MaterialsToolbar from "./MaterialsToolbar";
import WorkspaceCard from "./WorkspaceCard";
import MaterialTypeIcon from "./MaterialTypeIcon";
import MaterialStatusBadge from "./MaterialStatusBadge";
import { useMaterials } from "../context/MaterialsContext";
import { formatDateShort } from "../../utils/format";
import { FILE_TYPE_LABELS } from "../types";

const MaterialsHome: React.FC = () => {
  const {
    activeWorkspaces,
    archivedWorkspaces,
    guestWorkspaces,
    recentEntries,
    assignments,
    viewMode,
    sortField,
    searchQuery,
    typeFilter,
    folders,
    setViewMode,
    setSortField,
    setSearchQuery,
    setTypeFilter,
    openWorkspace,
    openRecent,
    openAssignment,
    globalSearchResults,
    navigateToLocation,
  } = useMaterials();

  const pendingAssignments = assignments.filter(
    (a) => a.status === "da_consegnare" || a.status === "da_correggere"
  );

  const hasGlobalSearch = searchQuery.trim().length > 0;

  return (
    <div className="min-w-0 max-w-full">
      <PageHeader
        title="Materiali"
        description="Archivio didattico: dispense, registrazioni, consegne e materiali del tutor organizzati per gruppo e percorso."
      />

      <MaterialsToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchScope="global"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortField={sortField}
        onSortChange={setSortField}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        showTypeFilter={false}
      />

      {hasGlobalSearch ? (
        <section className="mb-10 min-w-0">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Risultati ricerca</h2>
          <div className="space-y-2">
            {globalSearchResults.files.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => navigateToLocation(f.workspaceId, f.parentId)}
                className="w-full text-left p-4 bg-white rounded-2xl border border-slate-100 flex items-center gap-3 min-w-0"
              >
                <MaterialTypeIcon kind="file" fileType={f.fileType} />
                <div className="min-w-0">
                  <p className="font-medium text-slate-900 break-words">{f.name}</p>
                  <p className="text-xs text-slate-400">{FILE_TYPE_LABELS[f.fileType]}</p>
                </div>
              </button>
            ))}
            {globalSearchResults.assignments.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => openWorkspace(a.workspaceId)}
                className="w-full text-left p-4 bg-white rounded-2xl border border-slate-100 flex items-center gap-3"
              >
                <MaterialTypeIcon kind="assignment" />
                <div>
                  <p className="font-medium text-slate-900">{a.title}</p>
                  <MaterialStatusBadge status={a.status} />
                </div>
              </button>
            ))}
            {globalSearchResults.files.length === 0 &&
              globalSearchResults.folders.length === 0 &&
              globalSearchResults.assignments.length === 0 && (
                <p className="text-sm text-slate-400">Nessun risultato.</p>
              )}
          </div>
        </section>
      ) : (
        <>
          <section className="mb-10 min-w-0">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Aggiunti di recente</h2>
            <div className="space-y-3">
              {recentEntries.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => openRecent(entry)}
                  className="w-full text-left p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-colors min-w-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-slate-900 break-words">{entry.name}</p>
                        {entry.isNew && (
                          <span className="px-1.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                            Nuovo
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {entry.workspaceName} · {entry.folderPath}
                      </p>
                      <p className="text-xs text-slate-400">
                        {entry.author} · {formatDateShort(entry.date)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {pendingAssignments.length > 0 && (
            <section className="mb-10 min-w-0">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Consegne da completare</h2>
              <div className="space-y-3">
                {pendingAssignments.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => {
                      const sub = folders.find(
                        (f) => f.workspaceId === a.workspaceId && f.systemKind === "submissions"
                      );
                      if (sub) navigateToLocation(a.workspaceId, sub.id);
                      else openWorkspace(a.workspaceId);
                      openAssignment(a);
                    }}
                    className="w-full text-left p-4 bg-white rounded-2xl border border-amber-100 min-w-0"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium text-slate-900">{a.title}</p>
                      <MaterialStatusBadge status={a.status} />
                    </div>
                    {a.dueDate && (
                      <p className="text-xs text-slate-400 mt-1">
                        Scadenza: {formatDateShort(a.dueDate)}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="mb-10 min-w-0">
            <h2 className="text-lg font-bold text-slate-900 mb-4">I miei spazi attivi</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {activeWorkspaces.map((ws) => (
                <WorkspaceCard
                  key={ws.id}
                  workspace={ws}
                  onOpen={() => openWorkspace(ws.id)}
                />
              ))}
            </div>
          </section>

          <section className="mb-10 min-w-0">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Archivio</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {archivedWorkspaces.map((ws) => (
                <WorkspaceCard
                  key={ws.id}
                  workspace={ws}
                  onOpen={() => openWorkspace(ws.id)}
                />
              ))}
            </div>
          </section>

          {guestWorkspaces.length > 0 && (
            <section className="min-w-0">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Accesso limitato (guest)</h2>
              <p className="text-xs text-slate-400 mb-4">
                Workspace di prova con soli file condivisi esplicitamente.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {guestWorkspaces.map((ws) => (
                  <WorkspaceCard
                    key={ws.id}
                    workspace={ws}
                    onOpen={() => openWorkspace(ws.id)}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default MaterialsHome;
