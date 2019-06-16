const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "./js/[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/template.html",
        favicon: "./src/assets/img/favicon.png",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "./css/[name].[contentHash].css" }),
    new CleanWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer()
        ]
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader, //4. Extract css into files
          "css-loader", //3. Turns css into commonjs
          "postcss-loader", // 2. add css autoprefix
          "sass-loader", //1. Turns sass into css
        ]
      }
    ]
  }
});
