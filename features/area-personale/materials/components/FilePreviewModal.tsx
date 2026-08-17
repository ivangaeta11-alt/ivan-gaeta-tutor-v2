import React from "react";
import { Download, Play } from "lucide-react";
import type { MaterialFile } from "../types";
import { FILE_TYPE_LABELS } from "../types";
import MaterialTypeIcon from "./MaterialTypeIcon";
import { formatDateShort } from "../../studente/utils/format";
import { useMaterials } from "../context/MaterialsContext";

interface FilePreviewModalProps {
  file: MaterialFile;
  onClose: () => void;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ file, onClose }) => {
  const { folders, currentWorkspace } = useMaterials();

  const path = (() => {
    const segments: string[] = [];
    let cur = folders.find((f) => f.id === file.parentId);
    while (cur) {
      segments.unshift(cur.name);
      cur = cur.parentId ? folders.find((f) => f.id === cur!.parentId) : undefined;
    }
    return segments.join(" / ");
  })();

  const handleDownload = () => {
    window.alert(`Download simulato: ${file.name}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/40">
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 bg-white rounded-3xl border border-slate-100 shadow-xl min-w-0"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start gap-3 mb-4 min-w-0">
          <MaterialTypeIcon kind="file" fileType={file.fileType} className="w-8 h-8 shrink-0" />
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900 break-words">{file.name}</h2>
            <p className="text-sm text-slate-500">{FILE_TYPE_LABELS[file.fileType]}</p>
          </div>
        </div>

        <div className="mb-4 p-8 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-center min-h-[120px]">
          {file.fileType === "video" ? (
            <>
              <p className="text-sm font-medium text-slate-700 mb-2">{file.name}</p>
              <p className="text-xs text-slate-400 mb-3">
                {formatDateShort(file.lastModified)} · {file.sizeLabel}
              </p>
              <button
                type="button"
                onClick={() => window.alert("Riproduzione simulata (demo)")}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white"
              >
                <Play className="w-4 h-4" /> Play simulato
              </button>
            </>
          ) : (
            <p className="text-sm text-slate-400 font-light">
              Anteprima simulata per {FILE_TYPE_LABELS[file.fileType]}
            </p>
          )}
        </div>

        <dl className="text-sm space-y-2 mb-6">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Dimensione</dt>
            <dd className="text-slate-800">{file.sizeLabel}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Ultima modifica</dt>
            <dd className="text-slate-800">{formatDateShort(file.lastModified)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Autore</dt>
            <dd className="text-slate-800">{file.author}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Percorso</dt>
            <dd className="text-slate-800 text-right break-words">
              {currentWorkspace?.name} / {path}
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600"
          >
            Chiudi
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white"
          >
            <Download className="w-4 h-4" /> Scarica (demo)
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal;
