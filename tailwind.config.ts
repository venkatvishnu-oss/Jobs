import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DEDBC8',
      },
      fontFamily: {
        sans: ['var(--font-almarai)', 'sans-serif'],
        serif: ['var(--font-instrument)', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
