const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    output: {
        filename: '[name].[chunkhash].js',
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
            ],
        }],
    },
    optimization: {
        minimize: false,
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name].[chunkhash].css'}),
    ],
};
