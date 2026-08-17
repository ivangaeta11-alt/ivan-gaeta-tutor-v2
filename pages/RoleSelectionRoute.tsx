import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import RoleSelectionPage from "./RoleSelectionPage";
import AuthLoadingScreen from "../features/auth/AuthLoadingScreen";
import { useAuth } from "../features/auth/AuthProvider";
import {
  getDashboardRoles,
  roleToSegment,
} from "../types/roles";

const RoleSelectionRoute: React.FC = () => {
  const { loading, session, roles } = useAuth();
  const dashboardRoles = getDashboardRoles(roles);

  if (loading) {
    return (
      <Layout variant="dashboard">
        <AuthLoadingScreen />
      </Layout>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (dashboardRoles.length === 0) {
    return <Navigate to="/area-personale/in-attesa" replace />;
  }

  if (dashboardRoles.length === 1) {
    const segment = roleToSegment(dashboardRoles[0]);
    if (segment) {
      return <Navigate to={`/area-personale/${segment}`} replace />;
    }
  }

  return (
    <Layout variant="dashboard">
      <RoleSelectionPage />
    </Layout>
  );
};

export default RoleSelectionRoute;
