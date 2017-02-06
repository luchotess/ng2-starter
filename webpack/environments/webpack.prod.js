let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let commonConfig = require('../webpack.common.js');
let helpers = require('./../helpers');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let argv = require('yargs').argv;

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const API = argv.API;

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: './dist',
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    htmlLoader: {
        minimize: false // workaround for ng2
    },

    plugins: [
        // new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                keep_fnames: true
            }
        }),
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'API': JSON.stringify(API)
            }
        }),
        new CopyWebpackPlugin([
            {
                from: {
                    glob: './public',
                    dot: true
                },
                to: './public'
            }
        ])
    ]
});
