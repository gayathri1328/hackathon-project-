/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#6D1F3A',
          deep: '#6D1F3A',
          dark: '#481329',
          soft: '#8B3A55',
          light: '#F8EFF2',
          tint: '#F0DCE3',
          border: '#E2CCD5',
        },
        cream: {
          warm: '#FFF8F3',
          off: '#FFFCFA',
          soft: '#FBF5F0',
          border: '#EFE7E1',
        },
        charcoal: {
          DEFAULT: '#252124',
          dark: '#1B171A',
          muted: '#5C545A',
          light: '#7F757C',
          border: '#E5DFE3',
        },
        sage: {
          DEFAULT: '#4E7D6A',
          light: '#EDF5F1',
        },
        amber: {
          accent: '#D97706',
          light: '#FEF3C7',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'doodle': '3px 3px 0px 0px rgba(72, 19, 41, 0.9)',
        'doodle-sm': '2px 2px 0px 0px rgba(72, 19, 41, 0.9)',
        'doodle-lg': '5px 5px 0px 0px rgba(72, 19, 41, 0.9)',
        'soft': '0 8px 30px rgba(109, 31, 58, 0.06)',
        'card': '0 4px 20px -2px rgba(37, 33, 36, 0.05)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseSubtle: 'pulseSubtle 2.5s ease-in-out infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
