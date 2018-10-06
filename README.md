### Change e1 (#2)

```diff
diff --git a/src/e1.js b/src/e1.js
index 8db95f3..7f44afb 100644
--- a/src/e1.js
+++ b/src/e1.js
@@ -1 +1,2 @@
 import negativeZero from 'negative-zero';
+console.log('e1');
```

    $ rm -rf dist; node_modules/.bin/webpack
    Hash: 7a41aa29e6ab30fa95d4
    Version: webpack 2.7.0
    Time: 63ms
                              Asset       Size  Chunks             Chunk Names
     vendor.0c5ffdca3d8db37e2896.js  284 bytes       0  [emitted]  vendor
         e1.355af8200b04cc5dbdcb.js  474 bytes       1  [emitted]  e1
    runtime.3b6763714e57dfb76a91.js    6.01 kB       2  [emitted]  runtime
       [0] ./~/negative-zero/index.js 54 bytes {0} [built]
       [1] ./src/e1.js 61 bytes {1} [built]
       [2] multi negative-zero 28 bytes {0} [built]

This time `vendor` chunk didn't change:

```diff
                               Asset       Size  Chunks             Chunk Names
      vendor.0c5ffdca3d8db37e2896.js  284 bytes       0  [emitted]  vendor
-         e1.0bd30acc316ac66a1fde.js  455 bytes       1  [emitted]  e1
-    runtime.48cacf61ac1bed3206d5.js    6.01 kB       2  [emitted]  runtime
+         e1.355af8200b04cc5dbdcb.js  474 bytes       1  [emitted]  e1
+    runtime.3b6763714e57dfb76a91.js    6.01 kB       2  [emitted]  runtime
```
