import React from "react";
import { Link } from "react-router-dom";
import type { Wallet } from "../types";
import { formatCreditsBalance } from "../utils/format";
import { CREDIT_EURO_RATIO } from "../data";

interface WalletCardProps {
  wallet: Wallet;
  onTransfer?: () => void;
  showMovementsLink?: boolean;
}

const WalletCard: React.FC<WalletCardProps> = ({
  wallet,
  onTransfer,
  showMovementsLink = false,
}) => {
  return (
    <div className="p-5 md:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
        {wallet.label}
      </p>
      <p className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
        {formatCreditsBalance(wallet.balance)}
      </p>
      <p className="text-xs text-slate-400 mt-1 font-light">
        1 credito = {CREDIT_EURO_RATIO} €
      </p>
      {wallet.hint && (
        <p className="text-sm text-emerald-700 mt-3 font-medium">{wallet.hint}</p>
      )}
      <div className="flex flex-wrap gap-2 mt-4">
        {onTransfer && (
          <button
            type="button"
            onClick={onTransfer}
            className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors"
          >
            Trasferisci crediti
          </button>
        )}
        {showMovementsLink && (
          <Link
            to="/area-personale/studente/crediti"
            className="px-3 py-1.5 text-sm font-semibold rounded-lg text-slate-600 border border-slate-200 hover:border-blue-200 hover:text-blue-600 transition-colors"
          >
            Visualizza movimenti
          </Link>
        )}
      </div>
    </div>
  );
};

export default WalletCard;
