const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'darker-gray': '#111111',
        gray: colors.neutral
      }
    },
    minWidth: {
      0: '0',
      '1/4': '25%',
      '3/4': '75%',
      '1/2': '50%',
      full: '100%'
    }
  },
  variants: {},
  plugins: []
}
