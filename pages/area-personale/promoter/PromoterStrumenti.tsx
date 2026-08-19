import React from "react";
import PageHeader from "../../../features/area-personale/promoter/components/PageHeader";
import CopyButton from "../../../features/area-personale/promoter/components/CopyButton";
import DashboardCard from "../../../features/area-personale/DashboardCard";
import HowYouEarnCard from "../../../features/area-personale/promoter/components/HowYouEarnCard";
import { promoterDemo } from "../../../features/area-personale/promoter/data";

const PromoterStrumenti: React.FC = () => {
  const { promoter } = promoterDemo;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(promoter.referralLink)}`;

  return (
    <div className="min-w-0 max-w-full">
      <PageHeader
        title="Strumenti"
        description="Link e codici per acquisire nuovi studenti."
      />

      <div className="grid lg:grid-cols-2 gap-6 mb-8 min-w-0">
        <DashboardCard title="Link referral personale">
          <p className="font-mono text-sm text-slate-700 break-all mb-4">
            {promoter.referralLink.replace("https://", "")}
          </p>
          <CopyButton text={promoter.referralLink} className="w-full sm:w-auto" />
        </DashboardCard>

        <DashboardCard title="Codice promoter">
          <p className="font-mono text-2xl font-extrabold text-slate-900 mb-4">
            {promoter.referralCode}
          </p>
          <CopyButton text={promoter.referralCode} className="w-full sm:w-auto" />
        </DashboardCard>
      </div>

      <DashboardCard title="QR code referral">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={qrUrl}
            alt="QR code del link referral"
            width={160}
            height={160}
            className="rounded-xl border border-slate-100 bg-white p-2"
          />
          <p className="text-sm text-slate-500 font-light leading-relaxed">
            Condividi il QR code su volantini, social o messaggi. Porta allo stesso link
            referral personale.
          </p>
        </div>
      </DashboardCard>

      <div className="mt-8">
        <DashboardCard title="In arrivo">
          <ul className="text-sm text-slate-500 space-y-2 font-light">
            <li>Volantini personalizzati</li>
            <li>Card social e template WhatsApp</li>
            <li>Materiali promozionali e FAQ</li>
            <li>Descrizione demo e listino aggiornato</li>
          </ul>
        </DashboardCard>
      </div>

      <div className="mt-8">
        <HowYouEarnCard />
      </div>
    </div>
  );
};

export default PromoterStrumenti;
