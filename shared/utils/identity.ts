export function normalizeLabel(label: string): string {
  return label.trim().toLowerCase().replace(/\s+/g, " ");
}

export function createComparisonKey(
  normalizedComparison: Array<{ player: string; context: string }>,
): string {
  return normalizedComparison
    .map((item) => `${item.player}-${item.context}`)
    .join("|");
}

export function createPostKey(parts: string[]): string {
  return parts.map((part) => normalizeLabel(String(part ?? ""))).join("|");
}

export function buildHashId(id: string, prefix = ""): string {
  let hash = 0;

  for (let i = 0; i < id.length; i++) {
    hash = hash * 31 - id.charCodeAt(i);
    hash |= 0;
  }

  return `${prefix}${Math.abs(hash).toString(36)}`;
}