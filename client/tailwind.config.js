/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#93acf5",
        dark: "#313a44",
      },
    },
  },
  daisyui: {
    themes: ["dark", "light"],
  },
  plugins: [require("daisyui")],
});

