import React, { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "../../studente/components/PageHeader";
import MaterialsToolbar from "./MaterialsToolbar";
import WorkspaceCard from "./WorkspaceCard";
import MaterialStatusBadge from "./MaterialStatusBadge";
import CreateAssignmentDialog from "./CreateAssignmentDialog";
import TutorAssignmentModal from "./TutorAssignmentModal";
import { useMaterials } from "../context/MaterialsContext";
import { getWorkspaceById } from "../data/materialsMock";
import { formatDateShort } from "../../studente/utils/format";

const TutorMaterialsHome: React.FC = () => {
  const {
    activeWorkspaces,
    archivedWorkspaces,
    assignments,
    activeAssignment,
    viewMode,
    sortField,
    searchQuery,
    setViewMode,
    setSortField,
    setSearchQuery,
    openWorkspace,
    openAssignment,
    closeAssignment,
    createAssignment,
    globalSearchResults,
    navigateToLocation,
  } = useMaterials();

  const [createOpen, setCreateOpen] = useState(false);
  const hasGlobalSearch = searchQuery.trim().length > 0;

  const tutorAssignments = useMemo(
    () =>
      [...assignments]
        .filter((a) => {
          const ws = getWorkspaceById(a.workspaceId);
          return ws && ws.type !== "guest";
        })
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    [assignments]
  );

  const pendingReview = tutorAssignments.filter(
    (a) => a.status === "da_correggere" || a.status === "consegnata"
  );

  return (
    <div className="min-w-0 max-w-full">
      <PageHeader
        title="Materiali"
        description="Archivio condiviso con i tuoi studenti e gruppi: dispense, registrazioni e svolgimenti."
      />

      <MaterialsToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchScope="global"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortField={sortField}
        onSortChange={setSortField}
        typeFilter="all"
        onTypeFilterChange={() => {}}
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
                <p className="font-medium text-slate-900 break-words">{f.name}</p>
              </button>
            ))}
            {globalSearchResults.assignments.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => openAssignment(a)}
                className="w-full text-left p-4 bg-white rounded-2xl border border-slate-100 min-w-0"
              >
                <p className="font-medium text-slate-900">{a.title}</p>
                <MaterialStatusBadge status={a.status} />
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
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 className="text-lg font-bold text-slate-900">Consegne</h2>
              <button
                type="button"
                onClick={() => setCreateOpen(true)}
                disabled={activeWorkspaces.length === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" /> Nuova consegna
              </button>
            </div>

            {pendingReview.length > 0 && (
              <div className="mb-4 p-3 rounded-xl bg-amber-50/60 border border-amber-100 text-xs text-amber-800">
                {pendingReview.length} consegne in attesa di revisione o appena inviate dagli
                studenti.
              </div>
            )}

            {tutorAssignments.length === 0 ? (
              <p className="text-sm text-slate-400 font-light">
                Nessuna consegna pubblicata. Crea la prima consegna per assegnare compiti agli
                studenti.
              </p>
            ) : (
              <div className="space-y-3">
                {tutorAssignments.map((a) => {
                  const ws = getWorkspaceById(a.workspaceId);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => openAssignment(a)}
                      className="w-full text-left p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-colors min-w-0"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <p className="font-semibold text-slate-900 break-words">{a.title}</p>
                        <MaterialStatusBadge status={a.status} />
                      </div>
                      <p className="text-xs text-slate-400">
                        {ws?.name ?? a.subject}
                        {a.dueDate && ` · Scadenza ${formatDateShort(a.dueDate)}`}
                        {" · "}
                        Pubblicata {formatDateShort(a.publishedAt)}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {activeWorkspaces.length === 0 && archivedWorkspaces.length === 0 ? (
            <div className="py-12 text-center min-w-0">
              <p className="text-sm text-slate-400 font-light">
                Nessun workspace didattico assegnato al momento.
              </p>
            </div>
          ) : (
            <>
              {activeWorkspaces.length > 0 && (
                <section className="mb-10 min-w-0">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Spazi attivi</h2>
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
              )}

              {archivedWorkspaces.length > 0 && (
                <section className="min-w-0">
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
              )}
            </>
          )}
        </>
      )}

      <CreateAssignmentDialog
        open={createOpen}
        workspaces={activeWorkspaces}
        onConfirm={(input) => {
          createAssignment(input);
          setCreateOpen(false);
        }}
        onCancel={() => setCreateOpen(false)}
      />

      {activeAssignment && (
        <TutorAssignmentModal assignment={activeAssignment} onClose={closeAssignment} />
      )}
    </div>
  );
};

export default TutorMaterialsHome;
