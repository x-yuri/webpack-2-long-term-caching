const path = require('path');
module.exports = {
    output: {
        filename: '[name].[chunkhash].js',
    },
    optimization: {
        minimize: false,
    },
};
