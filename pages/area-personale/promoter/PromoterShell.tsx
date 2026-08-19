import React from "react";
import { Outlet } from "react-router-dom";

/** Nested layout wrapper for promoter sub-routes. Sidebar lives in AreaPersonaleLayout. */
const PromoterShell: React.FC = () => {
  return <Outlet />;
};

export default PromoterShell;
