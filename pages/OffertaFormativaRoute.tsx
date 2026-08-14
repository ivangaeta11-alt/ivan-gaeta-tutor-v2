import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import OffertaFormativaPage from "./OffertaFormativaPage";

const OffertaFormativaRoute: React.FC = () => {
  const navigate = useNavigate();

  const handleContact = useCallback(() => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contatti")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [navigate]);

  return (
    <Layout onContact={handleContact}>
      <OffertaFormativaPage />
    </Layout>
  );
};

export default OffertaFormativaRoute;
