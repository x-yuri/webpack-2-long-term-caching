### Initial commit

`src/e1.js`:

```js
import negativeZero from 'negative-zero';
```

`webpack.config.js`:

```js
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
```

    $ rm -rf dist; node_modules/.bin/webpack
    Hash: 908ac7c76db8222b8730
    Version: webpack 2.7.0
    Time: 56ms
                         Asset     Size  Chunks             Chunk Names
    e1.908ac7c76db8222b8730.js  3.13 kB       0  [emitted]  e1
       [0] ./~/negative-zero/index.js 54 bytes {0} [built]
       [1] ./src/e1.js 42 bytes {0} [built]
