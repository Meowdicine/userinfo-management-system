module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#78C4DD',
          300: '#A38EDE',
          DEFAULT: '#5830C5',
          600: '#855CF8',
        },

        black: {
          50: '#000000',
          100: '#48484A',
          200: '#1C1C1E',
          DEFAULT: '#3A3A3C',
        },

        placeholder: {
          DEFAULT: '#cbd5e0',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
