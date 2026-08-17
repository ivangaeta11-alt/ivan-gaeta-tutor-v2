import React from "react";
import { Archive, FolderOpen, Lock, Users, User } from "lucide-react";
import type { MaterialWorkspace } from "../types";
import { WORKSPACE_TYPE_LABELS } from "../types";
import { formatDateShort } from "../../utils/format";

interface WorkspaceCardProps {
  workspace: MaterialWorkspace;
  onOpen: () => void;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ workspace, onOpen }) => {
  const TypeIcon =
    workspace.type === "group" ? Users : workspace.type === "individual" ? User : FolderOpen;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full text-left p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all min-w-0"
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
          <TypeIcon className="w-5 h-5 text-amber-600" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-bold text-slate-900 break-words">{workspace.name}</h3>
            {workspace.newContentCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                {workspace.newContentCount} nuovi
              </span>
            )}
            {workspace.isArchived && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                <Archive className="w-3 h-3" /> Archiviato
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500">
            {workspace.subject} · {WORKSPACE_TYPE_LABELS[workspace.type]}
            {workspace.effectiveMembers != null && ` · ${workspace.effectiveMembers} membri`}
          </p>
          <p className="text-xs text-slate-400 mt-1">Tutor: {workspace.tutorName}</p>
          <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-400">
            <span>{workspace.fileCount} file</span>
            <span>Agg. {formatDateShort(workspace.lastUpdated)}</span>
            {workspace.isArchived && (
              <span className="inline-flex items-center gap-1 text-slate-500">
                <Lock className="w-3 h-3" /> Sola lettura
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default WorkspaceCard;
