/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          500: '#6366F1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
        },
        accent: {
          50: '#cffafe',
          100: '#a5f3fc',
          500: '#22D3EE',
          600: '#06b6d4',
          700: '#0891b2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgb(31 41 55)',
            a: {
              color: 'rgb(99 102 241)',
              '&:hover': {
                color: 'rgb(79 70 229)',
              },
            },
            strong: {
              color: 'rgb(17 24 39)',
            },
            code: {
              backgroundColor: 'rgb(243 244 246)',
              color: 'rgb(107 114 128)',
              padding: '0.125rem 0.375rem',
              borderRadius: '0.25rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              padding: '0',
            },
            pre: {
              backgroundColor: 'rgb(17 24 39)',
              color: 'rgb(229 231 235)',
            },
          },
        },
        dark: {
          css: {
            color: 'rgb(209 213 219)',
            a: {
              color: 'rgb(129 140 248)',
              '&:hover': {
                color: 'rgb(165 180 252)',
              },
            },
            strong: {
              color: 'rgb(243 244 246)',
            },
            code: {
              backgroundColor: 'rgb(31 41 55)',
              color: 'rgb(156 163 175)',
            },
            pre: {
              backgroundColor: 'rgb(17 24 39)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
