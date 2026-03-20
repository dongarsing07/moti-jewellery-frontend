/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E8A4B0', // Soft rose pink
        secondary: '#D4AF37', // Warm gold
        accent: '#F8C3C9', // Light blush
        soft: '#FFF1F3', // Very light pink
        pinkLight: '#FFE4E8', // Misty rose
        pinkBg: '#FFF9FA', // Almost white pink
        goldLight: '#F5E6D3', // Soft gold
        textDark: '#4A4A4A', // Soft dark gray
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}