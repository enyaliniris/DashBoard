/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, //  關掉 Tailwind Reset，避免影響 AntD
  },
  plugins: [],
}