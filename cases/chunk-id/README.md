[`src/index.js`][index.js]:

[index.js]: src/index.js

```js
import negativeZero from 'negative-zero';
```

[`src/am.js`][am.js]:

[am.js]: src/am.js

```js
export default 'am.js';
```

[`webpack.config.js`][webpack.config.js]:

[webpack.config.js]: webpack.config.js

```js
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
```


```
$ ../../node_modules/.bin/webpack --mode production
                         Asset       Size  Chunks             Chunk Names
  main.aab339b220053a2e8283.js   6.52 KiB       0  [emitted]  main
vendor.e60c712d133649db928d.js  212 bytes       1  [emitted]  vendor
```

Import the module dynamically:

```diff
--- src/index.js	2018-10-14 14:02:38.204779429 +0300
+++ src/index.js	2018-10-14 14:02:38.204779429 +0300
@@ -1 +1,2 @@
 import negativeZero from 'negative-zero';
+import('./am').then(({default: v}) => console.log(v));
```

```
$ ../../node_modules/.bin/webpack --mode production
                         Asset       Size  Chunks             Chunk Names
  main.883ab1713372489bfbfd.js    9.4 KiB       0  [emitted]  main
     1.a7278e299dcaa5d71497.js  294 bytes       1  [emitted]  
vendor.4118aaed38a965b23174.js  212 bytes       2  [emitted]  vendor
```


`vendor` chunk has changed because of its id:

```diff
--- dist/vendor.e60c712d133649db928d.js	2018-10-14 22:10:21.878517753 +0300
+++ dist/vendor.4118aaed38a965b23174.js	2018-10-14 22:10:51.008518402 +0300
@@ -1,4 +1,4 @@
-(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],[
+(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],[
 /* 0 */,
 /* 1 */
 /***/ (function(module, exports, __webpack_require__) {
```

That happened because async chunks by default come before those extracted by `SplitChunksPlugin`:

Compilation: seal: [this.processDependenciesBlocksForChunkGroups(...)][aa]<br>
Compilation: processDependenciesBlocksForChunkGroups: [this.addChunkInGroup(...)][ab]<br>
Compilation: seal: [this.hooks.optimizeModulesAdvanced.call(...)][ac]<br>
SplitChunksPlugin: hooks.optimizeModulesAdvanced: [compilation.addChunk(...)][ad]<br>

[aa]: https://github.com/webpack/webpack/blob/v4.20.2/lib/Compilation.js#L1191
[ab]: https://github.com/webpack/webpack/blob/v4.20.2/lib/Compilation.js#L1646-L1651
[ac]: https://github.com/webpack/webpack/blob/v4.20.2/lib/Compilation.js#L1200
[ad]: https://github.com/webpack/webpack/blob/v4.20.2/lib/optimize/SplitChunksPlugin.js#L696


Let's add `NamedChunksPlugin`:

```diff
--- webpack.config.js	2018-10-14 21:38:36.811808674 +0300
+++ webpack.config.js	2018-10-14 21:38:30.791808544 +0300
@@ -1,4 +1,5 @@
 const path = require('path');
+const webpack = require('webpack');
 module.exports = {
     output: {
         filename: '[name].[chunkhash].js',
@@ -18,4 +19,7 @@
             },
         },
     },
+    plugins: [
+        new webpack.NamedChunksPlugin,
+    ],
 };
```

```
$ ../../node_modules/.bin/webpack --mode production
                         Asset       Size  Chunks             Chunk Names
  main.69fc03d2bdffc7c6f71c.js   6.53 KiB    main  [emitted]  main
vendor.a88c022746d811695bf9.js  219 bytes  vendor  [emitted]  vendor
```

Then import the module again:

```
$ ../../node_modules/.bin/webpack --mode production
                         Asset       Size  Chunks             Chunk Names
  main.18f753ae64060173d216.js   9.41 KiB    main  [emitted]  main
     0.344df06b987fdedeba20.js  294 bytes       0  [emitted]  
vendor.a88c022746d811695bf9.js  219 bytes  vendor  [emitted]  vendor
```

This time `vendor` chunk wasn't affected.
