/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm neutral scale — linen tones
        sand: {
          50:  '#f9f7f5',
          100: '#f4efec',
          200: '#ede4dc',
          300: '#dad5c7',
          400: '#d2cdba',
          500: '#d6c7b9',
          600: '#b8a898',
          700: '#9a8878',
          800: '#7c6a5c',
          900: '#5e4e42',
        },
        // Olive-sage green scale — natural accents & badges
        sage: {
          50:  '#f4f4ef',
          100: '#e4e5db',
          200: '#cdd0c3',
          300: '#9ea187',
          400: '#9b9e7b',
          500: '#8c9480',
          600: '#737860',
          700: '#5c6050',
          800: '#464a3e',
          900: '#2d3028',
        },
        // Warm taupe scale — used for stars / golden accents
        ecru: {
          50:  '#f9f7f5',
          100: '#f4efec',
          200: '#ede4dc',
          300: '#dad5c7',
          400: '#d6c7b9',
          500: '#c4b5a5',
          600: '#b8a898',
          700: '#9a8878',
          800: '#7c6a5c',
          900: '#5e4e42',
        },
        // Primary action color — olive green (replaces nude/terracotta)
        nude: {
          50:  '#f4f4ef',
          100: '#e4e5db',
          200: '#cdd0c3',
          300: '#9ea187',
          400: '#9b9e7b',
          500: '#919471',
          600: '#8c9480',
          700: '#737860',
          800: '#5c6050',
          900: '#464a3e',
        },
        cream: '#f4efec',
        ivory: '#ede4dc',
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
