export function formatCredits(amount: number): string {
  const abs = Math.abs(amount);
  const formatted = `${abs} credit${abs === 1 ? "o" : "i"}`;
  return amount < 0 ? `−${formatted}` : amount > 0 ? `+${formatted}` : formatted;
}

export function formatCreditsBalance(amount: number): string {
  return `${amount} credit${amount === 1 ? "o" : "i"}`;
}

export function formatDate(dateStr: string): string {
  const formatted = new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(dateStr));
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function formatDateShort(dateStr: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
}

export function formatTimeRange(start: string, end: string): string {
  return `${start}–${end}`;
}

export function formatDeadline(dateStr: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}
