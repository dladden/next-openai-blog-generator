/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: "var(--font-ubuntu)",
        body: "var(--font-open-serif)",
        heading: "var(--font-open-serif)",
      },
      gridTemplateColumns: {
        sidebar: "300px auto", //  for sidebar layout. adds grid-cols-sidebar class
      },
      gridTemplateRows: {
        //  for the navbar layout. adds grid-rows-header class
      },
    },
  },
  plugins: [],
};
