const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = () => {
  const env = dotenv.config().parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  // console.log(envKeys)

  return {
    mode: "development",
    stats: {
      errorDetails: true,
    },
    entry: path.resolve(__dirname, "./src/index.js"),
    module: {
      rules: [
        {
          test: /\.css$/,
          include: [
            /node_modules\/react-datepicker/,
            /node_modules\/react-phone-number-input/,
            /node_modules\/react-responsive-carousel/,
          ],
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, "src"),
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|ico|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
      fallback: {
        crypto: require.resolve("crypto-browserify"),
      },
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "main.js",
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin(envKeys),
      // new Dotenv(),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
    devServer: {
      static: path.resolve(__dirname, "./dist"),
      hot: true,
      historyApiFallback: true,
    },
  };
};
