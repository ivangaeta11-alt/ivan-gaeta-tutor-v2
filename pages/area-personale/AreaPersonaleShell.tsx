import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Layout from "../../layout/Layout";
import AreaPersonaleLayout from "../../features/area-personale/AreaPersonaleLayout";
import { useGoToContact } from "../../hooks/useGoToContact";
import {
  segmentToRole,
  type AreaPersonaleSegment,
  AREA_PERSONALE_ROLES,
} from "../../types/roles";

/**
 * Shell for /area-personale/* .
 * Future auth can wrap this component (or a loader) to protect all role dashboards at once.
 */
const AreaPersonaleShell: React.FC = () => {
  const handleContact = useGoToContact();
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  // /area-personale/{role}/... → role is the second segment
  const roleSegment = segments[1] ?? "";

  if (!AREA_PERSONALE_ROLES.includes(roleSegment as AreaPersonaleSegment)) {
    return <Navigate to="/login" replace />;
  }

  const role = segmentToRole(roleSegment as AreaPersonaleSegment);

  return (
    <Layout onContact={handleContact}>
      <AreaPersonaleLayout role={role} />
    </Layout>
  );
};

export default AreaPersonaleShell;
