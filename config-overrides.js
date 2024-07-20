const webpack = require("webpack");

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve("stream-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    zlib: require.resolve("browserify-zlib"),
    buffer: require.resolve("buffer"),
    process: require.resolve("process/browser"),
  };
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ];

  // Add this new rule to handle .mjs files
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });

  return config;
};
