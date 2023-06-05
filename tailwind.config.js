const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'darker-gray': '#111111',
        gray: colors.neutral
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')]
}
