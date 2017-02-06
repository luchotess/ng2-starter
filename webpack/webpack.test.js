var helpers = require('./helpers');
var path = require('path');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    root: path.resolve('./src/app'),
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader?sourceMap=false,inlineSourceMap=true', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.scss$/,
        loaders: ['raw-loader', 'sass-loader']
      }
    ],
    postLoaders: [
      {
        test: /\.(ts)$/,
        loader: 'istanbul-instrumenter',
        exclude: [
          /\.(e2e|spec|module)\.ts$/,
          /node_modules/
        ]
      }
    ]
  }
};
