### Add NamedChunksPlugin

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
index 0618e7c..9aab676 100644
--- a/webpack.config.js
+++ b/webpack.config.js
@@ -16,5 +16,6 @@ module.exports = {
         new webpack.optimize.CommonsChunkPlugin({
             name: 'runtime',
         }),
+        new webpack.NamedChunksPlugin,
     ],
 };
```

    $ rm -rf dist; node_modules/.bin/webpack
    Hash: aa7456689d1d84002d4a
    Version: webpack 2.7.0
    Time: 65ms
                              Asset       Size   Chunks             Chunk Names
         e1.89079075102f320886bd.js  477 bytes       e1  [emitted]  e1
    runtime.1c4e297963951683d47f.js    6.02 kB  runtime  [emitted]  runtime
     vendor.b9436396c083a5ff834f.js  291 bytes   vendor  [emitted]  vendor
       [0] ./~/negative-zero/index.js 54 bytes {vendor} [built]
       [1] ./src/e1.js 61 bytes {e1} [built]
       [2] multi negative-zero 28 bytes {vendor} [built]

Adding `NamedChunksPlugin` makes it use names in place of ids:

```diff
diff --git a/dist/e1.1d6543f62beca019ad01.js b/dist/e1.89079075102f320886bd.js
similarity index 58%
rename from dist/e1.1d6543f62beca019ad01.js
rename to dist/e1.89079075102f320886bd.js
index 8223abd..4e85b98 100644
--- a/dist/e1.1d6543f62beca019ad01.js
+++ b/dist/e1.89079075102f320886bd.js
@@ -1,25 +1,15 @@
-webpackJsonp([0],[
+webpackJsonp(["e1"],[
 /* 0 */,
 /* 1 */
```

```diff
diff --git a/dist/vendor.1c97594b4bd4f2ff382a.js b/dist/vendor.b9436396c083a5ff834f.js
similarity index 85%
rename from dist/vendor.1c97594b4bd4f2ff382a.js
rename to dist/vendor.b9436396c083a5ff834f.js
index 3c144e1..a832f69 100644
--- a/dist/vendor.1c97594b4bd4f2ff382a.js
+++ b/dist/vendor.b9436396c083a5ff834f.js
@@ -1,4 +1,4 @@
-webpackJsonp([1],[
+webpackJsonp(["vendor"],[
```
