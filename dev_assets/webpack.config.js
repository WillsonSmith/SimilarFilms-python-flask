var debug = process.env.DEBUG !== "true"

var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './js/app.js',
    output: {
        path: '../public_assets/js',
        filename: 'app.pack.js'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/,
              loader: 'babel-loader' }
        ],
        query: {
          presets: ['es2015']
        }
    },
    plugins: debug ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ]
};
