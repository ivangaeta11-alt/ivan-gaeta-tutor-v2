import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import TutorNextLessonCard from "../../../features/area-personale/tutor/components/TutorNextLessonCard";
import TutorRequiredActions from "../../../features/area-personale/tutor/components/TutorRequiredActions";
import TutorWeeklySummary from "../../../features/area-personale/tutor/components/TutorWeeklySummary";
import TutorLessonStatusBadge from "../../../features/area-personale/tutor/components/TutorLessonStatusBadge";
import {
  MOCK_LESSONS,
  MOCK_NEXT_LESSON,
  MOCK_REQUIRED_ACTIONS,
  MOCK_WEEKLY_SUMMARY,
} from "../../../features/area-personale/tutor/data";
import { LESSON_TYPE_LABELS } from "../../../features/area-personale/tutor/types";
import { formatDateShort, formatTimeRange } from "../../../features/area-personale/studente/utils/format";

const UPCOMING = MOCK_LESSONS.filter(
  (l) => !["svolta", "annullata_gruppo", "annullata_tutor"].includes(l.status)
)
  .sort((a, b) => a.date.localeCompare(b.date))
  .slice(0, 5);

const TutorOverview: React.FC = () => (
  <div>
    <PageHeader
      title="Panoramica"
      description="Centro operativo: prossima lezione, azioni urgenti e riepilogo settimanale."
    />
    <div className="space-y-8">
      <TutorNextLessonCard lesson={MOCK_NEXT_LESSON} />
      <TutorRequiredActions actions={MOCK_REQUIRED_ACTIONS} />
      <TutorWeeklySummary {...MOCK_WEEKLY_SUMMARY} />
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Prossime lezioni</h2>
        <div className="space-y-3">
          {UPCOMING.map((lesson) => (
            <div
              key={lesson.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-100"
            >
              <div>
                <p className="font-medium text-slate-900">
                  {formatDateShort(lesson.date)} · {formatTimeRange(lesson.startTime, lesson.endTime)}
                </p>
                <p className="text-sm text-slate-600">
                  {lesson.label} · {LESSON_TYPE_LABELS[lesson.type]}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <TutorLessonStatusBadge status={lesson.status} />
                <Link
                  to={`/area-personale/tutor/lezione/${lesson.id}`}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Dettagli
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default TutorOverview;
