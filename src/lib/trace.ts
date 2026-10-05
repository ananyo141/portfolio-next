export const TRACE_START_YEAR = 2023;
const TRACE_MIN_END_YEAR = 2026;

/** Last year on the axis: at least 2026, growing with the calendar so "now" never leaves the track. */
export function traceEndYear(now: Date): number {
  return Math.max(TRACE_MIN_END_YEAR, now.getFullYear());
}

export function traceYears(now: Date): number[] {
  const end = traceEndYear(now);
  return Array.from({ length: end - TRACE_START_YEAR + 1 }, (_, i) => TRACE_START_YEAR + i);
}

export function traceMonths(now: Date): number {
  return traceYears(now).length * 12;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function monthIndex(ym: string): number {
  const [y, m] = ym.split("-").map(Number);
  return (y - TRACE_START_YEAR) * 12 + (m - 1);
}

export function currentMonthIndex(now: Date): number {
  return (now.getFullYear() - TRACE_START_YEAR) * 12 + now.getMonth();
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function nowLinePosition(now: Date): number {
  return clamp01((currentMonthIndex(now) + 0.5) / traceMonths(now));
}

export function spanGeometry(
  start: string,
  end: string | null,
  now: Date
): { left: number; width: number } {
  const months = traceMonths(now);
  const left = clamp01(monthIndex(start) / months);
  const rightRaw = end ? (monthIndex(end) + 1) / months : nowLinePosition(now);
  const right = clamp01(rightRaw);
  return { left, width: Math.max(1 / months, right - left) };
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
