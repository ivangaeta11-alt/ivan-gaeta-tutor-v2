import React from "react";
import {
  FileText,
  File,
  Film,
  Image as ImageIcon,
  Folder,
  ClipboardList,
} from "lucide-react";
import type { FileType, MaterialItemKind } from "../types";

interface MaterialTypeIconProps {
  kind: MaterialItemKind | "assignment";
  fileType?: FileType;
  className?: string;
}

const MaterialTypeIcon: React.FC<MaterialTypeIconProps> = ({
  kind,
  fileType,
  className = "w-5 h-5",
}) => {
  if (kind === "folder") {
    return <Folder className={`${className} text-amber-500`} aria-hidden />;
  }
  if (kind === "assignment") {
    return <ClipboardList className={`${className} text-violet-600`} aria-hidden />;
  }
  switch (fileType) {
    case "pdf":
    case "exercise_sheet":
      return <FileText className={`${className} text-red-500`} aria-hidden />;
    case "video":
      return <Film className={`${className} text-blue-500`} aria-hidden />;
    case "image":
      return <ImageIcon className={`${className} text-emerald-500`} aria-hidden />;
    default:
      return <File className={`${className} text-slate-500`} aria-hidden />;
  }
};

export default MaterialTypeIcon;
