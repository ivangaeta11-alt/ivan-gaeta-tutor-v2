import React, { useState } from "react";
import type { Vote } from "../types";
import { formatDeadline } from "../utils/format";

interface VoteCardProps {
  vote: Vote;
}

const VoteCard: React.FC<VoteCardProps> = ({ vote }) => {
  const [choice, setChoice] = useState<"favorevole" | "contrario" | null>(null);

  return (
    <div className="p-5 md:p-6 bg-white rounded-2xl border border-amber-100 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
        Votazione aperta
      </p>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{vote.title}</h3>
      <p className="text-sm text-slate-500 font-light mb-4">{vote.description}</p>

      <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
        <span>
          <span className="font-semibold text-emerald-700">{vote.favorable}</span> favorevoli
        </span>
        <span>
          <span className="font-semibold text-red-600">{vote.against}</span> contrari
        </span>
        <span>
          <span className="font-semibold text-slate-500">{vote.notVoted}</span> non hanno votato
        </span>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        Scadenza: {formatDeadline(vote.deadline)}
      </p>

      {choice && (
        <p className="text-sm text-blue-700 mb-3 font-medium">
          Hai votato: {choice === "favorevole" ? "Favorevole" : "Contrario"} (demo locale)
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setChoice("favorevole")}
          className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-colors ${
            choice === "favorevole"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "border-slate-200 text-slate-700 hover:border-emerald-200"
          }`}
        >
          Favorevole
        </button>
        <button
          type="button"
          onClick={() => setChoice("contrario")}
          className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-colors ${
            choice === "contrario"
              ? "bg-red-50 text-red-700 border-red-200"
              : "border-slate-200 text-slate-700 hover:border-red-200"
          }`}
        >
          Contrario
        </button>
      </div>
    </div>
  );
};

export default VoteCard;
