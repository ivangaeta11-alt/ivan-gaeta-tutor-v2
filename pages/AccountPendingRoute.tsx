import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import AccountPendingPage from "./AccountPendingPage";
import AuthLoadingScreen from "../features/auth/AuthLoadingScreen";
import { useAuth } from "../features/auth/AuthProvider";
import { getDashboardRoles, getPostLoginPath } from "../types/roles";

const AccountPendingRoute: React.FC = () => {
  const { loading, session, roles } = useAuth();

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

  if (getDashboardRoles(roles).length > 0) {
    return <Navigate to={getPostLoginPath(roles)} replace />;
  }

  return (
    <Layout variant="dashboard">
      <AccountPendingPage />
    </Layout>
  );
};

export default AccountPendingRoute;
