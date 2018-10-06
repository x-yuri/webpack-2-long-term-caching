const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        e1: './src/e1',
        vendor: ['negative-zero'],
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].[chunkhash].js',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
        }),
        new webpack.NamedChunksPlugin,
        new webpack.NamedModulesPlugin,
    ],
};
