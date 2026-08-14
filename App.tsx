import React, { useState, useCallback } from "react";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import ResourcesContainer from "./features/resources/ResourcesContainer";

type View = "home" | "risorse";

const App: React.FC = () => {
  const [view, setView] = useState<View>("home");

  const handleContact = useCallback(() => {
    setView("home");
    setTimeout(() => {
      document.getElementById("contatti")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const renderPage = () => {
    switch (view) {
      case "home":
        return (
          <HomePage
            onNavigateRisorse={() => setView("risorse")}
            onNavigateContact={handleContact}
          />
        );
      case "risorse":
        return (
          <ResourcesContainer onGoToContact={handleContact} />
        );
      default:
        return null;
    }
  };

  return (
    <Layout
      currentView={view}
      setView={setView}
      onContact={handleContact}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;