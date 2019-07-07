const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const htmlFiles = ['index', 'features', 'about'];

const multiplesFiles = htmlFiles.map(function (entryName) {
  return new HtmlWebpackPlugin({
    filename: `${entryName}.html`,
    template: `./src/${entryName}.html`,
    favicon: './src/assets/img/favicon.png',
    minify: {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      removeComments: true
    }
  })
}) 

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: './js/[name].[contentHash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
    ].concat(multiplesFiles)
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: './css/[name].[contentHash].css' }),
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
        use: [
          MiniCssExtractPlugin.loader, //4. Extract css into files
          'css-loader', //3. Turns css into commonjs
          'postcss-loader', // 2. add css autoprefix
          'sass-loader', //1. Turns sass into css
        ]
      }
    ]
  }
});
