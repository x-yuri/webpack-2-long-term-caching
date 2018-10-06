const path = require('path');
module.exports = {
    output: {
        filename: '[name].[chunkhash].js',
    },
    optimization: {
        minimize: false,
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    test: path.resolve('../../node_modules'),
                    chunks: 'all',
                    name: 'vendor',
                    minSize: 0,
                },
            },
        },
    },
};
