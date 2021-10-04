const webpack = require('webpack')
const path = require('path')

const config = {
  target: 'node',
  mode: 'production',
  entry: './api/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  }
}

module.exports = config
