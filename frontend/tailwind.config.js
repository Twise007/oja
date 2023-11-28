/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "cl-acn": "var(--color-action)",
        "cl-white": "var(--color-white)",
        "bg-sec": "var(--bg-sec)",
        "bg-dark": "var(--dark-blue)",
      },
    },
  },
  plugins: [require("daisyui")],
};
