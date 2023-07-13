module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      borderColor: {
        customGrey: '#131212',
        customGreen: '#7d8d7b',
      },
      backgroundColor: {
        customGrey: '#131212',
        customGreen: '#7d8d7b',
      },
      boxShadowColor: {
        customGrey: '#131212',
        customGreen: '#7d8d7b',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
