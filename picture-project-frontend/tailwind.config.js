/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  mode: "jit",
  theme: {
    extend: {
      container: {
        center: true,
      },
      width: {
        "500": "500px",
      },
      height: {
        "350": "350px",
      }
    },
  },
  plugins: [],
};
