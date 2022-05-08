const tailwindcss = require("tailwindcss");
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [tailwindcss("./tailwind.config.js")],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
