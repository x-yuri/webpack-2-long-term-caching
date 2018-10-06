### Import external module (#2)

```diff
diff --git a/src/e1.js b/src/e1.js
index d5af6dc..659b337 100644
--- a/src/e1.js
+++ b/src/e1.js
@@ -2,4 +2,5 @@ import negativeZero from 'negative-zero';
 import m1 from './m1';
 import('./am1').then(a => console.log(a));
 import('./am2').then(a => console.log(a));
+import 'jquery';
 console.log('e1');
```

    $ rm -rf dist; node_modules/.bin/webpack
    Hash: 12a44d37f3558ef06678
    Version: webpack 2.7.0
    Time: 71ms
                              Asset       Size   Chunks             Chunk Names
     am1.js.c7916324ca428f14ac06.js  293 bytes   am1.js  [emitted]  
     am2.js.7d7677b31595dc0aebab.js  293 bytes   am2.js  [emitted]  
         e1.dd17033c584cc9cbb4b2.js    1.45 kB       e1  [emitted]  e1
    runtime.f70eee5c142c295299fa.js    6.09 kB  runtime  [emitted]  runtime
     vendor.607f87886a613a461165.js  403 bytes   vendor  [emitted]  vendor
    [./node_modules/negative-zero/index.js] ./~/negative-zero/index.js 54 bytes {vendor} [built]
    [./src/am1.js] ./src/am1.js 22 bytes {am1.js} [built]
    [./src/am2.js] ./src/am2.js 22 bytes {am2.js} [built]
    [./src/e1.js] ./src/e1.js 187 bytes {e1} [built]
    [./src/m1.js] ./src/m1.js 22 bytes {e1} [built]
    [multi negative-zero] multi negative-zero 28 bytes {vendor} [built]
        + 1 hidden modules

This time importing `jquery` didn't affect `vendor` chunk:

```diff
                               Asset       Size   Chunks             Chunk Names
      am1.js.c7916324ca428f14ac06.js  293 bytes   am1.js  [emitted]  
      am2.js.7d7677b31595dc0aebab.js  293 bytes   am2.js  [emitted]  
-         e1.cb8e57bfd81dcd728c40.js     1.1 kB       e1  [emitted]  e1
-    runtime.9c020682f08a2ce0dd3c.js    6.09 kB  runtime  [emitted]  runtime
+         e1.dd17033c584cc9cbb4b2.js    1.45 kB       e1  [emitted]  e1
+    runtime.f70eee5c142c295299fa.js    6.09 kB  runtime  [emitted]  runtime
      vendor.607f87886a613a461165.js  403 bytes   vendor  [emitted]  vendor
```
