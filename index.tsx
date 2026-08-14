
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import TestPage from './pages/TestPage';
import RisorseRoute from './pages/RisorseRoute';
import OffertaFormativaRoute from './pages/OffertaFormativaRoute';
import AmbitoRoute from './pages/AmbitoRoute';
import LoginRoute from './pages/LoginRoute';
import RegistrazioneRoute from './pages/RegistrazioneRoute';
import CollaboraRoute from './pages/CollaboraRoute';
import AreaPersonaleShell from './pages/area-personale/AreaPersonaleShell';
import StudenteDashboard from './pages/area-personale/StudenteDashboard';
import PromoterDashboard from './pages/area-personale/PromoterDashboard';
import TutorDashboard from './pages/area-personale/TutorDashboard';

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
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/registrazione" element={<RegistrazioneRoute />} />
        <Route path="/collabora" element={<CollaboraRoute />} />
        <Route path="/area-personale" element={<AreaPersonaleShell />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="studente" element={<StudenteDashboard />} />
          <Route path="promoter" element={<PromoterDashboard />} />
          <Route path="tutor" element={<TutorDashboard />} />
        </Route>
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
