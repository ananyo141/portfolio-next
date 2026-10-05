export const TRACE_START_YEAR = 2023;
export const TRACE_MONTHS = 48; // Jan 2023 → Dec 2026
export const TRACE_YEARS = [2023, 2024, 2025, 2026];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function monthIndex(ym: string): number {
  const [y, m] = ym.split("-").map(Number);
  return (y - TRACE_START_YEAR) * 12 + (m - 1);
}

export function currentMonthIndex(now: Date): number {
  return (now.getFullYear() - TRACE_START_YEAR) * 12 + now.getMonth();
}

export function nowLinePosition(now: Date): number {
  return (currentMonthIndex(now) + 0.5) / TRACE_MONTHS;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function spanGeometry(
  start: string,
  end: string | null,
  now: Date
): { left: number; width: number } {
  const left = clamp01(monthIndex(start) / TRACE_MONTHS);
  const rightRaw = end ? (monthIndex(end) + 1) / TRACE_MONTHS : nowLinePosition(now);
  const right = clamp01(rightRaw);
  return { left, width: Math.max(1 / TRACE_MONTHS, right - left) };
}

export function spanMonths(start: string, end: string | null, now: Date): number {
  const s = monthIndex(start);
  return end ? monthIndex(end) - s + 1 : currentMonthIndex(now) - s;
}

export function formatDuration(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} mo`;
  return m ? `${y} yr ${m} mo` : `${y} yr`;
}

function label(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export function formatPeriod(start: string, end: string | null): string {
  return `${label(start)} — ${end ? label(end) : "Present"}`;
}
