### Add runtime chunk

```diff
diff --git a/src/e1.js b/src/e1.js
index 7f44afb..8db95f3 100644
--- a/src/e1.js
+++ b/src/e1.js
@@ -1,2 +1 @@
 import negativeZero from 'negative-zero';
-console.log('e1');
```

```diff
diff --git a/webpack.config.js b/webpack.config.js
index 13dafea..0618e7c 100644
--- a/webpack.config.js
+++ b/webpack.config.js
@@ -13,5 +13,8 @@ module.exports = {
         new webpack.optimize.CommonsChunkPlugin({
             name: 'vendor',
         }),
+        new webpack.optimize.CommonsChunkPlugin({
+            name: 'runtime',
+        }),
     ],
 };
```

    $ rm -rf dist; node_modules/.bin/webpack
    Hash: 789fb72a6295f6b947c3
    Version: webpack 2.7.0
    Time: 63ms
                              Asset       Size  Chunks             Chunk Names
     vendor.0c5ffdca3d8db37e2896.js  284 bytes       0  [emitted]  vendor
         e1.0bd30acc316ac66a1fde.js  455 bytes       1  [emitted]  e1
    runtime.48cacf61ac1bed3206d5.js    6.01 kB       2  [emitted]  runtime
       [0] ./~/negative-zero/index.js 54 bytes {0} [built]
       [1] ./src/e1.js 42 bytes {1} [built]
       [2] multi negative-zero 28 bytes {0} [built]
