export const getQuickActionIcon = (key: string, mounted: boolean, isDark: boolean) => {
  if (key === "comment") {
    return mounted && !isDark
      ? "/images/comment-dark.png"
      : "/images/comment-light.png";
  }

  if (key === "like") {
    return mounted && !isDark
      ? "/images/like-dark.png"
      : "/images/like-light.png";
  }

  return mounted && !isDark
    ? "/images/view-dark.png"
    : "/images/view-light.png";
};