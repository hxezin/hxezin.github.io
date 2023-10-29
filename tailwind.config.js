/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: '' },
            'code::after': { content: '' },
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
