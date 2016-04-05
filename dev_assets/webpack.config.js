var path = require('path');
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
    }
};
