import React, { useMemo, useState } from "react";
import StepFlowModal from "./StepFlowModal";
import AvailableSlotsPicker from "./AvailableSlotsPicker";
import CreditPaymentSummary from "./CreditPaymentSummary";
import BookingConfirmation from "./BookingConfirmation";
import {
  MOCK_ASSIGNED_TUTOR,
  MOCK_BOOKING_SUBJECTS,
  MOCK_DURATION_OPTIONS,
  MOCK_INDIVIDUAL_SLOTS,
  getIndividualCost,
} from "../data";
import { useStudentDashboard } from "../context/StudentDashboardContext";
import type { BookingPriceSummary, IndividualBookingStep, Lesson } from "../types";

interface IndividualLessonBookingFlowProps {
  open: boolean;
  onClose: () => void;
}

const IndividualLessonBookingFlow: React.FC<IndividualLessonBookingFlowProps> = ({
  open,
  onClose,
}) => {
  const { personalCredits, bookIndividualLesson, purchaseMissingCredits } =
    useStudentDashboard();

  const [step, setStep] = useState<IndividualBookingStep>("lesson");
  const [subject, setSubject] = useState<string>(MOCK_BOOKING_SUBJECTS[0]);
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [within24Ack, setWithin24Ack] = useState(false);
  const [confirmedLesson, setConfirmedLesson] = useState<Lesson | null>(null);
  const [creditsUsed, setCreditsUsed] = useState(0);

  const selectedSlot = useMemo(
    () => MOCK_INDIVIDUAL_SLOTS.find((s) => s.id === selectedSlotId) ?? null,
    [selectedSlotId]
  );

  const priceSummary = useMemo<BookingPriceSummary | null>(() => {
    if (!selectedSlot) return null;
    const totalCost = getIndividualCost(durationMinutes);
    const remainingBalance = personalCredits - totalCost;
    return {
      subject,
      tutorName: MOCK_ASSIGNED_TUTOR.name,
      date: selectedSlot.date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      durationMinutes,
      totalCost,
      walletBalance: personalCredits,
      remainingBalance,
      sufficient: remainingBalance >= 0,
      missingCredits: Math.max(0, totalCost - personalCredits),
    };
  }, [selectedSlot, durationMinutes, subject, personalCredits]);

  const reset = () => {
    setStep("lesson");
    setSubject(MOCK_BOOKING_SUBJECTS[0]);
    setDurationMinutes(90);
    setSelectedDate(null);
    setSelectedSlotId(null);
    setWithin24Ack(false);
    setConfirmedLesson(null);
    setCreditsUsed(0);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleConfirm = () => {
    if (!selectedSlot || !priceSummary?.sufficient) return;
    if (selectedSlot.within24Hours && !within24Ack) return;

    const lesson = bookIndividualLesson({
      subject,
      tutorName: MOCK_ASSIGNED_TUTOR.name,
      date: selectedSlot.date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      durationMinutes,
      costCredits: priceSummary.totalCost,
    });

    setCreditsUsed(priceSummary.totalCost);
    setConfirmedLesson(lesson);
    setStep("confirmation");
  };

  const stepNumber =
    step === "lesson" ? 1 : step === "slot" ? 2 : step === "summary" ? 3 : 4;

  const stepTitles: Record<IndividualBookingStep, string> = {
    lesson: "Lezione",
    slot: "Data e ora",
    summary: "Riepilogo e crediti",
    confirmation: "Conferma",
  };

  if (step === "confirmation" && confirmedLesson) {
    return (
      <StepFlowModal
        open={open}
        title="Conferma"
        step={4}
        totalSteps={4}
        onClose={handleClose}
      >
        <BookingConfirmation
          lesson={confirmedLesson}
          creditsUsed={creditsUsed}
          newBalance={personalCredits}
          onClose={handleClose}
        />
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
          {step !== "lesson" && (
            <button
              type="button"
              onClick={() =>
                setStep(step === "summary" ? "slot" : step === "slot" ? "lesson" : "lesson")
              }
              className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Indietro
            </button>
          )}
          {step === "lesson" && (
            <button
              type="button"
              onClick={() => setStep("slot")}
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Continua
            </button>
          )}
          {step === "slot" && (
            <button
              type="button"
              disabled={!selectedSlot}
              onClick={() => setStep("summary")}
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Continua
            </button>
          )}
          {step === "summary" && priceSummary?.sufficient && (
            <button
              type="button"
              disabled={!!selectedSlot?.within24Hours && !within24Ack}
              onClick={handleConfirm}
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Conferma prenotazione
            </button>
          )}
        </>
      }
    >
      {step === "lesson" && (
        <div className="space-y-4">
          <label className="block">
            <span className="text-xs text-slate-500 mb-1 block">Materia</span>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white text-slate-700"
            >
              {MOCK_BOOKING_SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <div>
            <span className="text-xs text-slate-500 mb-1 block">Tutor assegnato</span>
            <p className="px-3 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 text-slate-800">
              {MOCK_ASSIGNED_TUTOR.name}
            </p>
          </div>
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
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "border-slate-200 text-slate-700 hover:border-blue-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === "slot" && (
        <AvailableSlotsPicker
          slots={MOCK_INDIVIDUAL_SLOTS}
          selectedSlotId={selectedSlotId}
          onSelectSlot={(slot) => {
            setSelectedSlotId(slot.id);
            setSelectedDate(slot.date);
            setWithin24Ack(false);
          }}
          selectedDate={selectedDate}
          onSelectDate={(date) => {
            setSelectedDate(date);
            setSelectedSlotId(null);
            setWithin24Ack(false);
          }}
        />
      )}

      {step === "summary" && priceSummary && (
        <CreditPaymentSummary
          summary={priceSummary}
          showWithin24HoursWarning={!!selectedSlot?.within24Hours}
          within24HoursAcknowledged={within24Ack}
          onWithin24HoursAckChange={setWithin24Ack}
          onPurchaseMissing={() => purchaseMissingCredits(priceSummary.missingCredits)}
        />
      )}
    </StepFlowModal>
  );
};

export default IndividualLessonBookingFlow;
