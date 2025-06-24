/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        azulUnicen: '#00639b',
        verdeUnicen: '#338580',
        limaUnicen: '#98c124',
        celesteUnicen: '#0ab7e1',
        rojoUnicen: '#e32328',
        violetaUnicen: '#5f2262',
        amarilloUnicen: '#f9b733',
        azulOscuroUnicen: '#0d426f',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 