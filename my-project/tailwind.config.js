/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#FF6B00', // Orange as primary color
          600: '#E05E00',
        },
        secondary: {
          500: '#00A8CC', // Teal as secondary color
          600: '#0095B6',
        },
        dark: {
          800: '#1A1A2E',
          900: '#16213E',
        }
      }
    }
  }
}