import React from "react";
import { MaterialsProvider } from "../../../features/area-personale/studente/materials/context/MaterialsContext";
import StudentMaterialsPage from "../../../features/area-personale/studente/materials/components/StudentMaterialsPage";

const StudenteMateriali: React.FC = () => {
  return (
    <MaterialsProvider>
      <StudentMaterialsPage />
    </MaterialsProvider>
  );
};

export default StudenteMateriali;
