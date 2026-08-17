import React, { useState } from "react";

interface CreateFolderDialogProps {
  open: boolean;
  onConfirm: (name: string) => void;
  onCancel: () => void;
}

const CreateFolderDialog: React.FC<CreateFolderDialogProps> = ({
  open,
  onConfirm,
  onCancel,
}) => {
  const [name, setName] = useState("");

  if (!open) return null;

  const handleConfirm = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onConfirm(trimmed);
    setName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
      <div className="w-full max-w-sm p-6 bg-white rounded-3xl border border-slate-100 shadow-xl">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Nuova cartella</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome cartella"
          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 mb-4"
          autoFocus
        />
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => {
              setName("");
              onCancel();
            }}
            className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600"
          >
            Annulla
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white"
          >
            Crea
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderDialog;
