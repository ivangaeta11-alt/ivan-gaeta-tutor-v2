import React from "react";
import { MAX_VALID_SPEND } from "../utils/commissionModel";

interface SpendProgressBarProps {
  validSpend: number;
  showLabel?: boolean;
}

const SpendProgressBar: React.FC<SpendProgressBarProps> = ({
  validSpend,
  showLabel = true,
}) => {
  const capped = Math.min(Math.max(validSpend, 0), MAX_VALID_SPEND);
  const pct = (capped / MAX_VALID_SPEND) * 100;

  return (
    <div className="min-w-0">
      {showLabel && (
        <p className="text-xs text-slate-500 mb-1">
          {capped}/{MAX_VALID_SPEND} €
        </p>
      )}
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            pct >= 100 ? "bg-emerald-500" : "bg-blue-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default SpendProgressBar;
