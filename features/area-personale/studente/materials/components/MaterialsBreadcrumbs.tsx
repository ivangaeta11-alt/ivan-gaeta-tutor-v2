import React from "react";
import { ChevronRight } from "lucide-react";
import { useMaterials } from "../context/MaterialsContext";

const MaterialsBreadcrumbs: React.FC = () => {
  const { currentWorkspace, breadcrumb, goHome, openFolder, openWorkspace } = useMaterials();

  if (!currentWorkspace) return null;

  return (
    <nav
      aria-label="Percorso cartelle"
      className="flex flex-wrap items-center gap-1 text-sm text-slate-500 min-w-0 mb-4"
    >
      <button
        type="button"
        onClick={goHome}
        className="font-semibold text-blue-600 hover:text-blue-700 shrink-0"
      >
        Materiali
      </button>
      <ChevronRight className="w-4 h-4 shrink-0 text-slate-300" aria-hidden />
      <button
        type="button"
        onClick={() => openWorkspace(currentWorkspace.id)}
        className="font-medium text-slate-700 hover:text-blue-600 truncate max-w-[140px] sm:max-w-none"
      >
        {currentWorkspace.name}
      </button>
      {breadcrumb.map((folder) => (
        <React.Fragment key={folder.id}>
          <ChevronRight className="w-4 h-4 shrink-0 text-slate-300" aria-hidden />
          <button
            type="button"
            onClick={() => openFolder(folder.id)}
            className="font-medium text-slate-700 hover:text-blue-600 truncate max-w-[120px] sm:max-w-none"
          >
            {folder.name}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default MaterialsBreadcrumbs;
