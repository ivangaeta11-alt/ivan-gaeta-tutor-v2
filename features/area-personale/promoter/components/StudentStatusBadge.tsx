import React from "react";
import type { StudentStatus } from "../types";
import { STUDENT_STATUS_LABELS } from "../types";

const STYLES: Record<StudentStatus, string> = {
  registrato: "bg-slate-50 text-slate-600 border-slate-200",
  demo: "bg-amber-50 text-amber-700 border-amber-100",
  cliente: "bg-emerald-50 text-emerald-700 border-emerald-100",
  inattivo: "bg-slate-100 text-slate-500 border-slate-200",
};

interface StudentStatusBadgeProps {
  status: StudentStatus;
}

const StudentStatusBadge: React.FC<StudentStatusBadgeProps> = ({ status }) => (
  <span
    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STYLES[status]}`}
  >
    {STUDENT_STATUS_LABELS[status]}
  </span>
);

export default StudentStatusBadge;
