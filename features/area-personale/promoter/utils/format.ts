export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
}

export function formatDateLong(dateStr: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

export function formatDuration(hours: number): string {
  if (hours === 1) return "1 h";
  const formatted = Number.isInteger(hours)
    ? String(hours)
    : hours.toLocaleString("it-IT", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return `${formatted} h`;
}

export function formatPercent(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}

export function formatPeriod(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const sameMonth =
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear();

  if (sameMonth) {
    return `${startDate.getDate()}–${endDate.getDate()} ${new Intl.DateTimeFormat("it-IT", {
      month: "long",
      year: "numeric",
    }).format(endDate)}`;
  }

  return `${formatDate(start)} – ${formatDate(end)}`;
}
