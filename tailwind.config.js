/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rufus: {
          bg: '#FFFFFF',
          panel: '#112240',
          blue: '#1A6EDB',
          cyan: '#00C2D1',
          teal: '#0A8EA0',
          warning: '#F4A124',
          textMain: '#0D1B2A',
          textMuted: '#4A6080',
          success: '#00C896',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
