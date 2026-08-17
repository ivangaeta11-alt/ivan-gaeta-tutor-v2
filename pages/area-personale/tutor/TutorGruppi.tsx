import React from "react";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import GroupCard from "../../../features/area-personale/tutor/components/GroupCard";
import { MOCK_GROUPS } from "../../../features/area-personale/tutor/data";

const TutorGruppi: React.FC = () => (
  <div>
    <PageHeader title="Gruppi e studenti" description="Gruppi assegnati al tuo profilo tutor." />
    <div className="grid sm:grid-cols-2 gap-6">
      {MOCK_GROUPS.map((g) => (
        <GroupCard key={g.id} group={g} />
      ))}
    </div>
  </div>
);

export default TutorGruppi;
