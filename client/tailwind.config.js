const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: "'Inter', sans-serif",
      },
      animation: {
        grow: "grow 1200ms infinite linear",
        skeleton: "skeleton 1200ms infinite linear",
      },
      keyframes: {
        skeleton: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        grow: {
          "0%": {
            transform: "scale(0)",
          },
          "50%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(0)",
          },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("not-disabled", "&:not(:disabled)");
    }),
  ],
};
