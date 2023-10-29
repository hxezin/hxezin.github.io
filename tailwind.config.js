/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--background-color-primary)',
        second: 'var(--background-color-second)',
      },
      textColor: {
        primary: 'var(--color-primary)',
        second: 'var(--color-second)',
        accent: 'var(--accent-color-primary)',
      },
      borderColor: {
        gray: 'var(--border-color-gray)',
      },
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
