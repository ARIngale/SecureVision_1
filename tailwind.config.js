/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0ff',
          100: '#bdd6ff',
          200: '#94bbff',
          300: '#6ba0ff',
          400: '#4285ff',
          500: '#196aff',
          600: '#0052e6',
          700: '#003bb3',
          800: '#002580',
          900: '#000e4d',
        },
      },
    },
  },
  plugins: [],
}

