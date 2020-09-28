module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'accent-1': '#333',
      },
    },
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '3/4': '75%',
      '1/2': '50%',
      'full': '100%',
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui')
  ],
}
