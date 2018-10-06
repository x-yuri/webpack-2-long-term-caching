const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        e1: './src/e1',
        e2: './src/e2',
        vendor: ['negative-zero'],
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].[chunkhash].js',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
        }),
        new webpack.NamedChunksPlugin(chunk => {
            if (chunk.name) {
                return chunk.name;
            }
            return chunk.modules.map(m => path.relative(m.context, m.request)).join("_");
        }),
        new webpack.NamedModulesPlugin,
        {
            apply(compiler) {
                compiler.plugin('compilation', (compilation) => {
                    compilation.plugin('before-module-ids', (modules) => {
                        modules.forEach((module) => {
                            if (module.id !== null) {
                                return;
                            }
                            module.id = module.identifier();
                        });
                    });
                });
            }
        }
    ],
    externals: {
        jquery: 'jQuery',
    },
};
