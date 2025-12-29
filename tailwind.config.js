/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // from first file
  ],

  theme: {
    extend: {
      /* ===== FROM FIRST FILE ===== */
      animation: {
        "spin-slow": "spin 7s linear infinite",
      },
      screens: {
        "3xl": "2200px",
      },

      /* ===== FROM SECOND FILE ===== */
      colors: {
        primary: "#01266b",
        secondary: "#d8e4ed",
        white: "#ffffff",
        gray: {
          light: "#716B6B",
          DEFAULT: "#4f575e",
          dark: "#292d30",
        },
        green: {
          light: "#159153ff",
          DEFAULT: "#019117",
          dark: "#084d11",
        },
        red: {
          light: "#FCA5A5",
          DEFAULT: "#ff1c1c",
          dark: "#B91C1C",
        },
        orange: {
          light: "#FFDD00",
          DEFAULT: "#fc9c7e",
          dark: "#fc9c7e",
        },
        blue: {
          light: "#DEF0FE",
          DEFAULT: "#2BA2FFCF",
          base: "#4AB0FF12",
          dark: "#72C1FF",
        },
      },

      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Poppins", "ui-sans-serif", "system-ui"],
        quicksand: ["Quicksand", "ui-sans-serif", "system-ui"],
      },
    },
  },

  /* ===== FROM FIRST FILE ===== */
  plugins: [require("daisyui")],

  daisyui: {
    themes: ["light", "dark"],
  },

  darkMode: ["class", '[data-theme="dark"]'],
};
