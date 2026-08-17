import React from "react";
import { useMaterials } from "../context/MaterialsContext";
import MaterialsExplorer from "./MaterialsExplorer";
import type { MaterialsRole } from "../types";
import MaterialsHome from "./MaterialsHome";
import TutorMaterialsHome from "./TutorMaterialsHome";

const HOME_BY_ROLE: Record<MaterialsRole, React.ComponentType> = {
  student: MaterialsHome,
  tutor: TutorMaterialsHome,
};

const MaterialsShellPage: React.FC = () => {
  const { navigation, role } = useMaterials();
  const Home = HOME_BY_ROLE[role];

  if (navigation.workspaceId) {
    return <MaterialsExplorer />;
  }

  return <Home />;
};

export default MaterialsShellPage;
