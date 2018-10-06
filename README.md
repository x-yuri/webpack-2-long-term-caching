### Add NamedModulesPlugin

```diff
diff --git a/src/e1.js b/src/e1.js
index 4101863..7f44afb 100644
--- a/src/e1.js
+++ b/src/e1.js
@@ -1,3 +1,2 @@
 import negativeZero from 'negative-zero';
-import m1 from './m1';
 console.log('e1');
```

```diff
diff --git a/webpack.config.js b/webpack.config.js
index 9aab676..2732c11 100644
--- a/webpack.config.js
+++ b/webpack.config.js
@@ -17,5 +17,6 @@ module.exports = {
             name: 'runtime',
         }),
         new webpack.NamedChunksPlugin,
+        new webpack.NamedModulesPlugin,
     ],
 };
```

    $ rm -rf dist; node_modules/.bin/webpack
    Hash: 69c4dfc5b8538da28280
    Version: webpack 2.7.0
    Time: 62ms
                              Asset       Size   Chunks             Chunk Names
         e1.e2f89e273a14c3d70063.js  533 bytes       e1  [emitted]  e1
    runtime.ee8f06fc5206fba5bad4.js    6.02 kB  runtime  [emitted]  runtime
     vendor.502283099bd98427cd26.js  363 bytes   vendor  [emitted]  vendor
    [./node_modules/negative-zero/index.js] ./~/negative-zero/index.js 54 bytes {vendor} [built]
       [0] multi negative-zero 28 bytes {vendor} [built]
    [./src/e1.js] ./src/e1.js 61 bytes {e1} [built]

`NamedModulesPlugin` makes it use paths for module ids:

```diff
diff --git a/dist/vendor.5cfb7cbee12151d3d817.js b/dist/vendor.502283099bd98427cd26.js
similarity index 52%
rename from dist/vendor.5cfb7cbee12151d3d817.js
rename to dist/vendor.502283099bd98427cd26.js
index 3a7ff8c..3597416 100644
--- a/dist/vendor.5cfb7cbee12151d3d817.js
+++ b/dist/vendor.502283099bd98427cd26.js
@@ -1,5 +1,6 @@
-webpackJsonp(["vendor"],[
-/* 0 */
+webpackJsonp(["vendor"],{
+
+/***/ "./node_modules/negative-zero/index.js":
 /***/ (function(module, exports, __webpack_require__) {
 
 "use strict";
@@ -8,13 +9,13 @@ module.exports = x => Object.is(x, -0);
 
 
 /***/ }),
-/* 1 */,
-/* 2 */,
-/* 3 */
+
+/***/ 0:
 /***/ (function(module, exports, __webpack_require__) {
 
-module.exports = __webpack_require__(0);
+module.exports = __webpack_require__("./node_modules/negative-zero/index.js");
 
 
 /***/ })
-],[3]);
\ No newline at end of file
+
+},[0]);
\ No newline at end of file
```
