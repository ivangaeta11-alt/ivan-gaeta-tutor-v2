import React, { useState } from "react";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import NextLessonCard from "../../../features/area-personale/studente/components/NextLessonCard";
import WalletCard from "../../../features/area-personale/studente/components/WalletCard";
import RequiredActions from "../../../features/area-personale/studente/components/RequiredActions";
import RecentMaterials from "../../../features/area-personale/studente/components/RecentMaterials";
import InfoNotice from "../../../features/area-personale/studente/components/InfoNotice";
import ConfirmDialog from "../../../features/area-personale/studente/components/ConfirmDialog";
import NewLessonBookingCard from "../../../features/area-personale/studente/components/NewLessonBookingCard";
import ActiveGroupProposals from "../../../features/area-personale/studente/components/ActiveGroupProposals";
import { useStudentDashboard } from "../../../features/area-personale/studente/context/StudentDashboardContext";
import { MOCK_RECENT_MATERIALS, MOCK_VOTES } from "../../../features/area-personale/studente/data";

const StudenteOverview: React.FC = () => {
  const [transferOpen, setTransferOpen] = useState(false);
  const { wallets, nextLesson, activeProposals } = useStudentDashboard();
  const personalWallet = wallets.find((w) => w.type === "personal")!;
  const collectiveWallet = wallets.find((w) => w.type === "collective")!;

  return (
    <div className="min-w-0 max-w-full">
      <PageHeader
        title="Panoramica"
        description="Il tuo centro operativo: prossima lezione, crediti e azioni da completare."
      />

      <div className="space-y-8">
        {nextLesson && <NextLessonCard lesson={nextLesson} />}

        <RequiredActions votes={MOCK_VOTES} />

        <NewLessonBookingCard />

        <ActiveGroupProposals proposals={activeProposals} />

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Crediti</h2>
          <div className="grid sm:grid-cols-2 gap-4 min-w-0">
            <WalletCard wallet={personalWallet} />
            <WalletCard
              wallet={collectiveWallet}
              onTransfer={() => setTransferOpen(true)}
              showMovementsLink
            />
          </div>
        </section>

        <RecentMaterials materials={MOCK_RECENT_MATERIALS} />

        <InfoNotice>
          Il saldo del gruppo viene verificato 24 ore prima della lezione.
        </InfoNotice>
      </div>

      <ConfirmDialog
        open={transferOpen}
        title="Trasferisci crediti"
        message="I crediti trasferiti al wallet collettivo appartengono al gruppo e non vengono restituiti al singolo membro in caso di uscita. Questa azione è simulata in demo."
        confirmLabel="Trasferisci (demo)"
        onConfirm={() => setTransferOpen(false)}
        onCancel={() => setTransferOpen(false)}
      />
    </div>
  );
};

export default StudenteOverview;
