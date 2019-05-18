const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "node",
  entry: "./src/app",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  }
};
