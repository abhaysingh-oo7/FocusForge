/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#16181d',
        'secondary': '#1e2028',
        'accent': '#7c67fb',
        'text': '#f1f1f3',
        'textSecondary': '#a1a1aa',
        'light-primary': '#f8fafc',
        'light-secondary': '#f1f5f9',
        'light-text': '#334155',
        'light-textSecondary': '#64748b',
      },
    },
  },
  plugins: [],
} 