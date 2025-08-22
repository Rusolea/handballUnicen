/* eslint-env node */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Tus colores personalizados
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
      // Tu fuente personalizada
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      // La nueva animación para el carrusel de sponsors
      animation: {
        scroll: 'scroll 40s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}; 