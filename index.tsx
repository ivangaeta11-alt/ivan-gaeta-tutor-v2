
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import TestPage from './pages/TestPage';
import RisorseRoute from './pages/RisorseRoute';
import OffertaFormativaRoute from './pages/OffertaFormativaRoute';
import AmbitoRoute from './pages/AmbitoRoute';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/offerta-formativa" element={<OffertaFormativaRoute />} />
        <Route path="/offerta-formativa/:slug" element={<AmbitoRoute />} />
        <Route path="/risorse" element={<RisorseRoute />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
