import React from "react";
import { MaterialsProvider } from "../../../features/area-personale/materials/context/MaterialsContext";
import MaterialsShellPage from "../../../features/area-personale/materials/components/MaterialsShellPage";

const TutorMateriali: React.FC = () => {
  return (
    <MaterialsProvider role="tutor">
      <MaterialsShellPage />
    </MaterialsProvider>
  );
};

export default TutorMateriali;
