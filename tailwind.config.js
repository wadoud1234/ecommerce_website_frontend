/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    './src/**/*.{html,js,svelte,ts}',
    "./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    screens: {
      // Customize breakpoints as needed:
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1792px',
      '4xl': '2048px',
      '5xl': '2560px',
    },
    extend: {
      colors: {
        'primary': '#0070f3',
        'secondary': '#f3f4f6',
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
}

