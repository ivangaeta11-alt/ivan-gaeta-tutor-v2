import React from "react";
import { LayoutGrid, List, Search } from "lucide-react";
import type { FileType, MaterialsSortField, MaterialsViewMode } from "../types";
import { FILE_TYPE_LABELS } from "../types";

interface MaterialsToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  searchScope: "global" | "workspace";
  viewMode: MaterialsViewMode;
  onViewModeChange: (mode: MaterialsViewMode) => void;
  sortField: MaterialsSortField;
  onSortChange: (field: MaterialsSortField) => void;
  typeFilter: FileType | "all";
  onTypeFilterChange: (t: FileType | "all") => void;
  showTypeFilter?: boolean;
  actions?: React.ReactNode;
}

const MaterialsToolbar: React.FC<MaterialsToolbarProps> = ({
  searchQuery,
  onSearchChange,
  searchScope,
  viewMode,
  onViewModeChange,
  sortField,
  onSortChange,
  typeFilter,
  onTypeFilterChange,
  showTypeFilter = true,
  actions,
}) => (
  <div className="mb-6 space-y-3 min-w-0">
    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
      <div className="relative flex-1 min-w-0">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          aria-hidden
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={
            searchScope === "global"
              ? "Cerca in tutti i workspace..."
              : "Cerca in questa cartella..."
          }
          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 shrink-0">
        <select
          value={sortField}
          onChange={(e) => onSortChange(e.target.value as MaterialsSortField)}
          className="px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white text-slate-700"
          aria-label="Ordinamento"
        >
          <option value="name">Ordina per nome</option>
          <option value="date">Ordina per data</option>
          <option value="type">Ordina per tipo</option>
        </select>
        <div className="flex rounded-xl border border-slate-200 overflow-hidden">
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={`p-2 ${viewMode === "list" ? "bg-blue-50 text-blue-700" : "bg-white text-slate-500"}`}
            aria-label="Vista elenco"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            className={`p-2 ${viewMode === "grid" ? "bg-blue-50 text-blue-700" : "bg-white text-slate-500"}`}
            aria-label="Vista griglia"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-slate-400">
        {searchScope === "global"
          ? "Ricerca globale su tutti i workspace accessibili"
          : "Ricerca limitata al workspace corrente"}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {showTypeFilter && (
          <select
            value={typeFilter}
            onChange={(e) =>
              onTypeFilterChange(e.target.value as FileType | "all")
            }
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-600"
            aria-label="Filtra per tipo"
          >
            <option value="all">Tutti i tipi</option>
            {(Object.keys(FILE_TYPE_LABELS) as FileType[]).map((t) => (
              <option key={t} value={t}>
                {FILE_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        )}
        {actions}
      </div>
    </div>
  </div>
);

export default MaterialsToolbar;
