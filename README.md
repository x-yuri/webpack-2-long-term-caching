### Import m1 (#2)

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
    Hash: 6ec5031067224531e04d
    Version: webpack 2.7.0
    Time: 63ms
                              Asset       Size   Chunks             Chunk Names
         e1.421872a1b1bdbc9daf74.js  768 bytes       e1  [emitted]  e1
    runtime.feda09957a76788bf333.js    6.02 kB  runtime  [emitted]  runtime
     vendor.5cfb7cbee12151d3d817.js  300 bytes   vendor  [emitted]  vendor
       [0] ./~/negative-zero/index.js 54 bytes {vendor} [built]
       [1] ./src/m1.js 22 bytes {e1} [built]
       [2] ./src/e1.js 84 bytes {e1} [built]
       [3] multi negative-zero 28 bytes {vendor} [built]

Importing `m1` has invalidated `vendor` chunk again:

```diff
                               Asset       Size   Chunks             Chunk Names
-         e1.89079075102f320886bd.js  477 bytes       e1  [emitted]  e1
-    runtime.1c4e297963951683d47f.js    6.02 kB  runtime  [emitted]  runtime
-     vendor.b9436396c083a5ff834f.js  291 bytes   vendor  [emitted]  vendor
+         e1.421872a1b1bdbc9daf74.js  768 bytes       e1  [emitted]  e1
+    runtime.feda09957a76788bf333.js    6.02 kB  runtime  [emitted]  runtime
+     vendor.5cfb7cbee12151d3d817.js  300 bytes   vendor  [emitted]  vendor
```

```diff
diff --git a/dist/vendor.b9436396c083a5ff834f.js b/dist/vendor.5cfb7cbee12151d3d817.js
similarity index 92%
rename from dist/vendor.b9436396c083a5ff834f.js
rename to dist/vendor.5cfb7cbee12151d3d817.js
index a832f69..3a7ff8c 100644
--- a/dist/vendor.b9436396c083a5ff834f.js
+++ b/dist/vendor.5cfb7cbee12151d3d817.js
@@ -9,11 +9,12 @@ module.exports = x => Object.is(x, -0);
 
 /***/ }),
 /* 1 */,
-/* 2 */
+/* 2 */,
+/* 3 */
 /***/ (function(module, exports, __webpack_require__) {
 
 module.exports = __webpack_require__(0);
 
 
 /***/ })
-],[2]);
\ No newline at end of file
+],[3]);
\ No newline at end of file
```

This time it happened because id of its module [changed][1]. Modules are ordered according to several parameters. The first parameter that is different for two modules wins. Modules with bigger values come first, except for the last parameter:

```
preferEntry: true
-- /.../src/m1.js
   entryOccurs: 3   <-- (module imported by entry point)
   occurs: 2
   identifier: /.../src/m1.js
-- MultiModule
   entryOccurs: 2   <-- (entry point)
   occurs: 2
   identifier: multi negative-zero
```

[1]: https://github.com/webpack/webpack/blob/v2.7.0/lib/optimize/OccurrenceOrderPlugin.js#L51-L63
