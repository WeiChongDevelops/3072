module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      borderColor: {
        customGrey: '#131212',
        customGreen: '#70806e',
      },
      backgroundColor: {
        customGrey: '#131212',
        customGreen: '#70806e',
      },
      boxShadowColor: {
        customGrey: '#131212',
        customGreen: '#7d8d7b',
        lightGreen: '#c5d4c3'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
