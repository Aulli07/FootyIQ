/* Items (club store, competition store) filtered from the uniqueness of ids for each player */
export function uniqueById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

/* Getting the season years (start and end) from a season label such as 23/24, Returns 2023 , 2024 */
export function seasonYearFromLabel(label: string): number {
  const parts = String(label ?? "").split("/");
  const start = Number(parts[0]);

  if (Number.isNaN(start)) return new Date().getFullYear();
  return start < 100 ? 2000 + start : start;
}

export function seasonEndYearFromLabel(label: string): number {
  const parts = String(label ?? "").split("/");
  const end = Number(parts[1]);
  
  if (Number.isNaN(end)) return seasonYearFromLabel(label) + 1;
  return end < 100 ? 2000 + end : end;
}

/* Ensure that a value is a finite number, otherwise return 0 */
export function ensureNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}