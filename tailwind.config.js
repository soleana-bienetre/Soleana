/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdf9f4',
          100: '#f8f0e3',
          200: '#f0e0c8',
          300: '#e5c9a6',
          400: '#d9ae82',
          500: '#cc9360',
          600: '#b87840',
          700: '#9a6235',
          800: '#7d4f2c',
          900: '#654024',
        },
        sage: {
          50: '#f4f7f2',
          100: '#e6ede2',
          200: '#cddbc6',
          300: '#aac2a0',
          400: '#82a476',
          500: '#638a55',
          600: '#4d6e41',
          700: '#3e5835',
          800: '#33472c',
          900: '#2a3b25',
        },
        ecru: {
          50: '#fefcf8',
          100: '#fdf8ee',
          200: '#faefd6',
          300: '#f5e2b3',
          400: '#eed08a',
          500: '#e5bb63',
          600: '#d6a040',
          700: '#b38232',
          800: '#8f672b',
          900: '#755426',
        },
        nude: {
          50: '#fdf8f5',
          100: '#f9ede6',
          200: '#f2d8ca',
          300: '#e8bca5',
          400: '#db9878',
          500: '#cc7853',
          600: '#b85e3a',
          700: '#9a4c30',
          800: '#7d3e28',
          900: '#673422',
        },
        cream: '#faf6f0',
        ivory: '#f7f3ec',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      fontSize: {
        '5xl': ['3rem', { lineHeight: '1.15' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
