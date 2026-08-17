import React, { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../../../features/area-personale/promoter/components/PageHeader";
import ResponsiveTable from "../../../features/area-personale/promoter/components/ResponsiveTable";
import LessonTypeBadge from "../../../features/area-personale/promoter/components/LessonTypeBadge";
import {
  TABLE_CELL,
  TABLE_HEAD,
  TABLE_ROW,
} from "../../../features/area-personale/promoter/components/tableStyles";
import {
  getCommissionPlanById,
  getLessonsForStudent,
  getStudentById,
} from "../../../features/area-personale/promoter/data/demoData";
import { promoterDemo } from "../../../features/area-personale/promoter/data";
import { enrichLessons } from "../../../features/area-personale/promoter/utils/calculations";
import {
  formatCurrency,
  formatDate,
  formatDuration,
  formatPercent,
} from "../../../features/area-personale/promoter/utils/format";

const PromoterStudenteDetail: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const student = studentId ? getStudentById(studentId) : undefined;

  const enrichedStudentLessons = useMemo(() => {
    if (!student) return [];
    const lessons = getLessonsForStudent(student.id);
    return enrichLessons(
      lessons,
      [student],
      promoterDemo.plans,
      promoterDemo.commissions
    );
  }, [student]);

  if (!student) {
    return <Navigate to="/area-personale/promoter/statistiche" replace />;
  }

  const totalRevenue = enrichedStudentLessons.reduce((s, l) => s + l.amount, 0);
  const totalCommission = enrichedStudentLessons.reduce((s, l) => s + l.commissionAmount, 0);
  const lastActivity =
    enrichedStudentLessons.length > 0
      ? enrichedStudentLessons[enrichedStudentLessons.length - 1].date
      : null;
  const plan = getCommissionPlanById(student.commissionPlanId);

  return (
    <div>
      <Link
        to="/area-personale/promoter/statistiche"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden />
        Torna alle statistiche
      </Link>

      <PageHeader
        title={student.label}
        description="Dettaglio prestazioni generate. L'attribuzione al promoter è permanente; la percentuale di commissione dipende dalla tipologia di ogni singola lezione."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Acquisito il
          </p>
          <p className="text-lg font-bold text-slate-900">{formatDate(student.acquiredAt)}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Ricavi totali
          </p>
          <p className="text-lg font-bold text-slate-900">{formatCurrency(totalRevenue)}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Commissioni totali
          </p>
          <p className="text-lg font-bold text-slate-900">{formatCurrency(totalCommission)}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Ultima attività
          </p>
          <p className="text-lg font-bold text-slate-900">
            {lastActivity ? formatDate(lastActivity) : "—"}
          </p>
        </div>
      </div>

      {plan && (
        <p className="text-sm text-slate-500 font-light mb-6">
          Piano commissionale applicato:{" "}
          <span className="font-medium text-slate-700">{plan.displayName}</span>
        </p>
      )}

      {student.id === "s1042" && (
        <div className="mb-6 p-4 rounded-2xl bg-violet-50/60 border border-violet-100 text-sm text-violet-800 font-light">
          Questo studente ha lezioni in tutte e tre le tipologie (individuale, gruppo piccolo,
          gruppo grande). L'attribuzione resta invariata; cambia solo il tier applicato per
          ciascuna prestazione.
        </div>
      )}

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
          Cronologia prestazioni
        </h2>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm min-w-0 max-w-full">
          <ResponsiveTable>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className={TABLE_HEAD}>Data</th>
                  <th className={TABLE_HEAD}>Prestazione</th>
                  <th className={TABLE_HEAD}>Durata</th>
                  <th className={TABLE_HEAD}>Importo</th>
                  <th className={TABLE_HEAD}>Tier</th>
                  <th className={TABLE_HEAD}>Commissione</th>
                </tr>
              </thead>
              <tbody>
                {enrichedStudentLessons.map((lesson) => (
                  <tr key={lesson.id} className={TABLE_ROW}>
                    <td className={TABLE_CELL}>{formatDate(lesson.date)}</td>
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
    </div>
  );
};

export default PromoterStudenteDetail;
