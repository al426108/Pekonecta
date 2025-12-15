/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0F111A',
        'bg-card': '#151B26',
        'primary': '#1E40AF',
        'accent': '#3B82F6',
        'text-main': '#FFFFFF',
        'text-muted': '#9CA3AF',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
