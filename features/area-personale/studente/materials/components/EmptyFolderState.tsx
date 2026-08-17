import React from "react";
import { FolderOpen } from "lucide-react";

interface EmptyFolderStateProps {
  message?: string;
}

const EmptyFolderState: React.FC<EmptyFolderStateProps> = ({
  message = "Questa cartella è vuota.",
}) => (
  <div className="py-12 text-center min-w-0">
    <FolderOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" aria-hidden />
    <p className="text-sm text-slate-400 font-light">{message}</p>
  </div>
);

export default EmptyFolderState;
