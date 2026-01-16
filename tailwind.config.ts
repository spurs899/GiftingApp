import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef5ff',
          100: '#fce8ff',
          200: '#f9d1ff',
          300: '#f5aaff',
          400: '#ee73ff',
          500: '#e23cff',
          600: '#c318e8',
          700: '#a10ec4',
          800: '#850fa1',
          900: '#6e1082',
        },
      },
    },
  },
  plugins: [],
};
export default config;
