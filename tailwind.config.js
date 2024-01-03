/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: true,
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        black: "#262626",
        blue: "#0095F6",
        white: "#FFFFFF",
        darkWhite: "#FAFAFA",
        borderColor: "#DBDBDB",
        gradient: "",
      },
      fontFamily: {
        instaSans: ["Instagram Sans", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "modal-pop": {
          "0%": { transform: "scale(1.4)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "modal-pop": "modal-pop .2s",
      },
    },
  },
  plugins: [],
};
