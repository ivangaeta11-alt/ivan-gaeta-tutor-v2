import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Layout from "../../layout/Layout";
import AreaPersonaleLayout from "../../features/area-personale/AreaPersonaleLayout";
import ScrollToTop from "../../components/ScrollToTop";
import AuthLoadingScreen from "../../features/auth/AuthLoadingScreen";
import { useAuth } from "../../features/auth/AuthProvider";
import {
  segmentToRole,
  type AreaPersonaleSegment,
  AREA_PERSONALE_ROLES,
  getDashboardRoles,
  hasDashboardAccess,
  roleToSegment,
} from "../../types/roles";

const AreaPersonaleShell: React.FC = () => {
  const { pathname } = useLocation();
  const { loading, session, roles } = useAuth();
  const segments = pathname.split("/").filter(Boolean);
  const roleSegment = segments[1] ?? "";

  if (loading) {
    return (
      <Layout variant="dashboard">
        <AuthLoadingScreen />
      </Layout>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: pathname }} />;
  }

  const dashboardRoles = getDashboardRoles(roles);

  if (dashboardRoles.length === 0) {
    return <Navigate to="/area-personale/in-attesa" replace />;
  }

  if (!AREA_PERSONALE_ROLES.includes(roleSegment as AreaPersonaleSegment)) {
    return <Navigate to="/login" replace />;
  }

  if (!hasDashboardAccess(roles, roleSegment as AreaPersonaleSegment)) {
    if (dashboardRoles.length === 1) {
      const segment = roleToSegment(dashboardRoles[0]);
      if (segment) {
        return <Navigate to={`/area-personale/${segment}`} replace />;
      }
    }
    return <Navigate to="/area-personale/selezione-area" replace />;
  }

  const role = segmentToRole(roleSegment as AreaPersonaleSegment);

  return (
    <Layout variant="dashboard">
      <ScrollToTop />
      <AreaPersonaleLayout role={role} />
    </Layout>
  );
};

export default AreaPersonaleShell;
