const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        e1: './src/e1',
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].[hash].js',
    },
};
