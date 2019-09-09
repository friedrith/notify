const path = require('path')
const webpack = require('webpack')

module.exports = {
  target: 'node',
  entry: './src/cli.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bin.js',
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'shebang-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
  ],
}
