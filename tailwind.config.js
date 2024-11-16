/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [
    tailwindScrollbar, // New ES Module syntax
  ],
}