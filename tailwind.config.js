/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--background-color-primary)',
        secondary: 'var(--background-color-secondary)',
      },
      textColor: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--accent-color-01)',
        contrast: 'var(--color-contrast)',
      },
      borderColor: {
        primary: 'var(--border-color-gray)',
      },
      boxShadowColor: {
        primary: 'var(--accent-color-01)',
      },
      textDecorationColor: {
        primary: 'var(--accent-color-01)',
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
