import React from "react";
import type { MaterialAssignment, MaterialFile, MaterialFolder } from "../types";
import MaterialTypeIcon from "./MaterialTypeIcon";
import MaterialStatusBadge from "./MaterialStatusBadge";
import { FILE_TYPE_LABELS } from "../types";
import { formatDateShort } from "../../utils/format";

export type ExplorerItem =
  | { kind: "folder"; data: MaterialFolder }
  | { kind: "file"; data: MaterialFile }
  | { kind: "assignment"; data: MaterialAssignment };

interface MaterialItemRowProps {
  item: ExplorerItem;
  showStatus?: boolean;
  onOpen: () => void;
  onDownload?: () => void;
  onRename?: () => void;
  onReplace?: () => void;
  onDelete?: () => void;
}

const MaterialItemRow: React.FC<MaterialItemRowProps> = ({
  item,
  showStatus,
  onOpen,
  onDownload,
  onRename,
  onReplace,
  onDelete,
}) => {
  const name =
    item.kind === "assignment" ? item.data.title : item.data.name;
  const modified =
    item.kind === "folder"
      ? item.data.lastUpdated
      : item.kind === "file"
        ? item.data.lastModified
        : item.data.publishedAt;
  const author =
    item.kind === "file"
      ? item.data.publishedBy
      : item.kind === "assignment"
        ? item.data.tutorName
        : "—";
  const size = item.kind === "file" ? item.data.sizeLabel : "—";
  const typeLabel =
    item.kind === "folder"
      ? "Cartella"
      : item.kind === "assignment"
        ? "Consegna"
        : FILE_TYPE_LABELS[item.data.fileType];
  const isNew = item.kind === "file" && item.data.isNew;

  const hasActions = onDownload || onRename || onReplace || onDelete;

  return (
    <div className="p-4 bg-white rounded-2xl border border-slate-100 min-w-0 sm:flex sm:items-center sm:gap-4">
      <button
        type="button"
        onClick={onOpen}
        className="flex items-start gap-3 flex-1 min-w-0 text-left mb-3 sm:mb-0"
      >
        <MaterialTypeIcon
          kind={item.kind === "assignment" ? "assignment" : item.kind}
          fileType={item.kind === "file" ? item.data.fileType : undefined}
          className="w-5 h-5 shrink-0 mt-0.5"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-slate-900 break-words">{name}</span>
            {isNew && (
              <span className="px-1.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                Nuovo
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs text-slate-400 sm:hidden">
            <span>{typeLabel}</span>
            <span>{formatDateShort(modified)}</span>
            {showStatus && item.kind === "assignment" && (
              <MaterialStatusBadge status={item.data.status} />
            )}
          </div>
        </div>
      </button>

      <div className="hidden sm:grid sm:grid-cols-4 sm:gap-2 sm:flex-1 text-sm text-slate-500 min-w-0">
        <span className="truncate">{typeLabel}</span>
        <span className="truncate">{author}</span>
        <span>{formatDateShort(modified)}</span>
        <span>{size}</span>
      </div>

      {showStatus && item.kind === "assignment" && (
        <div className="hidden sm:block shrink-0">
          <MaterialStatusBadge status={item.data.status} />
        </div>
      )}

      {hasActions && (
        <div className="flex flex-wrap gap-2 shrink-0">
          {onDownload && (
            <button
              type="button"
              onClick={onDownload}
              className="px-2 py-1 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:border-blue-200"
            >
              Scarica
            </button>
          )}
          {onRename && (
            <button
              type="button"
              onClick={onRename}
              className="px-2 py-1 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600"
            >
              Rinomina
            </button>
          )}
          {onReplace && (
            <button
              type="button"
              onClick={onReplace}
              className="px-2 py-1 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600"
            >
              Sostituisci
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="px-2 py-1 text-xs font-semibold rounded-lg border border-red-100 text-red-600"
            >
              Elimina
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MaterialItemRow;
