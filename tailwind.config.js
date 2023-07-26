/* eslint-disable @typescript-eslint/no-var-requires */
const plugins = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/*/.{ts,tsx}', './src/**/*.{ts,tsx}'],
  corePlugins: {
    container: false,
    preflight: true
  },
  theme: {
    screens: {
      sm: '480px',
      // => @media (min-width: 576px) { ... }

      md: '720px',
      // => @media (min-width: 960px) { ... }

      lg: '1024px',
      // => @media (min-width: 1440px) { ... }
      xl: '1280px'
      // => @media (min-width: 1280px) { ... }
    },
    extend: {}
  },
  plugins: [
    plugins(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.5xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      });
      addComponents({
        '.container-fluid': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      });
    }),
    require('@tailwindcss/line-clamp')
  ]

  // eslint-disable-next-line prettier/prettier
};
