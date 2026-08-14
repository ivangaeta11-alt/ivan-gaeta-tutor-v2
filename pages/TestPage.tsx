import React from "react";
import { Link } from "react-router-dom";

const TestPage: React.FC = () => {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Pagina test V2</h1>
      <p>Routing funzionante</p>
      <Link to="/">Torna alla homepage</Link>
    </main>
  );
};

export default TestPage;
