import React from "react";
import { Outlet } from "react-router-dom";
import { StudentDashboardProvider } from "../../../features/area-personale/studente/context/StudentDashboardContext";

const StudenteShell: React.FC = () => {
  return (
    <StudentDashboardProvider>
      <Outlet />
    </StudentDashboardProvider>
  );
};

export default StudenteShell;
