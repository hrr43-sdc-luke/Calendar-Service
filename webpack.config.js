const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-gzip-webpack-plugin')

const SRC_DIR = path.join(__dirname, '/client');
const DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'calendar-bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new BrotliPlugin({
      asset: '[file].br[query]',
      algorithm: 'brotli',
      test: /\.(jsx|js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
      quality: 11,
    }),
    new BrotliPlugin({
      asset: '[file].gz[query]',
      algorithm: 'gzip',
      test: /\.(jsx|js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
      quality: 11,
    }),
  ],
};
