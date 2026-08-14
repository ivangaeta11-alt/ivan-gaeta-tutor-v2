import React from "react";
import Layout from "../layout/Layout";
import CollaboraPage from "./CollaboraPage";
import { useGoToContact } from "../hooks/useGoToContact";

const CollaboraRoute: React.FC = () => {
  const handleContact = useGoToContact();

  return (
    <Layout onContact={handleContact}>
      <CollaboraPage />
    </Layout>
  );
};

export default CollaboraRoute;
