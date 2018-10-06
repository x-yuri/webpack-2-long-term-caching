### Add vendor chunk

```diff
diff --git a/webpack.config.js b/webpack.config.js
index c70ae81..39a77d0 100644
--- a/webpack.config.js
+++ b/webpack.config.js
@@ -3,9 +3,15 @@ const webpack = require('webpack');
 module.exports = {
     entry: {
         e1: './src/e1',
+        vendor: ['negative-zero'],
     },
     output: {
         path: path.resolve('dist'),
         filename: '[name].[hash].js',
     },
+    plugins: [
+        new webpack.optimize.CommonsChunkPlugin({
+            name: 'vendor',
+        }),
+    ],
 };
```

    $ rm -rf dist; node_modules/.bin/webpack
    Hash: fdc38091bf508a16f6ed
    Version: webpack 2.7.0
    Time: 61ms
                             Asset       Size  Chunks             Chunk Names
        e1.fdc38091bf508a16f6ed.js  455 bytes       0  [emitted]  e1
    vendor.fdc38091bf508a16f6ed.js    6.36 kB       1  [emitted]  vendor
       [0] ./~/negative-zero/index.js 54 bytes {1} [built]
       [1] ./src/e1.js 42 bytes {0} [built]
       [2] multi negative-zero 28 bytes {1} [built]

Add `vendor` chunk to not force user to download all the libraries every time site's code changes.
