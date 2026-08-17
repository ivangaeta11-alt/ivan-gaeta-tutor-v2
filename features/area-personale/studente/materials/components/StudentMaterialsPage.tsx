import React from "react";
import { useMaterials } from "../context/MaterialsContext";
import MaterialsHome from "./MaterialsHome";
import MaterialsExplorer from "./MaterialsExplorer";

const StudentMaterialsPage: React.FC = () => {
  const { navigation } = useMaterials();

  if (navigation.workspaceId) {
    return <MaterialsExplorer />;
  }

  return <MaterialsHome />;
};

export default StudentMaterialsPage;
