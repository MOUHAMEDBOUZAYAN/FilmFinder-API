/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Cette ligne doit être à la racine de la configuration
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#FF9E5E',
          500: '#FF7B3D',
          600: '#E05E2B',
        },
        secondary: {
          400: '#4FD1C5',
          500: '#38B2AC',
          600: '#2C7A7B',
        },
        dark: {
          700: '#2D3748',
          800: '#1A202C',
          900: '#171923',
        },
        light: {
          100: '#F7FAFC',
          200: '#EDF2F7',
          300: '#E2E8F0',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    }
  },
  plugins: [],
}