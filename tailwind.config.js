/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // light: {
        //   primary: {
        //   DEFAULT: "#1DB954",
        //   hover: "#1ED760",
        //   },
        //   background: {
        //     main: "#091020",
        //     card: "#101b2b",
        //   },
        //   ui: {
        //     border: "#334155",
        //   },
        //   text: {
        //     primary: "#F8FAFC",
        //     secondary: "#94A3B8",
        //     muted: "#64748B",
        //   },
        // },
        dark: {
          background: {
            main: "#091020",
            card: "#101b2b",
          },
          ui: {
            border: "#334155",
          },
          text: {
            primary: "#F8FAFC",
            secondary: "#94A3B8",
            muted: "#64748B",
          },
        },

        light: {
          background: {
            main: "#F8FAFC",
            card: "#FFFFFF",
          },
          ui: {
            border: "#CBD5E1",
          },
          text: {
            // primary: "#0F172A",
            primary: "#091020",
            secondary: "#334155",
            muted: "#64748B",
          },
        },
        semantic: {
          success: "#22C55E",
          warning: "94A3B8",
          error: "#EF4444",
          info: "#38BDF8",
        },
      },

      fontFamily: {
        heading: ["var(--font-oswald)", "system-ui", "sans-serif"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
