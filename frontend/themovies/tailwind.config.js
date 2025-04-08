/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      screens: {
        'xs': '475px',
      },
      colors: {
        primary: { 
          DEFAULT: '#000000',
          light:"#FFFFFF",
          dark: '#1A1B2B' 
        },
        secondary: '#8D99AE',
        light: '#EDF2F4',
        accent: '#EF233C',
        darkaccent: '#D90429'
      },
    },
  },
}