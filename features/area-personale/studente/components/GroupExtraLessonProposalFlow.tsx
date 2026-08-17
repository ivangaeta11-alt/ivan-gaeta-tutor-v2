import React, { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import StepFlowModal from "./StepFlowModal";
import AvailableSlotsPicker from "./AvailableSlotsPicker";
import InfoNotice from "./InfoNotice";
import {
  MOCK_DURATION_OPTIONS,
  MOCK_GROUP_EXTRA_SLOTS,
  getGroupExtraCost,
} from "../data";
import { useStudentDashboard } from "../context/StudentDashboardContext";
import type { GroupProposalStep } from "../types";
import { formatCreditsBalance, formatDate, formatTimeRange } from "../utils/format";

interface GroupExtraLessonProposalFlowProps {
  open: boolean;
  onClose: () => void;
}

const GroupExtraLessonProposalFlow: React.FC<GroupExtraLessonProposalFlowProps> = ({
  open,
  onClose,
}) => {
  const { group, collectiveCredits, canParticipateInGroup, publishGroupProposal } =
    useStudentDashboard();

  const [step, setStep] = useState<GroupProposalStep>("group");
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [motivation, setMotivation] = useState("");
  const [published, setPublished] = useState(false);

  const selectedSlot = useMemo(
    () => MOCK_GROUP_EXTRA_SLOTS.find((s) => s.id === selectedSlotId) ?? null,
    [selectedSlotId]
  );

  const estimatedCost = getGroupExtraCost(durationMinutes);
  const insufficientCollective = collectiveCredits < estimatedCost;

  const reset = () => {
    setStep("group");
    setDurationMinutes(90);
    setSelectedDate(null);
    setSelectedSlotId(null);
    setMotivation("");
    setPublished(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handlePublish = () => {
    if (!group || !selectedSlot || !canParticipateInGroup) return;

    publishGroupProposal({
      group,
      date: selectedSlot.date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      durationMinutes,
      estimatedCost,
      motivation: motivation.trim() || undefined,
    });

    setPublished(true);
    setStep("published");
  };

  if (!group || !canParticipateInGroup) {
    return null;
  }

  const stepNumber =
    step === "group" ? 1 : step === "slot" ? 2 : step === "details" ? 3 : 4;

  const stepTitles: Record<GroupProposalStep, string> = {
    group: "Gruppo",
    slot: "Data, ora e durata",
    details: "Dettagli della proposta",
    published: "Pubblicazione",
  };

  if (step === "published" && published) {
    return (
      <StepFlowModal
        open={open}
        title="Proposta pubblicata"
        step={4}
        totalSteps={4}
        onClose={handleClose}
      >
        <div className="text-center min-w-0">
          <CheckCircle2 className="w-12 h-12 text-violet-600 mx-auto mb-4" aria-hidden />
          <h3 className="text-lg font-bold text-slate-900 mb-2">Proposta pubblicata</h3>
          <p className="text-sm text-slate-500 font-light mb-4 break-words">
            La proposta è stata aggiunta alle proposte attive del gruppo con stato &quot;In
            votazione&quot; (demo locale).
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors"
          >
            Chiudi
          </button>
        </div>
      </StepFlowModal>
    );
  }

  return (
    <StepFlowModal
      open={open}
      title={stepTitles[step]}
      step={stepNumber}
      totalSteps={4}
      stepLabel={stepTitles[step]}
      onClose={handleClose}
      footer={
        <>
          {step !== "group" && step !== "published" && (
            <button
              type="button"
              onClick={() =>
                setStep(
                  step === "details" ? "slot" : step === "slot" ? "group" : "group"
                )
              }
              className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Indietro
            </button>
          )}
          {step === "group" && (
            <button
              type="button"
              onClick={() => setStep("slot")}
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors"
            >
              Continua
            </button>
          )}
          {step === "slot" && (
            <button
              type="button"
              disabled={!selectedSlot}
              onClick={() => setStep("details")}
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors disabled:opacity-50"
            >
              Continua
            </button>
          )}
          {step === "details" && (
            <button
              type="button"
              onClick={handlePublish}
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors"
            >
              Pubblica proposta
            </button>
          )}
        </>
      }
    >
      {step === "group" && (
        <div className="p-4 rounded-xl bg-violet-50/60 border border-violet-100 min-w-0">
          <p className="font-bold text-slate-900">{group.name}</p>
          <dl className="mt-3 grid gap-2 text-sm">
            <div>
              <dt className="text-xs text-slate-400">Materia</dt>
              <dd className="text-slate-800">{group.subject}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400">Membri effettivi</dt>
              <dd className="text-slate-800">{group.effectiveMembers}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400">Tutor</dt>
              <dd className="text-slate-800">{group.tutorName}</dd>
            </div>
          </dl>
        </div>
      )}

      {step === "slot" && (
        <div className="space-y-4">
          <div>
            <span className="text-xs text-slate-500 mb-2 block">Durata</span>
            <div className="flex flex-wrap gap-2">
              {MOCK_DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.minutes}
                  type="button"
                  onClick={() => setDurationMinutes(opt.minutes)}
                  className={`px-3 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                    durationMinutes === opt.minutes
                      ? "bg-violet-50 text-violet-700 border-violet-200"
                      : "border-slate-200 text-slate-700 hover:border-violet-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <AvailableSlotsPicker
            slots={MOCK_GROUP_EXTRA_SLOTS}
            selectedSlotId={selectedSlotId}
            onSelectSlot={(slot) => {
              setSelectedSlotId(slot.id);
              setSelectedDate(slot.date);
            }}
            selectedDate={selectedDate}
            onSelectDate={(date) => {
              setSelectedDate(date);
              setSelectedSlotId(null);
            }}
          />
        </div>
      )}

      {step === "details" && selectedSlot && (
        <div className="space-y-4 min-w-0">
          <dl className="grid gap-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Gruppo</dt>
              <dd className="font-medium text-slate-800">{group.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Materia</dt>
              <dd className="font-medium text-slate-800">{group.subject}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Data e ora</dt>
              <dd className="font-medium text-slate-800 text-right break-words">
                {formatDate(selectedSlot.date)} ·{" "}
                {formatTimeRange(selectedSlot.startTime, selectedSlot.endTime)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Durata</dt>
              <dd className="font-medium text-slate-800">{durationMinutes} min</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-slate-100 pt-2">
              <dt className="text-slate-500">Costo previsto</dt>
              <dd className="font-bold text-slate-900">
                {formatCreditsBalance(estimatedCost)} (wallet collettivo)
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Saldo attuale del gruppo</dt>
              <dd className="font-medium text-slate-800">
                {formatCreditsBalance(collectiveCredits)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Saldo previsto dopo conferma</dt>
              <dd className="font-medium text-slate-800">
                {formatCreditsBalance(collectiveCredits - estimatedCost)}
              </dd>
            </div>
          </dl>

          {insufficientCollective && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-sm text-amber-800">
              Il saldo attuale non è sufficiente. Il gruppo potrà aggiungere crediti prima della
              conferma definitiva della lezione.
            </div>
          )}

          <InfoNotice>
            Il controllo definitivo del wallet avviene a T−24h. Con saldo sufficiente la lezione
            viene confermata e i crediti scalati; altrimenti resta non confermata.
          </InfoNotice>

          <label className="block">
            <span className="text-xs text-slate-500 mb-1 block">
              Perché proponi questa lezione? (facoltativo)
            </span>
            <textarea
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              rows={3}
              placeholder="Es. Ripasso aggiuntivo prima della simulazione."
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 resize-y min-h-[80px]"
            />
          </label>
        </div>
      )}
    </StepFlowModal>
  );
};

export default GroupExtraLessonProposalFlow;
