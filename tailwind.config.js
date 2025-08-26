/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'funny-red': '#dc2626',
        'funny-dark-red': '#991b1b',
        'funny-darker-red': '#7f1d1d',
        'funny-black': '#1a1a1a',
        'funny-gray': '#2d2d2d',
        'funny-light-gray': '#404040',
      },
      fontFamily: {
        'comic': ['Comic Neue', 'Comic Sans MS', 'cursive'],
      },
      animation: {
        'funny-bounce': 'funny-bounce 4s ease-in-out infinite',
        'shine': 'shine 3s infinite',
      },
      keyframes: {
        'funny-bounce': {
          '0%': { backgroundPosition: '0% 50%' },
          '25%': { backgroundPosition: '100% 50%' },
          '50%': { backgroundPosition: '50% 100%' },
          '75%': { backgroundPosition: '0% 100%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'shine': {
          '0%': { transform: 'translateX(-100%) translateY(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(100%) translateY(100%) rotate(45deg)' },
        },
      },
    },
  },
  plugins: [],
}
