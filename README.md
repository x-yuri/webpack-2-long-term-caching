### Switch to chunk hashes

```diff
diff --git a/webpack.config.js b/webpack.config.js
index 39a77d0..13dafea 100644
--- a/webpack.config.js
+++ b/webpack.config.js
@@ -7,7 +7,7 @@ module.exports = {
     },
     output: {
         path: path.resolve('dist'),
-        filename: '[name].[hash].js',
+        filename: '[name].[chunkhash].js',
     },
     plugins: [
         new webpack.optimize.CommonsChunkPlugin({
```

    $ rm -rf dist; node_modules/.bin/webpack
    Hash: d336248193a28d983e41
    Version: webpack 2.7.0
    Time: 66ms
                             Asset       Size  Chunks             Chunk Names
        e1.1f965e96896cca677617.js  455 bytes       0  [emitted]  e1
    vendor.1e11f0c1ebfa5e58688d.js    6.38 kB       1  [emitted]  vendor
       [0] ./~/negative-zero/index.js 54 bytes {1} [built]
       [1] ./src/e1.js 42 bytes {0} [built]
       [2] multi negative-zero 28 bytes {1} [built]

Switch to chunk hashes for changes in chunk `e1` to not invalidate `vendor` chunk.
