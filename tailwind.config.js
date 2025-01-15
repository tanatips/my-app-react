/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cschat': ['CS ChatThai', 'sans-serif'],
      },
    },
  },
  plugins: [],
}