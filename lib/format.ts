// Formats an ISO date ("2026-02-15") as "Feb 2026" without timezone drift
export function formatDate(iso: string): string {
  const [year, month] = iso.split("-").map(Number);
  if (!year || !month) return iso;
  const label = new Date(Date.UTC(year, month - 1, 1)).toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  return `${label} ${year}`;
}
