import React from "react";
import { MaterialsProvider } from "../../../features/area-personale/materials/context/MaterialsContext";
import MaterialsShellPage from "../../../features/area-personale/materials/components/MaterialsShellPage";

const StudenteMateriali: React.FC = () => {
  return (
    <MaterialsProvider role="student">
      <MaterialsShellPage />
    </MaterialsProvider>
  );
};

export default StudenteMateriali;
