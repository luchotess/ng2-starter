let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let commonConfig = require('../webpack.common.js');
let helpers = require('../helpers');
let argv = require('yargs').argv;

const API = argv.API;

console.log(argv);

module.exports = webpackMerge(commonConfig, {

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:4200/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin({filename: '[name].css'}),
    new webpack.EnvironmentPlugin([
      "API"
    ])
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    proxy: {
      '/api/*': {
        target: "http://localhost:8081",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
});
