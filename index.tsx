
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
import StudenteShell from './pages/area-personale/studente/StudenteShell';
import StudenteOverview from './pages/area-personale/studente/StudenteOverview';
import StudenteCalendario from './pages/area-personale/studente/StudenteCalendario';
import StudenteGruppo from './pages/area-personale/studente/StudenteGruppo';
import StudenteMateriali from './pages/area-personale/studente/StudenteMateriali';
import StudenteCrediti from './pages/area-personale/studente/StudenteCrediti';
import StudenteProfilo from './pages/area-personale/studente/StudenteProfilo';
import TutorShell from './pages/area-personale/tutor/TutorShell';
import TutorOverview from './pages/area-personale/tutor/TutorOverview';
import TutorCalendario from './pages/area-personale/tutor/TutorCalendario';
import TutorLezioneDetail from './pages/area-personale/tutor/TutorLezioneDetail';
import TutorGruppi from './pages/area-personale/tutor/TutorGruppi';
import TutorGruppoDetail from './pages/area-personale/tutor/TutorGruppoDetail';
import TutorStudenteDetail from './pages/area-personale/tutor/TutorStudenteDetail';
import TutorMateriali from './pages/area-personale/tutor/TutorMateriali';
import TutorCompensi from './pages/area-personale/tutor/TutorCompensi';
import TutorProfilo from './pages/area-personale/tutor/TutorProfilo';
import PromoterShell from './pages/area-personale/promoter/PromoterShell';
import PromoterDashboard from './pages/area-personale/PromoterDashboard';
import PromoterStatistiche from './pages/area-personale/promoter/PromoterStatistiche';
import PromoterStudenteDetail from './pages/area-personale/promoter/PromoterStudenteDetail';
import PromoterLiquidazioni from './pages/area-personale/promoter/PromoterLiquidazioni';
import PromoterMateriale from './pages/area-personale/promoter/PromoterMateriale';
import PromoterProfilo from './pages/area-personale/promoter/PromoterProfilo';

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
        {/* Alias route preferita in specifica */}
        <Route path="/area-studente" element={<Navigate to="/area-personale/studente" replace />} />
        <Route path="/area-studente/calendario" element={<Navigate to="/area-personale/studente/calendario" replace />} />
        <Route path="/area-studente/gruppo" element={<Navigate to="/area-personale/studente/gruppo" replace />} />
        <Route path="/area-studente/materiali" element={<Navigate to="/area-personale/studente/materiali" replace />} />
        <Route path="/area-studente/crediti" element={<Navigate to="/area-personale/studente/crediti" replace />} />
        <Route path="/area-studente/profilo" element={<Navigate to="/area-personale/studente/profilo" replace />} />
        {/* Alias route tutor */}
        <Route path="/area-tutor" element={<Navigate to="/area-personale/tutor" replace />} />
        <Route path="/area-tutor/calendario" element={<Navigate to="/area-personale/tutor/calendario" replace />} />
        <Route path="/area-tutor/gruppi" element={<Navigate to="/area-personale/tutor/gruppi" replace />} />
        <Route path="/area-tutor/materiali" element={<Navigate to="/area-personale/tutor/materiali" replace />} />
        <Route path="/area-tutor/compensi" element={<Navigate to="/area-personale/tutor/compensi" replace />} />
        <Route path="/area-tutor/profilo" element={<Navigate to="/area-personale/tutor/profilo" replace />} />
        <Route path="/area-personale" element={<AreaPersonaleShell />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="studente" element={<StudenteShell />}>
            <Route index element={<StudenteOverview />} />
            <Route path="calendario" element={<StudenteCalendario />} />
            <Route path="gruppo" element={<StudenteGruppo />} />
            <Route path="materiali" element={<StudenteMateriali />} />
            <Route path="crediti" element={<StudenteCrediti />} />
            <Route path="profilo" element={<StudenteProfilo />} />
          </Route>
          <Route path="promoter" element={<PromoterShell />}>
            <Route index element={<PromoterDashboard />} />
            <Route path="statistiche" element={<PromoterStatistiche />} />
            <Route path="statistiche/studente/:studentId" element={<PromoterStudenteDetail />} />
            <Route path="liquidazioni" element={<PromoterLiquidazioni />} />
            <Route path="materiale" element={<PromoterMateriale />} />
            <Route path="profilo" element={<PromoterProfilo />} />
          </Route>
          <Route path="tutor" element={<TutorShell />}>
            <Route index element={<TutorOverview />} />
            <Route path="calendario" element={<TutorCalendario />} />
            <Route path="lezione/:lessonId" element={<TutorLezioneDetail />} />
            <Route path="gruppi" element={<TutorGruppi />} />
            <Route path="gruppi/:groupId" element={<TutorGruppoDetail />} />
            <Route path="gruppi/:groupId/studente/:studentId" element={<TutorStudenteDetail />} />
            <Route path="materiali" element={<TutorMateriali />} />
            <Route path="compensi" element={<TutorCompensi />} />
            <Route path="profilo" element={<TutorProfilo />} />
          </Route>
        </Route>
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
