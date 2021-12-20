module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Montserrat', 'san-serif'],
      },
      colors: {
        'dark-blue': "#0F1624"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
