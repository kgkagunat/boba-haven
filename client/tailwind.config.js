module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        'twinkle': ['Twinkle Star', 'cursive'],
        'gamja': ['Gamja Flower', 'cursive'],
      },
      keyframes: {
        subtleBounce: {
          '0%': { transform: 'translateY(0)' },
          '20%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-8px)' },
          '50%': { transform: 'translateY(0)' },
          '60%': { transform: 'translateY(-5px)' },
          '80%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        subtleBounce: 'subtleBounce 1s forwards'
      },
      backgroundImage: theme => ({
        'radial-gradient-white-pink': 'radial-gradient(circle, #FFFFFF, #FFCEFF)',
      }),
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
