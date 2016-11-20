const
  path = require("path"),
  ExtractTextPlugin = require("extract-text-webpack-plugin")
  webpack = require("webpack");

const
  srcDir = path.join(__dirname, "src"),
  appDir = path.join(__dirname, "dist");

var cfg = {
  devServer: {
    inline: true,
  },
  entry: srcDir + "/index.js",
  output: {
    path: appDir,
    filename: "js/bundle.js",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("[name].css"),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      include: srcDir,
      loaders: ["babel"],
    },{
      test: /\.s[ac]ss$/,
      loaders: ["style", "css", "sass"],
    }],
  },
  resolve: {
    extensions: ["", ".js", ".scss", ".sass"],
    root: [srcDir],
  },
};

module.exports = cfg;
