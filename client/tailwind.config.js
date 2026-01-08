/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'apple-blue': '#0071e3',
        'apple-text': '#1d1d1f',
        'apple-gray': '#f5f5f7',
      },
    },
  },
  plugins: [],
}






