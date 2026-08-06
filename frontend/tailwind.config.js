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
          DEFAULT: '#2E7D32',
          dark: '#1B5E20',
          light: '#4CAF50',
          bg: '#E8F5E9',
        },
        secondary: {
          DEFAULT: '#4CAF50',
          dark: '#388E3C',
          light: '#81C784',
        },
        agriBg: '#F5F7FA',
        agriCard: '#FFFFFF',
        agriText: {
          DEFAULT: '#333333',
          muted: '#666666',
          light: '#888888',
        }
      },
      fontFamily: {
        marathi: ['"Baloo 2"', '"Noto Sans Devanagari"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(46, 125, 50, 0.08)',
        'glow': '0 0 15px rgba(76, 175, 80, 0.3)',
      }
    },
  },
  plugins: [],
}
