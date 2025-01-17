/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['"Syne"'], // Add Syne to the font family
      },
      fontWeight: {
        syne: "400 800", // Define the range of weights for Syne
      },
    },
  },
  plugins: [],
}