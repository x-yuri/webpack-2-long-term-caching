### Import am1 (#2)

```diff
diff --git a/src/e1.js b/src/e1.js
index 4101863..dafb679 100644
--- a/src/e1.js
+++ b/src/e1.js
@@ -1,3 +1,4 @@
 import negativeZero from 'negative-zero';
 import m1 from './m1';
+import('./am1').then(a => console.log(a));
 console.log('e1');
```

    $ rm -rf dist; node_modules/.bin/webpack
    Hash: 82f5ee4c60ddb85d0f13
    Version: webpack 2.7.0
    Time: 68ms
                              Asset       Size   Chunks             Chunk Names
     am1.js.c7916324ca428f14ac06.js  293 bytes   am1.js  [emitted]  
         e1.00f15830be838c2942a4.js  976 bytes       e1  [emitted]  e1
    runtime.77e097a9a45e8740a0c1.js    6.06 kB  runtime  [emitted]  runtime
     vendor.502283099bd98427cd26.js  363 bytes   vendor  [emitted]  vendor
    [./node_modules/negative-zero/index.js] ./~/negative-zero/index.js 54 bytes {vendor} [built]
    [./src/am1.js] ./src/am1.js 22 bytes {am1.js} [built]
       [0] multi negative-zero 28 bytes {vendor} [built]
    [./src/e1.js] ./src/e1.js 127 bytes {e1} [built]
    [./src/m1.js] ./src/m1.js 22 bytes {e1} [built]

`vendor` chunk didn't change:

```diff
                               Asset       Size   Chunks             Chunk Names
-         e1.5901c1f85447b05ec932.js  850 bytes       e1  [emitted]  e1
-    runtime.69164cfcc16de8ee094d.js    6.02 kB  runtime  [emitted]  runtime
+     am1.js.c7916324ca428f14ac06.js  293 bytes   am1.js  [emitted]  
+         e1.00f15830be838c2942a4.js  976 bytes       e1  [emitted]  e1
+    runtime.77e097a9a45e8740a0c1.js    6.06 kB  runtime  [emitted]  runtime
      vendor.502283099bd98427cd26.js  363 bytes   vendor  [emitted]  vendor
```
