import React from "react";
import PageHeader from "../../studente/components/PageHeader";
import MaterialsToolbar from "./MaterialsToolbar";
import WorkspaceCard from "./WorkspaceCard";
import { useMaterials } from "../context/MaterialsContext";

const TutorMaterialsHome: React.FC = () => {
  const {
    activeWorkspaces,
    archivedWorkspaces,
    viewMode,
    sortField,
    searchQuery,
    setViewMode,
    setSortField,
    setSearchQuery,
    openWorkspace,
    globalSearchResults,
    navigateToLocation,
  } = useMaterials();

  const hasGlobalSearch = searchQuery.trim().length > 0;

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
            {globalSearchResults.files.length === 0 &&
              globalSearchResults.folders.length === 0 && (
                <p className="text-sm text-slate-400">Nessun risultato.</p>
              )}
          </div>
        </section>
      ) : (
        <>
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
    </div>
  );
};

export default TutorMaterialsHome;
