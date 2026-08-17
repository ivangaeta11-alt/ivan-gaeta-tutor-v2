import React, { useState } from "react";
import type { TrialRecommendation } from "../types";
import { TRIAL_RECOMMENDATION_LABELS } from "../types";
import type { TutorGuest } from "../types";

interface TrialEvaluationFormProps {
  guest: TutorGuest;
  onSaved?: () => void;
}

const TrialEvaluationForm: React.FC<TrialEvaluationFormProps> = ({ guest, onSaved }) => {
  const [levelAdequate, setLevelAdequate] = useState<boolean | null>(null);
  const [paceCompatible, setPaceCompatible] = useState<boolean | null>(null);
  const [mainGaps, setMainGaps] = useState("");
  const [observations, setObservations] = useState("");
  const [recommendation, setRecommendation] = useState<TrialRecommendation | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    onSaved?.();
  };

  if (saved) {
    return (
      <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 text-sm text-emerald-800">
        Raccomandazione salvata in demo. L&apos;ammissione definitiva spetta a Ivan / al gruppo.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-3xl border border-violet-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-1">Valutazione prova — {guest.displayName}</h3>
      <p className="text-sm text-violet-700 font-light mb-5">
        Raccomandazione visiva al gruppo e a Ivan. Non equivale ad ammissione definitiva.
      </p>

      <div className="space-y-4">
        <fieldset>
          <legend className="text-sm font-semibold text-slate-700 mb-2">Livello adeguato al gruppo?</legend>
          <div className="flex gap-4">
            {[true, false].map((v) => (
              <label key={String(v)} className="flex items-center gap-2 text-sm">
                <input type="radio" name="level" checked={levelAdequate === v} onChange={() => setLevelAdequate(v)} />
                {v ? "Sì" : "No"}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold text-slate-700 mb-2">Ritmo compatibile?</legend>
          <div className="flex gap-4">
            {[true, false].map((v) => (
              <label key={String(v)} className="flex items-center gap-2 text-sm">
                <input type="radio" name="pace" checked={paceCompatible === v} onChange={() => setPaceCompatible(v)} />
                {v ? "Sì" : "No"}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Principali lacune</span>
          <textarea value={mainGaps} onChange={(e) => setMainGaps(e.target.value)} rows={2} className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Osservazioni</span>
          <textarea value={observations} onChange={(e) => setObservations(e.target.value)} rows={2} className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
        </label>
        <fieldset>
          <legend className="text-sm font-semibold text-slate-700 mb-2">Raccomandazione finale</legend>
          <div className="flex flex-wrap gap-3">
            {(Object.keys(TRIAL_RECOMMENDATION_LABELS) as TrialRecommendation[]).map((key) => (
              <label key={key} className="flex items-center gap-2 text-sm">
                <input type="radio" name="rec" checked={recommendation === key} onChange={() => setRecommendation(key)} />
                {TRIAL_RECOMMENDATION_LABELS[key]}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={recommendation === null}
        className="mt-6 px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40"
      >
        Salva raccomandazione (demo)
      </button>
    </div>
  );
};

export default TrialEvaluationForm;
