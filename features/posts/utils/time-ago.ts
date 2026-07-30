export function timeAgo(date: string) {
  const timestamp = Number(date);
  const normalizedDate = Number.isFinite(timestamp)
    ? new Date(timestamp)
    : new Date(date);

  const elapsedInMinutes = Math.floor(
    (new Date().getTime() - normalizedDate.getTime()) / (1000 * 60),
  );

  if (elapsedInMinutes < 60) return `${Math.max(elapsedInMinutes, 1)}m`;
  if (elapsedInMinutes < 1440) return `${Math.floor(elapsedInMinutes / 60)}h`;
  return `${Math.floor(elapsedInMinutes / 1440)}d`;
}
