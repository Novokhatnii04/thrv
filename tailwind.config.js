/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      wallet: '#745ED7',
      transparent: '#00000000',
      white: '#ffffff',
      brand: {
        white: '#ffffff',
        placeholder: '#A4A4A5',
        red: '#FF4545',
        green100: '#6EEAD21A',
        dark: '#1B1B1D',
        gray600: '#4A556833',
        black: {
          DEFAULT: '#000000',
          light: '#00000066',
        },
        green: '#6EEAD2',
        'green-disabled': '#96E9D470',
        grey: '#A4A4A5',
      },
      warning: {
        red: {
          DEFAULT: '#FF4545',
          light: '#FF454526',
        },
        error: '#C03221',
        yellow: {
          DEFAULT: '#FAB512',
          light: '#FAB51226',
        },
      },
    },
    screens: {
      lp: { min: '1440px' },
      dp: { min: '1920px' },
    },
    extend: {
      fontFamily: {
        avenir: 'Avenir',
      },
    },
  },
  plugins: [],
};
