/**
 * Font utilities used throughout the app.
 *
 * We intentionally avoid `next/font/*` here because Turbopack can fail to
 * resolve its internal font loader module in some setups.
 *
 * Fonts are loaded via CSS in `app/globals.css` and applied via Tailwind
 * classes (`font-sans`, `font-heading`).
 */

export const poppins = {
  className: "font-sans",
  variable: "",
} as const;

export const oswald = {
  className: "font-heading",
  variable: "",
} as const;
