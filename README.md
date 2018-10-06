### Import am2 (#2)

```diff
diff --git a/src/e1.js b/src/e1.js
index dafb679..d5af6dc 100644
--- a/src/e1.js
+++ b/src/e1.js
@@ -1,4 +1,5 @@
 import negativeZero from 'negative-zero';
 import m1 from './m1';
 import('./am1').then(a => console.log(a));
+import('./am2').then(a => console.log(a));
 console.log('e1');
```

    $ rm -rf dist; node_modules/.bin/webpack
    Hash: 2be0b9da76d5733b5e3b
    Version: webpack 2.7.0
    Time: 70ms
                              Asset       Size   Chunks             Chunk Names
     am1.js.c7916324ca428f14ac06.js  293 bytes   am1.js  [emitted]  
     am2.js.7d7677b31595dc0aebab.js  293 bytes   am2.js  [emitted]  
         e1.cb8e57bfd81dcd728c40.js     1.1 kB       e1  [emitted]  e1
    runtime.a949e1a5abaa96cac311.js    6.09 kB  runtime  [emitted]  runtime
     vendor.502283099bd98427cd26.js  363 bytes   vendor  [emitted]  vendor
    [./node_modules/negative-zero/index.js] ./~/negative-zero/index.js 54 bytes {vendor} [built]
    [./src/am1.js] ./src/am1.js 22 bytes {am1.js} [built]
    [./src/am2.js] ./src/am2.js 22 bytes {am2.js} [built]
       [0] multi negative-zero 28 bytes {vendor} [built]
    [./src/e1.js] ./src/e1.js 170 bytes {e1} [built]
    [./src/m1.js] ./src/m1.js 22 bytes {e1} [built]

This time async chunk `am1` didn't change:

```diff
                               Asset       Size   Chunks             Chunk Names
      am1.js.c7916324ca428f14ac06.js  293 bytes   am1.js  [emitted]  
-         e1.00f15830be838c2942a4.js  976 bytes       e1  [emitted]  e1
-    runtime.77e097a9a45e8740a0c1.js    6.06 kB  runtime  [emitted]  runtime
+     am2.js.7d7677b31595dc0aebab.js  293 bytes   am2.js  [emitted]  
+         e1.cb8e57bfd81dcd728c40.js     1.1 kB       e1  [emitted]  e1
+    runtime.a949e1a5abaa96cac311.js    6.09 kB  runtime  [emitted]  runtime
      vendor.502283099bd98427cd26.js  363 bytes   vendor  [emitted]  vendor
```
