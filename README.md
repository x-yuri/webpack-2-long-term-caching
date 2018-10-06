### Add entry point

```diff
diff --git a/src/e2.js b/src/e2.js
new file mode 100644
index 0000000..b2fc17e
--- /dev/null
+++ b/src/e2.js
@@ -0,0 +1,2 @@
+import m1 from './m1';
+import negativeZero from 'negative-zero';
```

```diff
diff --git a/webpack.config.js b/webpack.config.js
index d1854ed..0ebb1a3 100644
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
    Hash: cef58ce4ddb3fe01f191
    Version: webpack 2.7.0
    Time: 74ms
                              Asset       Size   Chunks             Chunk Names
     am1.js.c7916324ca428f14ac06.js  293 bytes   am1.js  [emitted]  
     am2.js.7d7677b31595dc0aebab.js  293 bytes   am2.js  [emitted]  
         e1.5e7fd381d9c256cbbc83.js    1.35 kB       e1  [emitted]  e1
         e2.91276ee7b9350a878771.js  739 bytes       e2  [emitted]  e2
    runtime.3d38791d137ce718140b.js    6.12 kB  runtime  [emitted]  runtime
     vendor.9c3afd93afa87978cade.js  495 bytes   vendor  [emitted]  vendor
    [./node_modules/negative-zero/index.js] ./~/negative-zero/index.js 54 bytes {vendor} [built]
    [./src/am1.js] ./src/am1.js 22 bytes {am1.js} [built]
    [./src/am2.js] ./src/am2.js 22 bytes {am2.js} [built]
    [./src/e1.js] ./src/e1.js 187 bytes {e1} [built]
    [./src/e2.js] ./src/e2.js 65 bytes {e2} [built]
    [./src/m1.js] ./src/m1.js 22 bytes {vendor} [built]
    [multi negative-zero] multi negative-zero 28 bytes {vendor} [built]
        + 1 hidden modules

Adding entry point has invalidated `vendor` chunk:

```diff
                               Asset       Size   Chunks             Chunk Names
      am1.js.c7916324ca428f14ac06.js  293 bytes   am1.js  [emitted]  
      am2.js.7d7677b31595dc0aebab.js  293 bytes   am2.js  [emitted]  
-         e1.dd17033c584cc9cbb4b2.js    1.45 kB       e1  [emitted]  e1
-    runtime.f70eee5c142c295299fa.js    6.09 kB  runtime  [emitted]  runtime
-     vendor.607f87886a613a461165.js  403 bytes   vendor  [emitted]  vendor
+         e1.5e7fd381d9c256cbbc83.js    1.35 kB       e1  [emitted]  e1
+         e2.91276ee7b9350a878771.js  739 bytes       e2  [emitted]  e2
+    runtime.3d38791d137ce718140b.js    6.12 kB  runtime  [emitted]  runtime
+     vendor.9c3afd93afa87978cade.js  495 bytes   vendor  [emitted]  vendor
```

```diff
diff --git a/dist/vendor.607f87886a613a461165.js b/dist/vendor.9c3afd93afa87978cade.js
similarity index 75%
rename from dist/vendor.607f87886a613a461165.js
rename to dist/vendor.9c3afd93afa87978cade.js
index 34deed8..40eee1f 100644
--- a/dist/vendor.607f87886a613a461165.js
+++ b/dist/vendor.9c3afd93afa87978cade.js
@@ -8,6 +8,14 @@ webpackJsonp(["vendor"],{
 module.exports = x => Object.is(x, -0);
 
 
+/***/ }),
+
+/***/ "./src/m1.js":
+/***/ (function(module, exports) {
+
+console.log('m1.js');
+
+
 /***/ }),
 
 /***/ "multi negative-zero":
```

That happened because module `m1` is now shared between entry points `e1` and `e2`, so `CommonsChunkPlugin` decided to move it into `vendor` chunk.
