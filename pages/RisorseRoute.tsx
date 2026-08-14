import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import ResourcesContainer from "../features/resources/ResourcesContainer";

/** Route wrapper for /risorse — same Resources UI as before, with Layout. */
const RisorseRoute: React.FC = () => {
  const navigate = useNavigate();

  const handleContact = useCallback(() => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contatti")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [navigate]);

  return (
    <Layout onContact={handleContact}>
      <ResourcesContainer onGoToContact={handleContact} />
    </Layout>
  );
};

export default RisorseRoute;
