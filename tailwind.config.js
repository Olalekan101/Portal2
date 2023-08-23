/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        customGreen: "#305f32",
        altGreen: "#3AB65C",
        altRed: "#D41818",
      },
      fontSize: {
        baseFont: "12px",
      },
    },
  },
  plugins: [],
};
