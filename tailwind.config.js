/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#0a0a0f',
        'cyber-card': 'rgba(17, 25, 40, 0.75)',
        'cyber-blue': '#00f3ff',
        'cyber-pink': '#ff00ff',
        'cyber-purple': '#9d00ff',
        'cyber-green': '#00ff88',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          'from': { boxShadow: '0 0 20px #00f3ff' },
          'to': { boxShadow: '0 0 30px #ff00ff, 0 0 40px #ff00ff' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
        }
