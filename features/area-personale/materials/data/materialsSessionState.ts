import type { MaterialFile, MaterialFolder } from "../types";
import { MOCK_MATERIAL_FILES, MOCK_MATERIAL_FOLDERS } from "./materialsMock";

/** Stato demo condiviso tra dashboard studente e tutor (stesso archivio). */
export const materialsSessionState = {
  folders: [...MOCK_MATERIAL_FOLDERS] as MaterialFolder[],
  files: [...MOCK_MATERIAL_FILES] as MaterialFile[],
};
