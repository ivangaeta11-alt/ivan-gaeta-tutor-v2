import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../../../features/area-personale/promoter/components/PageHeader";
import StudentStatusBadge from "../../../features/area-personale/promoter/components/StudentStatusBadge";
import SpendProgressBar from "../../../features/area-personale/promoter/components/SpendProgressBar";
import ResponsiveTable from "../../../features/area-personale/promoter/components/ResponsiveTable";
import {
  getMovementsForStudent,
  getPurchasesForStudent,
  getStudentById,
} from "../../../features/area-personale/promoter/data";
import {
  cappedValidSpend,
  cumulativeCommission,
  remainingPotential,
} from "../../../features/area-personale/promoter/utils/commissionModel";
import { formatCurrency, formatDate } from "../../../features/area-personale/promoter/utils/format";
import {
  TABLE_CELL,
  TABLE_HEAD,
  TABLE_ROW,
} from "../../../features/area-personale/promoter/components/tableStyles";

const PromoterStudenteDetail: React.FC = () => {
  const { studentId = "" } = useParams();
  const student = getStudentById(studentId);
  const purchases = getPurchasesForStudent(studentId);
  const movements = getMovementsForStudent(studentId);

  if (!student) {
    return (
      <div className="min-w-0">
        <p className="text-slate-500">Studente non trovato.</p>
        <Link
          to="/area-personale/promoter/studenti"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 mt-4 inline-block"
        >
          ← Torna agli studenti
        </Link>
      </div>
    );
  }

  const totalSpend = purchases.reduce((s, p) => s + p.amount, 0);
  const validSpend = cappedValidSpend(totalSpend);
  const commission = cumulativeCommission(validSpend);
  const remaining = remainingPotential(validSpend);

  return (
    <div className="min-w-0 max-w-full">
      <Link
        to="/area-personale/promoter/studenti"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Studenti
      </Link>

      <PageHeader
        title={student.label}
        description={`Acquisito il ${formatDate(student.acquiredAt)}`}
      />

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <StudentStatusBadge status={student.status} />
        {validSpend >= 100 && (
          <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            Commissione completata
          </span>
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-white rounded-2xl border border-slate-100">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Spesa valida
          </p>
          <p className="text-xl font-extrabold text-slate-900">{formatCurrency(validSpend)}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-100">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Commissione maturata
          </p>
          <p className="text-xl font-extrabold text-slate-900">{formatCurrency(commission)}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-100">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Ancora ottenibile
          </p>
          <p className="text-xl font-extrabold text-slate-900">{formatCurrency(remaining)}</p>
        </div>
      </div>

      <div className="mb-8 max-w-md">
        <SpendProgressBar validSpend={validSpend} />
      </div>

      <h2 className="text-lg font-bold text-slate-900 mb-4">Storico acquisti</h2>

      <div className="sm:hidden space-y-3 mb-8">
        {movements.map((m) => (
          <div
            key={m.id}
            className="p-4 bg-white rounded-2xl border border-slate-100 text-sm"
          >
            <p className="font-semibold text-slate-800">{formatDate(m.purchaseDate)}</p>
            <p className="text-slate-600 mt-1">
              Acquisto {formatCurrency(m.purchaseAmount)} → commissione{" "}
              <span className="font-semibold text-emerald-700">
                +{formatCurrency(m.commissionAmount)}
              </span>
            </p>
          </div>
        ))}
        {movements.length === 0 && (
          <p className="text-sm text-slate-400">Nessun acquisto con commissione.</p>
        )}
      </div>

      <div className="hidden sm:block bg-white rounded-3xl border border-slate-100 shadow-sm min-w-0">
        <ResponsiveTable>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className={TABLE_HEAD}>Data</th>
                <th className={TABLE_HEAD}>Acquisto</th>
                <th className={TABLE_HEAD}>Commissione</th>
              </tr>
            </thead>
            <tbody>
              {movements.map((m) => (
                <tr key={m.id} className={TABLE_ROW}>
                  <td className={TABLE_CELL}>{formatDate(m.purchaseDate)}</td>
                  <td className={TABLE_CELL}>{formatCurrency(m.purchaseAmount)}</td>
                  <td className={`${TABLE_CELL} font-semibold text-emerald-700`}>
                    +{formatCurrency(m.commissionAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTable>
        {movements.length === 0 && (
          <p className="p-6 text-sm text-slate-400">Nessun acquisto con commissione.</p>
        )}
      </div>
    </div>
  );
};

export default PromoterStudenteDetail;
