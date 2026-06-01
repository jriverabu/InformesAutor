/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        restaurant: {
          dark: '#11141a',
          card: '#1a1f29',
          border: '#2a3241',
          accent: '#cfa86b', // Tono Champagne de Autor Cúcuta
          muted: '#8a94a6',
          whatsapp: '#25D366',
          instagram: '#E1306C',
          interaction: '#3b82f6'
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
