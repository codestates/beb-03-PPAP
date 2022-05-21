module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },

  resolver: {
    extraNodeModules: require("node-libs-react-native"),
    sourceExts: ["jsx", "js", "ts", "tsx", "cjs"],
  },
};
