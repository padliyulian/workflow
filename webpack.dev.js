const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HWPConfig = new HtmlWebpackPlugin({
  file: 'index.html',
  template: './src/index.html',
  favicon: './src/assets/img/favicon.png'
})

const htmlFiles = ['features', 'about'];

const multiplesFiles = htmlFiles.map(function (entryName) {
  return new HtmlWebpackPlugin({
    filename: `${entryName}.html`,
    template: `./src/${entryName}.html`,
    favicon: './src/assets/img/favicon.png'
  })
})  

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: './js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    HWPConfig
  ].concat(multiplesFiles),
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', //3. Inject styles into DOM
          'css-loader', //2. Turns css into commonjs
          'sass-loader' //1. Turns sass into css
        ]
      }
    ]
  }
});
