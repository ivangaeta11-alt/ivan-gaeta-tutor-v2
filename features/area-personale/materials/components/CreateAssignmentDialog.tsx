import React, { useState } from "react";
import { Plus } from "lucide-react";
import type { MaterialWorkspace } from "../types";
import type { CreateAssignmentInput } from "../data/materialsSessionState";

interface CreateAssignmentDialogProps {
  open: boolean;
  workspaces: MaterialWorkspace[];
  onConfirm: (input: CreateAssignmentInput) => void;
  onCancel: () => void;
}

const CreateAssignmentDialog: React.FC<CreateAssignmentDialogProps> = ({
  open,
  workspaces,
  onConfirm,
  onCancel,
}) => {
  const [workspaceId, setWorkspaceId] = useState(workspaces[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [attachmentName, setAttachmentName] = useState("");

  if (!open) return null;

  const assignable = workspaces.filter((w) => !w.isArchived && w.status !== "guest");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceId || !title.trim() || !instructions.trim()) return;
    onConfirm({
      workspaceId,
      title: title.trim(),
      instructions: instructions.trim(),
      dueDate: dueDate || undefined,
      attachmentName: attachmentName.trim() || undefined,
    });
    setTitle("");
    setInstructions("");
    setDueDate("");
    setAttachmentName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/40">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 bg-white rounded-3xl border border-slate-100 shadow-xl min-w-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-assignment-title"
      >
        <h2 id="create-assignment-title" className="text-lg font-bold text-slate-900 mb-1">
          Nuova consegna
        </h2>
        <p className="text-sm text-slate-500 mb-5 font-light">
          Assegna un compito agli studenti del workspace selezionato. Visibile nella sezione
          consegne della dashboard studente.
        </p>

        <label className="block mb-4">
          <span className="text-xs font-semibold text-slate-600">Workspace</span>
          <select
            value={workspaceId}
            onChange={(e) => setWorkspaceId(e.target.value)}
            className="mt-1 w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white"
            required
          >
            {assignable.map((ws) => (
              <option key={ws.id} value={ws.id}>
                {ws.name} · {ws.subject}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-4">
          <span className="text-xs font-semibold text-slate-600">Titolo</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
            placeholder="Es. Esercizi di cinematica"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-xs font-semibold text-slate-600">Istruzioni</span>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={4}
            className="mt-1 w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
            placeholder="Descrivi cosa devono consegnare gli studenti..."
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-xs font-semibold text-slate-600">Scadenza (opzionale)</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
          />
        </label>

        <label className="block mb-6">
          <span className="text-xs font-semibold text-slate-600">
            Allegato (nome file demo, opzionale)
          </span>
          <input
            type="text"
            value={attachmentName}
            onChange={(e) => setAttachmentName(e.target.value)}
            className="mt-1 w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
            placeholder="Es. Foglio esercizi.pdf"
          />
        </label>

        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600"
          >
            Annulla
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> Pubblica consegna
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignmentDialog;
