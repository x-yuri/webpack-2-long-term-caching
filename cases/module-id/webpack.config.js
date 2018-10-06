const webpack = require('webpack');
module.exports = {
    output: {
        filename: '[name].[chunkhash].js',
    },
    optimization: {
        minimize: false,
    },
    externals: {
        jquery: 'jQuery',
    },
};
