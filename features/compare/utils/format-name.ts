export const formatShortName = (name?: string) => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  
  if (parts.length < 2) return name;
  return `${parts[0]?.[0] ?? ""}. ${parts.slice(1).join(" ")}`.trim();
};