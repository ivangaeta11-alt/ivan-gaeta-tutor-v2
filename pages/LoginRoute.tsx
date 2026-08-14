import React from "react";
import Layout from "../layout/Layout";
import LoginPage from "./LoginPage";
import { useGoToContact } from "../hooks/useGoToContact";

const LoginRoute: React.FC = () => {
  const handleContact = useGoToContact();

  return (
    <Layout onContact={handleContact}>
      <LoginPage />
    </Layout>
  );
};

export default LoginRoute;
