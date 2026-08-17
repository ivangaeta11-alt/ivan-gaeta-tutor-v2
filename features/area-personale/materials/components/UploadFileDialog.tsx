import React, { useRef } from "react";
import { Upload } from "lucide-react";
import type { FileType } from "../types";

interface UploadFileDialogProps {
  open: boolean;
  onUpload: (name: string, fileType: FileType) => void;
  onCancel: () => void;
}

function guessFileType(filename: string): FileType {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".pdf")) return "pdf";
  if (/\.(mp4|webm|mov)$/.test(lower)) return "video";
  if (/\.(jpg|jpeg|png|gif|webp)$/.test(lower)) return "image";
  if (/eserciz|exercise|compiti/.test(lower)) return "exercise_sheet";
  return "document";
}

const UploadFileDialog: React.FC<UploadFileDialogProps> = ({
  open,
  onUpload,
  onCancel,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUpload(file.name, guessFileType(file.name));
    e.target.value = "";
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
      <div className="w-full max-w-sm p-6 bg-white rounded-3xl border border-slate-100 shadow-xl text-center">
        <Upload className="w-10 h-10 text-blue-600 mx-auto mb-3" aria-hidden />
        <h2 className="text-lg font-bold text-slate-900 mb-2">Carica file</h2>
        <p className="text-sm text-slate-500 font-light mb-4">
          Il file non viene salvato: vengono conservati solo i metadati per la sessione demo.
        </p>
        <input ref={inputRef} type="file" className="hidden" onChange={handleChange} />
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600"
          >
            Annulla
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white"
          >
            Scegli file
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadFileDialog;
