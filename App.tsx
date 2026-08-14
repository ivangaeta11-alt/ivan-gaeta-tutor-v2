import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleContact = useCallback(() => {
    document.getElementById("contatti")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleNavigateRisorse = useCallback(() => {
    navigate("/risorse");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  return (
    <Layout onContact={handleContact}>
      <HomePage onNavigateRisorse={handleNavigateRisorse} />
    </Layout>
  );
};

export default App;
