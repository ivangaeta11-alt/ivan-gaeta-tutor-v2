import React from "react";
import InfoNotice from "../../studente/components/InfoNotice";

const ArchivedWorkspaceNotice: React.FC = () => (
  <InfoNotice>
    <span className="font-semibold text-slate-800">Archiviato · Sola lettura.</span> Puoi
    consultare e scaricare i materiali esistenti, ma non aggiungere o modificare contenuti.
  </InfoNotice>
);

export default ArchivedWorkspaceNotice;
