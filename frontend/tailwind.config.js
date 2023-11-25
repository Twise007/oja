/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "cl-acn": "var(--color-action)",
        "cl-white": "var(--color-white)",
      },
    },
  },
  plugins: [require("daisyui")],
};
