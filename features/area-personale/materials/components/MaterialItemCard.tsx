import React from "react";
import type { ExplorerItem } from "./MaterialItemRow";
import MaterialTypeIcon from "./MaterialTypeIcon";
import MaterialStatusBadge from "./MaterialStatusBadge";
import { formatDateShort } from "../../studente/utils/format";

interface MaterialItemCardProps {
  item: ExplorerItem;
  onOpen: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
}

const MaterialItemCard: React.FC<MaterialItemCardProps> = ({
  item,
  onOpen,
  onDownload,
  onDelete,
}) => {
  const name =
    item.kind === "assignment" ? item.data.title : item.data.name;
  const date =
    item.kind === "folder"
      ? item.data.lastUpdated
      : item.kind === "file"
        ? item.data.lastModified
        : item.data.publishedAt;
  const isNew = item.kind === "file" && item.data.isNew;

  return (
    <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm min-w-0 flex flex-col">
      <button type="button" onClick={onOpen} className="text-left flex-1 min-w-0">
        <MaterialTypeIcon
          kind={item.kind === "assignment" ? "assignment" : item.kind}
          fileType={item.kind === "file" ? item.data.fileType : undefined}
          className="w-8 h-8 mb-3"
        />
        <p className="font-semibold text-slate-900 break-words line-clamp-2">{name}</p>
        <p className="text-xs text-slate-400 mt-1">{formatDateShort(date)}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {isNew && (
            <span className="px-1.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
              Nuovo
            </span>
          )}
          {item.kind === "assignment" && (
            <MaterialStatusBadge status={item.data.status} />
          )}
        </div>
      </button>
      {(onDownload || onDelete) && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-slate-50">
          {onDownload && (
            <button
              type="button"
              onClick={onDownload}
              className="text-xs font-semibold text-blue-600"
            >
              Scarica
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="text-xs font-semibold text-red-600"
            >
              Elimina
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MaterialItemCard;
