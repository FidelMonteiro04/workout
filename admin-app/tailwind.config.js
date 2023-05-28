/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: "#F56600",
          500: "#F96900",
          400: "#FF7C1F",
        },
        secondary: {
          500: "#0C0F0A",
        },
        gray: {
          500: "#999595",
          400: "#D9D9D9",
        },
      },
    },
  },
  plugins: [],
};
