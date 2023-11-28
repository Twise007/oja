/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "cl-acn": "var(--color-action)",
        "cl-acn2": "var(--color-action2)",
        "cl-white": "var(--color-white)",
        "cl-sec": "var(--color-sec)",
        "cl-black": "var(--color-black)",
        "bg-dark": "var(--dark-blue)",
      },
    },
  },
  plugins: [require("daisyui")],
};
