import React from "react";
import type { Material } from "../types";
import { MATERIAL_TYPE_LABELS } from "../types";
import { formatDateShort } from "../utils/format";

interface RecentMaterialsProps {
  materials: Material[];
}

const RecentMaterials: React.FC<RecentMaterialsProps> = ({ materials }) => {
  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Materiali recenti</h2>
      <div className="space-y-3">
        {materials.map((mat) => (
          <div
            key={mat.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {MATERIAL_TYPE_LABELS[mat.type]}
              </p>
              <p className="text-base font-semibold text-slate-900 mt-0.5">{mat.title}</p>
              <p className="text-xs text-slate-400 mt-1">{formatDateShort(mat.date)}</p>
            </div>
            <button
              type="button"
              className="shrink-0 px-4 py-2 text-sm font-semibold rounded-xl bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors"
            >
              Apri
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentMaterials;
