const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'main.js'
  },
  externals: {
    "jquery": "jQuery" // We declare jQuery as an externa dependency because we add it thru worpdress enqueue
  },
  resolve: {
    extensions: ['.js']
  },

  module: {
    loaders: [{
      test: /\.js$/, // include .js files
      enforce: 'pre', // preload the jshint loader
      exclude: /node_modules/, // exclude any and all files in the node_modules folder
      use: [
        {
          loader: 'jshint-loader'
        }
      ]
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
        retainLines: true,
      },
    }],
  },

  stats: {
    colors: true
  },

  devtool: 'source-map',
  watch: true,
};
