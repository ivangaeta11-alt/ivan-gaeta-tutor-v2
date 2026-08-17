import React, { useState } from "react";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import WalletCard from "../../../features/area-personale/studente/components/WalletCard";
import ConfirmDialog from "../../../features/area-personale/studente/components/ConfirmDialog";
import InfoNotice from "../../../features/area-personale/studente/components/InfoNotice";
import {
  MOCK_CREDIT_MOVEMENTS,
  MOCK_WALLETS,
} from "../../../features/area-personale/studente/data";
import { formatCredits, formatDateShort } from "../../../features/area-personale/studente/utils/format";

const StudenteCrediti: React.FC = () => {
  const [transferOpen, setTransferOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const personalWallet = MOCK_WALLETS.find((w) => w.type === "personal")!;
  const collectiveWallet = MOCK_WALLETS.find((w) => w.type === "collective")!;

  return (
    <div>
      <PageHeader
        title="Crediti e pagamenti"
        description="Gestisci i tuoi crediti personali e il wallet del gruppo. 1 credito = 1 €."
      />

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <WalletCard wallet={personalWallet} />
        <WalletCard wallet={collectiveWallet} />
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <button
          type="button"
          onClick={() => setPurchaseOpen(true)}
          className="px-4 py-2.5 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
        >
          Acquista crediti
        </button>
        <button
          type="button"
          onClick={() => setTransferOpen(true)}
          className="px-4 py-2.5 text-sm font-semibold rounded-xl border border-slate-200 text-slate-700 hover:border-blue-200 hover:text-blue-600 transition-colors"
        >
          Trasferisci al gruppo
        </button>
      </div>

      <InfoNotice>
        Il saldo del gruppo viene verificato 24 ore prima della lezione. Se sufficiente, i
        crediti vengono scalati e la lezione è confermata; altrimenti resta non confermata.
      </InfoNotice>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
          Storico movimenti
        </h2>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm min-w-0 max-w-full">
          <div className="overflow-x-auto overscroll-x-contain max-w-full">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 px-4 py-3">
                    Data
                  </th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 px-4 py-3">
                    Descrizione
                  </th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 px-4 py-3">
                    Wallet
                  </th>
                  <th className="text-right text-xs font-bold uppercase tracking-wider text-slate-400 px-4 py-3">
                    Importo
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...MOCK_CREDIT_MOVEMENTS].reverse().map((mov) => (
                  <tr key={mov.id} className="border-b border-slate-50 last:border-0">
                    <td className="px-4 py-3.5 text-sm text-slate-600 font-light">
                      {formatDateShort(mov.date)}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-800">{mov.description}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-500 font-light">
                      {mov.walletType === "personal" ? "Personale" : "Collettivo"}
                    </td>
                    <td
                      className={`px-4 py-3.5 text-sm font-semibold text-right ${
                        mov.amount >= 0 ? "text-emerald-700" : "text-slate-800"
                      }`}
                    >
                      {formatCredits(mov.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ConfirmDialog
        open={purchaseOpen}
        title="Acquista crediti"
        message="L'acquisto crediti sarà disponibile con l'integrazione dei pagamenti. Nessun addebito in questa demo."
        confirmLabel="OK"
        onConfirm={() => setPurchaseOpen(false)}
        onCancel={() => setPurchaseOpen(false)}
      />

      <ConfirmDialog
        open={transferOpen}
        title="Trasferisci al gruppo"
        message="I crediti trasferiti al wallet collettivo appartengono al gruppo e non vengono restituiti in caso di uscita. Trasferimento simulato in demo."
        confirmLabel="Trasferisci (demo)"
        onConfirm={() => setTransferOpen(false)}
        onCancel={() => setTransferOpen(false)}
      />
    </div>
  );
};

export default StudenteCrediti;
