import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../features/area-personale/promoter/components/PageHeader";
import KpiGrid from "../../../features/area-personale/promoter/components/KpiGrid";
import ResponsiveTable from "../../../features/area-personale/promoter/components/ResponsiveTable";
import LessonTypeBadge from "../../../features/area-personale/promoter/components/LessonTypeBadge";
import {
  TABLE_CELL,
  TABLE_HEAD,
  TABLE_ROW,
  TABLE_ROW_CLICKABLE,
} from "../../../features/area-personale/promoter/components/tableStyles";
import {
  enrichedLessons,
  promoterKpis,
  studentSummaries,
} from "../../../features/area-personale/promoter/data";
import { LESSON_TYPE_OPTIONS } from "../../../features/area-personale/promoter/data/demoData";
import type { LessonType } from "../../../features/area-personale/promoter/types";
import {
  formatCurrency,
  formatDate,
  formatDuration,
  formatPercent,
} from "../../../features/area-personale/promoter/utils/format";

type PeriodFilter = "all" | "30d" | "90d" | "2026-08";

const PERIOD_OPTIONS: { value: PeriodFilter; label: string }[] = [
  { value: "all", label: "Tutto il periodo" },
  { value: "30d", label: "Ultimi 30 giorni" },
  { value: "90d", label: "Ultimi 90 giorni" },
  { value: "2026-08", label: "Agosto 2026" },
];

const REFERENCE_DATE = new Date("2026-08-17");

function matchesPeriod(dateStr: string, period: PeriodFilter): boolean {
  if (period === "all") return true;
  const date = new Date(dateStr);
  if (period === "2026-08") {
    return date.getFullYear() === 2026 && date.getMonth() === 7;
  }
  const days = period === "30d" ? 30 : 90;
  const cutoff = new Date(REFERENCE_DATE);
  cutoff.setDate(cutoff.getDate() - days);
  return date >= cutoff && date <= REFERENCE_DATE;
}

