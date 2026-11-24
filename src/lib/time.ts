/**
 * "Today" in Dubai. Used for the footer year and the upcoming-events
 * filter.
 */
export async function getToday(): Promise<{ iso: string; year: number }> {
  const iso = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dubai" }).format(new Date());
  return { iso, year: Number(iso.slice(0, 4)) };
}
