import React from "react";
import type { Vote } from "../types";
import VoteCard from "./VoteCard";

interface RequiredActionsProps {
  votes: Vote[];
}

const RequiredActions: React.FC<RequiredActionsProps> = ({ votes }) => {
  if (votes.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Azioni richieste</h2>
      <div className="space-y-4">
        {votes.map((vote) => (
          <VoteCard key={vote.id} vote={vote} />
        ))}
      </div>
    </section>
  );
};

export default RequiredActions;