const PromoterStatistiche: React.FC = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<PeriodFilter>("all");
  const [studentFilter, setStudentFilter] = useState<string>("all");
  const [lessonType, setLessonType] = useState<LessonType | "all">("all");

  const filteredLessons = useMemo(() => {
    return enrichedLessons.filter((lesson) => {
      if (!matchesPeriod(lesson.date, period)) return false;
      if (studentFilter !== "all" && lesson.studentId !== studentFilter) return false;
      if (lessonType !== "all" && lesson.lessonType !== lessonType) return false;
      return true;
    });
  }, [period, studentFilter, lessonType]);

  const filteredKpis = useMemo(() => {
    const revenue = filteredLessons.reduce((s, l) => s + l.amount, 0);
    const commissions = filteredLessons.reduce((s, l) => s + l.commissionAmount, 0);
    const hours = filteredLessons.reduce((s, l) => s + l.durationHours, 0);
    const uniqueStudents = new Set(filteredLessons.map((l) => l.studentId)).size;

    return {
      acquiredStudents: studentFilter === "all" ? uniqueStudents : 1,
      totalHours: hours,
      totalRevenue: revenue,
      totalCommissions: commissions,
    };
  }, [filteredLessons, studentFilter]);

  const filteredStudentSummaries = useMemo(() => {
    if (studentFilter === "all") return studentSummaries;
    return studentSummaries.filter((s) => s.student.id === studentFilter);
  }, [studentFilter]);

  const sortedLessonHistory = useMemo(
    () => [...filteredLessons].sort((a, b) => b.date.localeCompare(a.date)),
    [filteredLessons]
  );

  const goToStudent = (studentId: string) => {
    navigate(`/area-personale/promoter/statistiche/studente/${studentId}`);
  };

  return (
    <div className="min-w-0 max-w-full">
      <PageHeader
        title="Statistiche"
        description="Analisi delle prestazioni generate dagli studenti acquisiti. L'attribuzione è permanente; la commissione varia per tipologia di lezione."
      />

      <div className="mb-6 p-4 md:p-5 bg-white rounded-2xl border border-slate-100 shadow-sm min-w-0 max-w-full">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Filtri</p>
        <div className="grid sm:grid-cols-3 gap-4 min-w-0">
          <label className="block min-w-0">
            <span className="text-xs text-slate-500 mb-1 block">Periodo</span>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as PeriodFilter)}
              className="w-full min-w-0 px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {PERIOD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block min-w-0">
            <span className="text-xs text-slate-500 mb-1 block">Studente</span>
            <select
              value={studentFilter}
              onChange={(e) => setStudentFilter(e.target.value)}
              className="w-full min-w-0 px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">Tutti gli studenti</option>
              {studentSummaries.map(({ student }) => (
                <option key={student.id} value={student.id}>
                  {student.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block min-w-0">
            <span className="text-xs text-slate-500 mb-1 block">Tipologia lezione</span>
            <select
              value={lessonType}
              onChange={(e) => setLessonType(e.target.value as LessonType | "all")}
              className="w-full min-w-0 px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {LESSON_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <KpiGrid
        items={[
          {
            label: "Studenti acquisiti",
            value: String(filteredKpis.acquiredStudents),
          },
          {
            label: "Ore generate",
            value: filteredKpis.totalHours.toLocaleString("it-IT", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 1,
            }),
          },
          {
            label: "Ricavi generati",
            value: formatCurrency(filteredKpis.totalRevenue),
          },
          {
            label: "Commissioni generate",
            value: formatCurrency(filteredKpis.totalCommissions),
          },
        ]}
      />

      <section className="mt-10 min-w-0">
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
          Studenti acquisiti
        </h2>

        <div className="space-y-3 sm:hidden">
          {filteredStudentSummaries.map(({ student, totalRevenue, totalCommission, lastActivity }) => (
            <button
              key={student.id}
              type="button"
              onClick={() => goToStudent(student.id)}
              className="w-full text-left p-4 bg-white rounded-2xl border border-slate-100 shadow-sm min-w-0 hover:bg-blue-50/40 transition-colors"
            >
              <p className="font-medium text-slate-900 break-words">{student.label}</p>
              <p className="text-sm text-slate-500 mt-1">
                Acquisito il {formatDate(student.acquiredAt)}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-slate-400">Ricavi</p>
                  <p className="font-medium text-slate-800 break-words">{formatCurrency(totalRevenue)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Commissioni</p>
                  <p className="font-medium text-slate-800 break-words">{formatCurrency(totalCommission)}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Ultima attività: {lastActivity ? formatDate(lastActivity) : "—"}
              </p>
            </button>
          ))}
        </div>

        <div className="hidden sm:block bg-white rounded-3xl border border-slate-100 shadow-sm min-w-0 max-w-full">
          <ResponsiveTable>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className={TABLE_HEAD}>Studente</th>
                  <th className={TABLE_HEAD}>Acquisito il</th>
                  <th className={TABLE_HEAD}>Ricavi generati</th>
                  <th className={TABLE_HEAD}>Commissioni generate</th>
                  <th className={TABLE_HEAD}>Ultima attività</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudentSummaries.map(({ student, totalRevenue, totalCommission, lastActivity }) => (
                  <tr
                    key={student.id}
                    className={TABLE_ROW_CLICKABLE}
                    onClick={() => goToStudent(student.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        goToStudent(student.id);
                      }
                    }}
                  >
                    <td className={`${TABLE_CELL} font-medium text-slate-800`}>
                      {student.label}
                    </td>
                    <td className={TABLE_CELL}>{formatDate(student.acquiredAt)}</td>
                    <td className={TABLE_CELL}>{formatCurrency(totalRevenue)}</td>
                    <td className={TABLE_CELL}>{formatCurrency(totalCommission)}</td>
                    <td className={TABLE_CELL}>
                      {lastActivity ? formatDate(lastActivity) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </div>
        <p className="text-xs text-slate-400 mt-2 font-light">
          Clicca su una riga per vedere il dettaglio dello studente.
        </p>
      </section>

      <section className="mt-10 min-w-0">
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Storico lezioni</h2>

        <div className="space-y-3 sm:hidden">
          {sortedLessonHistory.map((lesson) => (
            <div
              key={lesson.id}
              className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm min-w-0"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="font-medium text-slate-900 break-words">{lesson.studentLabel}</p>
                <LessonTypeBadge type={lesson.lessonType} />
              </div>
              <p className="text-sm text-slate-500 mt-1 break-words">{formatDate(lesson.date)}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-slate-400">Durata</p>
                  <p className="font-medium text-slate-800">{formatDuration(lesson.durationHours)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Importo</p>
                  <p className="font-medium text-slate-800 break-words">{formatCurrency(lesson.amount)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Tier</p>
                  <p className="font-medium text-slate-800">{formatPercent(lesson.tierRate)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Commissione</p>
                  <p className="font-medium text-slate-800 break-words">
                    {formatCurrency(lesson.commissionAmount)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden sm:block bg-white rounded-3xl border border-slate-100 shadow-sm min-w-0 max-w-full">
          <ResponsiveTable>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className={TABLE_HEAD}>Data</th>
                  <th className={TABLE_HEAD}>Studente</th>
                  <th className={TABLE_HEAD}>Tipologia</th>
                  <th className={TABLE_HEAD}>Durata</th>
                  <th className={TABLE_HEAD}>Importo</th>
                  <th className={TABLE_HEAD}>Tier</th>
                  <th className={TABLE_HEAD}>Commissione</th>
                </tr>
              </thead>
              <tbody>
                {sortedLessonHistory.map((lesson) => (
                  <tr key={lesson.id} className={TABLE_ROW}>
                    <td className={TABLE_CELL}>{formatDate(lesson.date)}</td>
                    <td className={TABLE_CELL}>{lesson.studentLabel}</td>
                    <td className={TABLE_CELL}>
                      <LessonTypeBadge type={lesson.lessonType} />
                    </td>
                    <td className={TABLE_CELL}>{formatDuration(lesson.durationHours)}</td>
                    <td className={TABLE_CELL}>{formatCurrency(lesson.amount)}</td>
                    <td className={TABLE_CELL}>{formatPercent(lesson.tierRate)}</td>
                    <td className={TABLE_CELL}>{formatCurrency(lesson.commissionAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </div>
      </section>

      {period === "all" && studentFilter === "all" && lessonType === "all" && (
        <p className="text-xs text-slate-400 mt-6 font-light break-words">
          Totale commissioni maturate (tutti i periodi):{" "}
          {formatCurrency(promoterKpis.totalCommissions)}
        </p>
      )}
    </div>
  );
};

export default PromoterStatistiche;
