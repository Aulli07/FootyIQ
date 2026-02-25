/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1DB954",
          hover: "#1ED760"
        },
        background: {
          main: "#091020",
          card: "#101b2b"
        },
        ui: {
          border: "#334155",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
          muted: "#64748B"
        },
        semantic: {
          success: "#22C55E",
          warning: "94A3B8",
          error: "#EF4444",
          info: "#38BDF8"
        }
      },

      fontFamily: {
        heading: ["var(--font-oswald)", "system-ui", "sans-serif"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },

      // colors: {
      //   primary: "#1E40AF",
      //   secondary: "#F59E0B",
      //   accent: "#10B981",
      // },
    },
  },
  plugins: [],
};
