import React from "react";
import Layout from "../layout/Layout";
import RegistrazionePage from "./RegistrazionePage";
import { useGoToContact } from "../hooks/useGoToContact";

const RegistrazioneRoute: React.FC = () => {
  const handleContact = useGoToContact();

  return (
    <Layout onContact={handleContact}>
      <RegistrazionePage />
    </Layout>
  );
};

export default RegistrazioneRoute;
