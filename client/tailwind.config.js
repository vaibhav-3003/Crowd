/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ef9995",
          secondary: "#a4cbb4",
          accent: "#dc8850",
          neutral: "#2e282a",
          "base-100": "#e4d8b4",
          info: "#2463eb",
          success: "#16a249",
          warning: "#db7706",
          error: "#dc2828",
        },
      },
    ],
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};

