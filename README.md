### Add entry point (#2)

```diff
diff --git a/webpack.config.js b/webpack.config.js
index a2966fe..fd89f3a 100644
--- a/webpack.config.js
+++ b/webpack.config.js
@@ -3,6 +3,7 @@ const webpack = require('webpack');
 module.exports = {
     entry: {
         e1: './src/e1',
+        e2: './src/e2',
         vendor: ['negative-zero'],
     },
     output: {
```

    $ rm -rf dist; node_modules/.bin/webpack
    Hash: 3e1fa2429c23ecf0d2fb
    Version: webpack 2.7.0
    Time: 75ms
                              Asset       Size   Chunks             Chunk Names
     am1.js.c7916324ca428f14ac06.js  293 bytes   am1.js  [emitted]  
     am2.js.7d7677b31595dc0aebab.js  293 bytes   am2.js  [emitted]  
         e1.dd17033c584cc9cbb4b2.js    1.45 kB       e1  [emitted]  e1
         e2.40323cf6a7f5d6881bfe.js  831 bytes       e2  [emitted]  e2
    runtime.63cb491af45a0d45e21a.js    6.12 kB  runtime  [emitted]  runtime
     vendor.607f87886a613a461165.js  403 bytes   vendor  [emitted]  vendor
    [./node_modules/negative-zero/index.js] ./~/negative-zero/index.js 54 bytes {vendor} [built]
    [./src/am1.js] ./src/am1.js 22 bytes {am1.js} [built]
    [./src/am2.js] ./src/am2.js 22 bytes {am2.js} [built]
    [./src/e1.js] ./src/e1.js 187 bytes {e1} [built]
    [./src/e2.js] ./src/e2.js 65 bytes {e2} [built]
    [./src/m1.js] ./src/m1.js 22 bytes {e1} {e2} [built]
    [multi negative-zero] multi negative-zero 28 bytes {vendor} [built]
        + 1 hidden modules

This time adding entry point didn't affect `vendor` chunk:

```diff
                               Asset       Size   Chunks             Chunk Names
      am1.js.c7916324ca428f14ac06.js  293 bytes   am1.js  [emitted]  
      am2.js.7d7677b31595dc0aebab.js  293 bytes   am2.js  [emitted]  
          e1.dd17033c584cc9cbb4b2.js    1.45 kB       e1  [emitted]  e1
-    runtime.f70eee5c142c295299fa.js    6.09 kB  runtime  [emitted]  runtime
+         e2.40323cf6a7f5d6881bfe.js  831 bytes       e2  [emitted]  e2
+    runtime.63cb491af45a0d45e21a.js    6.12 kB  runtime  [emitted]  runtime
      vendor.607f87886a613a461165.js  403 bytes   vendor  [emitted]  vendor
```
