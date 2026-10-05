export function kolkataClock(date: Date): { clock: string; hour: number } {
  try {
    const clock = date.toLocaleTimeString("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
    });
    return { clock, hour: parseInt(clock.slice(0, 2), 10) };
  } catch {
    return { clock: "--:--", hour: 12 };
  }
}

export function clockNote(hour: number): string {
  if (hour < 8) return "probably asleep";
  if (hour < 10) return "probably on coffee one";
  if (hour < 20) return "probably shipping";
  return "probably reading docs";
}
