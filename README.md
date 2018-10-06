### Import am1

```diff
diff --git a/src/am1.js b/src/am1.js
new file mode 100644
index 0000000..00c3d0b
--- /dev/null
+++ b/src/am1.js
@@ -0,0 +1 @@
+export default 'am1';
```

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
    Hash: aa31f078867b0f64f017
    Version: webpack 2.7.0
    Time: 68ms
                              Asset       Size   Chunks             Chunk Names
          0.3db1fe8adcf4d7f2aa8c.js  286 bytes        0  [emitted]  
         e1.6609d7860f7e9d067642.js  969 bytes       e1  [emitted]  e1
    runtime.7541cc59301686b26f4e.js    6.05 kB  runtime  [emitted]  runtime
     vendor.502283099bd98427cd26.js  363 bytes   vendor  [emitted]  vendor
    [./node_modules/negative-zero/index.js] ./~/negative-zero/index.js 54 bytes {vendor} [built]
    [./src/am1.js] ./src/am1.js 22 bytes {0} [built]
       [0] multi negative-zero 28 bytes {vendor} [built]
    [./src/e1.js] ./src/e1.js 127 bytes {e1} [built]
    [./src/m1.js] ./src/m1.js 22 bytes {e1} [built]

`vendor` chunk didn't change:

```diff
                               Asset       Size   Chunks             Chunk Names
-         e1.5901c1f85447b05ec932.js  850 bytes       e1  [emitted]  e1
-    runtime.69164cfcc16de8ee094d.js    6.02 kB  runtime  [emitted]  runtime
+          0.3db1fe8adcf4d7f2aa8c.js  286 bytes        0  [emitted]  
+         e1.6609d7860f7e9d067642.js  969 bytes       e1  [emitted]  e1
+    runtime.7541cc59301686b26f4e.js    6.05 kB  runtime  [emitted]  runtime
      vendor.502283099bd98427cd26.js  363 bytes   vendor  [emitted]  vendor
```
