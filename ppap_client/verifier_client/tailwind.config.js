const tailwindcss = require("tailwindcss");
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        "ppap-navy": "#22313F",
      },
    },
  },
  plugins: [tailwindcss("./tailwind.config.js"), require("autoprefixer")],
};
