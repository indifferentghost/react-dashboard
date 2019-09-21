const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_DIR = path.resolve(__dirname, '../');

module.exports = {
  entry: path.resolve(ROOT_DIR, './src'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(ROOT_DIR, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              removeComments: true,
              collapseWhitespace: false,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/i,
        use: [
          {
            loader: 'babel-loader?presets[]=react',
            query: {
              cacheDirectory: true,
              presets: ['@babel/preset-env', '@babel/react'],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'testing',
      template: path.resolve(ROOT_DIR, './public/index.html'),
    }),
  ],
  resolve: {
    alias: {
      // The documentation for hot-loader notes that the production bundle
      // is the same as the default react-dom package:
      // https://github.com/hot-loader/react-dom
      'react-dom': '@hot-loader/react-dom',
    },
  },
};