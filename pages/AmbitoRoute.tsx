import React, { useCallback } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import AmbitoPage from "./AmbitoPage";
import { getAmbitoBySlug } from "../features/offerta/ambiti";

const AmbitoRoute: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const ambito = slug ? getAmbitoBySlug(slug) : undefined;

  const handleContact = useCallback(() => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contatti")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [navigate]);

  if (!ambito) {
    return <Navigate to="/offerta-formativa" replace />;
  }

  return (
    <Layout onContact={handleContact}>
      <AmbitoPage ambito={ambito} onContact={handleContact} />
    </Layout>
  );
};

export default AmbitoRoute;
