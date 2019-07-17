const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: {
    jquery: './src/assets/js/vendor/jquery.js',
    popper: './src/assets/js/vendor/popper.js',
    bootstrap: './src/assets/js/vendor/bootstrap.js',
    main: './src/index.js',
  },
  plugins: [
    new StyleLintPlugin({
      configFile: path.resolve(__dirname, '.stylelintrc'),
      context: path.resolve(__dirname, './src/assets/scss'),
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.twig$/,
        use: [
          'html-loader',
          {
            loader: 'twig-html-loader',
            options: {
              namespaces: {
                'layouts': './src/assets/templates/layouts',
                'components': './src/assets/templates/components',
              }
            }
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'img'
          }
        }
      },
    ]
  }
};
