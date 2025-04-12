/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Activation du dark mode basé sur les classes
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#FF9E5E',
          500: '#FF7B3D',
          600: '#E05E2B',
        },
        dark: {
          700: '#2D3748',
          800: '#1A202C',
          900: '#171923',
        },
        light: {
          100: '#F7FAFC',
          200: '#EDF2F7',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    }
  },
  plugins: [],
};