### Import m1 (#3)

```diff
diff --git a/src/e1.js b/src/e1.js
index 7f44afb..4101863 100644
--- a/src/e1.js
+++ b/src/e1.js
@@ -1,2 +1,3 @@
 import negativeZero from 'negative-zero';
+import m1 from './m1';
 console.log('e1');
```

    $ rm -rf dist; node_modules/.bin/webpack
    Hash: e94c6f08467889111c0d
    Version: webpack 2.7.0
    Time: 70ms
                              Asset       Size   Chunks             Chunk Names
         e1.5901c1f85447b05ec932.js  850 bytes       e1  [emitted]  e1
    runtime.69164cfcc16de8ee094d.js    6.02 kB  runtime  [emitted]  runtime
     vendor.502283099bd98427cd26.js  363 bytes   vendor  [emitted]  vendor
    [./node_modules/negative-zero/index.js] ./~/negative-zero/index.js 54 bytes {vendor} [built]
       [0] multi negative-zero 28 bytes {vendor} [built]
    [./src/e1.js] ./src/e1.js 84 bytes {e1} [built]
    [./src/m1.js] ./src/m1.js 22 bytes {e1} [built]

This time `vendor` chunk didn't change:

```diff
                               Asset       Size   Chunks             Chunk Names
-         e1.e2f89e273a14c3d70063.js  533 bytes       e1  [emitted]  e1
-    runtime.ee8f06fc5206fba5bad4.js    6.02 kB  runtime  [emitted]  runtime
+         e1.5901c1f85447b05ec932.js  850 bytes       e1  [emitted]  e1
+    runtime.69164cfcc16de8ee094d.js    6.02 kB  runtime  [emitted]  runtime
      vendor.502283099bd98427cd26.js  363 bytes   vendor  [emitted]  vendor
```
