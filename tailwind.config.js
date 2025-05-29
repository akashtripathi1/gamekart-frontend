module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './node_modules/shadcn-ui/dist/**/*.{js,jsx,ts,tsx}',
    // Add other paths as needed
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate')],
};