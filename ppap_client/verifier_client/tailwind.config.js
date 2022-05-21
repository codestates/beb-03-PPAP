const tailwindcss = require("tailwindcss");
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [tailwindcss("./tailwind.config.js"), require("autoprefixer")],
};
