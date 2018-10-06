### Import m1

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

```diff
diff --git a/src/m1.js b/src/m1.js
new file mode 100644
index 0000000..6f0c153
--- /dev/null
+++ b/src/m1.js
@@ -0,0 +1 @@
+console.log('m1.js');
```

    $ rm -rf dist; node_modules/.bin/webpack
    Hash: 89cfd545760731c6fc1b
    Version: webpack 2.7.0
    Time: 63ms
                              Asset       Size  Chunks             Chunk Names
         e1.1d6543f62beca019ad01.js  765 bytes       0  [emitted]  e1
     vendor.1c97594b4bd4f2ff382a.js  293 bytes       1  [emitted]  vendor
    runtime.f362d2d1062575b5836c.js    6.01 kB       2  [emitted]  runtime
       [0] ./~/negative-zero/index.js 54 bytes {1} [built]
       [1] ./src/m1.js 22 bytes {0} [built]
       [2] ./src/e1.js 84 bytes {0} [built]
       [3] multi negative-zero 28 bytes {1} [built]

Importing `m1` has invalidated `vendor` chunk:

```diff
                               Asset       Size  Chunks             Chunk Names
-     vendor.0c5ffdca3d8db37e2896.js  284 bytes       0  [emitted]  vendor
-         e1.355af8200b04cc5dbdcb.js  474 bytes       1  [emitted]  e1
-    runtime.3b6763714e57dfb76a91.js    6.01 kB       2  [emitted]  runtime
+         e1.1d6543f62beca019ad01.js  765 bytes       0  [emitted]  e1
+     vendor.1c97594b4bd4f2ff382a.js  293 bytes       1  [emitted]  vendor
+    runtime.f362d2d1062575b5836c.js    6.01 kB       2  [emitted]  runtime
```

```diff
diff --git a/dist/e1.355af8200b04cc5dbdcb.js b/dist/e1.1d6543f62beca019ad01.js
similarity index 58%
rename from dist/e1.355af8200b04cc5dbdcb.js
rename to dist/e1.1d6543f62beca019ad01.js
index a87871d..8223abd 100644
--- a/dist/e1.355af8200b04cc5dbdcb.js
+++ b/dist/e1.1d6543f62beca019ad01.js
@@ -1,15 +1,25 @@
-webpackJsonp([1],[
+webpackJsonp([0],[
 /* 0 */,
 /* 1 */
```

```diff
diff --git a/dist/vendor.0c5ffdca3d8db37e2896.js b/dist/vendor.1c97594b4bd4f2ff382a.js
similarity index 85%
rename from dist/vendor.0c5ffdca3d8db37e2896.js
rename to dist/vendor.1c97594b4bd4f2ff382a.js
index 898b0ce..3c144e1 100644
--- a/dist/vendor.0c5ffdca3d8db37e2896.js
+++ b/dist/vendor.1c97594b4bd4f2ff382a.js
@@ -1,4 +1,4 @@
-webpackJsonp([0],[
+webpackJsonp([1],[
 /* 0 */
 /***/ (function(module, exports, __webpack_require__) {
 
@@ -9,11 +9,12 @@ module.exports = x => Object.is(x, -0);
```

That [happened][1] because chunks were [ordered][2] [differently][3] (chunk ids). Chunks are ordered according to several parameters. The first parameter that is different for two chunks wins. Chunks with bigger values come first.

Before:

```
-- vendor
   entryOccurs: 1
   occurs: 0
   modules.length: 2   <--
   modules:
      /.../node_modules/negative-zero/index.js
      multi negative-zero
-- e1
   entryOccurs: 1
   occurs: 0
   modules.length: 1   <--
   modules:
      /.../src/e1.js
```

After:

```
-- e1
   entryOccurs: 1
   occurs: 0
   modules.length: 2
   modules:
      /.../src/e1.js   <--
      /.../src/m1.js
-- vendor
   entryOccurs: 1
   occurs: 0
   modules.length: 2
   modules:
      /.../node_modules/negative-zero/index.js   <--
      multi negative-zero
```

[1]: https://github.com/webpack/webpack/blob/v2.7.0/lib/Compilation.js#L600
[2]: https://github.com/webpack/webpack/blob/v2.7.0/lib/optimize/OccurrenceOrderPlugin.js#L72-L110
[3]: https://github.com/webpack/webpack/blob/v2.7.0/lib/optimize/OccurrenceOrderPlugin.js#L91-L105
