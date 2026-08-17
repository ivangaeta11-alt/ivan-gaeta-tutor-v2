import React from "react";
import KpiCard from "./KpiCard";

interface KpiItem {
  label: string;
  value: string;
  hint?: string;
}

interface KpiGridProps {
  items: KpiItem[];
  columns?: 2 | 4;
}

const KpiGrid: React.FC<KpiGridProps> = ({ items, columns = 4 }) => {
  const gridClass =
    columns === 4
      ? "grid grid-cols-2 lg:grid-cols-4 gap-4"
      : "grid sm:grid-cols-2 gap-4";

  return (
    <div className={gridClass}>
      {items.map((item) => (
        <KpiCard key={item.label} label={item.label} value={item.value} hint={item.hint} />
      ))}
    </div>
  );
};

export default KpiGrid;
