import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../features/area-personale/promoter/components/PageHeader";
import StudentStatusBadge from "../../../features/area-personale/promoter/components/StudentStatusBadge";
import SpendProgressBar from "../../../features/area-personale/promoter/components/SpendProgressBar";
import ResponsiveTable from "../../../features/area-personale/promoter/components/ResponsiveTable";
import HowYouEarnCard from "../../../features/area-personale/promoter/components/HowYouEarnCard";
import { promoterStudentRows } from "../../../features/area-personale/promoter/data";
import { formatCurrency } from "../../../features/area-personale/promoter/utils/format";
import {
  TABLE_CELL,
  TABLE_HEAD,
  TABLE_ROW,
  TABLE_ROW_CLICKABLE,
} from "../../../features/area-personale/promoter/components/tableStyles";

const PromoterStudenti: React.FC = () => {
  const rows = [...promoterStudentRows].sort((a, b) =>
    b.student.acquiredAt.localeCompare(a.student.acquiredAt)
  );

  return (
    <div className="min-w-0 max-w-full">
      <PageHeader
        title="Studenti"
        description="Studenti acquisiti tramite il tuo referral. L'attribuzione è permanente."
      />

      <div className="sm:hidden space-y-3 mb-8">
        {rows.map((row) => (
          <Link
            key={row.student.id}
            to={`/area-personale/promoter/studenti/${row.student.id}`}
            className="block p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <p className="font-semibold text-slate-900">{row.student.label}</p>
              <StudentStatusBadge status={row.student.status} />
            </div>
            <SpendProgressBar validSpend={row.validSpend} />
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-slate-600">
              <span>Commissione: {formatCurrency(row.commissionEarned)}</span>
              <span className="text-right">Residuo: {formatCurrency(row.remaining)}</span>
            </div>
            {row.isComplete && (
              <span className="inline-flex mt-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                Commissione completata
              </span>
            )}
          </Link>
        ))}
      </div>

      <div className="hidden sm:block bg-white rounded-3xl border border-slate-100 shadow-sm min-w-0 mb-8">
        <ResponsiveTable>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className={TABLE_HEAD}>Studente</th>
                <th className={TABLE_HEAD}>Stato</th>
                <th className={TABLE_HEAD}>Spesa valida</th>
                <th className={TABLE_HEAD}>Commissione</th>
                <th className={TABLE_HEAD}>Potenziale residuo</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.student.id} className={TABLE_ROW_CLICKABLE}>
                  <td className={TABLE_CELL}>
                    <Link
                      to={`/area-personale/promoter/studenti/${row.student.id}`}
                      className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {row.student.label}
                    </Link>
                    {row.isComplete && (
                      <span className="block mt-1 text-xs font-semibold text-emerald-600">
                        Commissione completata
                      </span>
                    )}
                  </td>
                  <td className={TABLE_CELL}>
                    <StudentStatusBadge status={row.student.status} />
                  </td>
                  <td className={TABLE_CELL}>
                    <div className="min-w-[120px]">
                      <SpendProgressBar validSpend={row.validSpend} />
                    </div>
                  </td>
                  <td className={`${TABLE_CELL} font-semibold text-slate-800`}>
                    {formatCurrency(row.commissionEarned)}
                  </td>
                  <td className={TABLE_CELL}>{formatCurrency(row.remaining)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTable>
      </div>

      <HowYouEarnCard />
    </div>
  );
};

export default PromoterStudenti;
