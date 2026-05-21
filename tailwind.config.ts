import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cl-dark': 'var(--cl-dark)',
        'cl-light': 'var(--cl-light)',
        'cl-mid-gray': 'var(--cl-mid-gray)',
        'cl-light-gray': 'var(--cl-light-gray)',
        'cl-orange': 'var(--cl-orange)',
        'cl-orange-soft': 'var(--cl-orange-soft)',
        'cl-blue': 'var(--cl-blue)',
        'cl-blue-soft': 'var(--cl-blue-soft)',
        'cl-green': 'var(--cl-green)',
        'cl-green-soft': 'var(--cl-green-soft)',
      },
      fontFamily: {
        display: ['var(--font-poppins)', 'Arial', 'sans-serif'],
        body: ['var(--font-lora)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(20,20,19,0.06), 0 1px 2px rgba(20,20,19,0.04)',
        hover: '0 4px 12px rgba(20,20,19,0.10)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        pill: 'var(--radius-pill)',
      }
    },
  },
  plugins: [],
};
export default config;
