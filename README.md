### Import am2

```diff
diff --git a/src/am2.js b/src/am2.js
new file mode 100644
index 0000000..ec1a252
--- /dev/null
+++ b/src/am2.js
@@ -0,0 +1 @@
+export default 'am2';
```

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
    Hash: 800203d9515d0a5b79c1
    Version: webpack 2.7.0
    Time: 73ms
                              Asset       Size   Chunks             Chunk Names
          0.16cd564e49d298f3dfc7.js  286 bytes        0  [emitted]  
          1.5c17bd07ebf8e7014306.js  286 bytes        1  [emitted]  
         e1.11a0c2e96f5157d43b7b.js    1.09 kB       e1  [emitted]  e1
    runtime.e994d7ad2c0558478376.js    6.08 kB  runtime  [emitted]  runtime
     vendor.502283099bd98427cd26.js  363 bytes   vendor  [emitted]  vendor
    [./node_modules/negative-zero/index.js] ./~/negative-zero/index.js 54 bytes {vendor} [built]
    [./src/am1.js] ./src/am1.js 22 bytes {1} [built]
    [./src/am2.js] ./src/am2.js 22 bytes {0} [built]
       [0] multi negative-zero 28 bytes {vendor} [built]
    [./src/e1.js] ./src/e1.js 170 bytes {e1} [built]
    [./src/m1.js] ./src/m1.js 22 bytes {e1} [built]

Importing `am2` has invalidated chunk `am1`:

```diff
                               Asset       Size   Chunks             Chunk Names
-          0.3db1fe8adcf4d7f2aa8c.js  286 bytes        0  [emitted]  
-         e1.6609d7860f7e9d067642.js  969 bytes       e1  [emitted]  e1
-    runtime.7541cc59301686b26f4e.js    6.05 kB  runtime  [emitted]  runtime
+          0.16cd564e49d298f3dfc7.js  286 bytes        0  [emitted]  
+          1.5c17bd07ebf8e7014306.js  286 bytes        1  [emitted]  
+         e1.11a0c2e96f5157d43b7b.js    1.09 kB       e1  [emitted]  e1
+    runtime.e994d7ad2c0558478376.js    6.08 kB  runtime  [emitted]  runtime
      vendor.502283099bd98427cd26.js  363 bytes   vendor  [emitted]  vendor
```

```diff
diff --git a/dist/0.3db1fe8adcf4d7f2aa8c.js b/dist/1.5c17bd07ebf8e7014306.js
similarity index 92%
rename from dist/0.3db1fe8adcf4d7f2aa8c.js
rename to dist/1.5c17bd07ebf8e7014306.js
index 143a1f4..9ac9a9f 100644
--- a/dist/0.3db1fe8adcf4d7f2aa8c.js
+++ b/dist/1.5c17bd07ebf8e7014306.js
@@ -1,4 +1,4 @@
-webpackJsonp([0],{
+webpackJsonp([1],{
 
 /***/ "./src/am1.js":
 /***/ (function(module, __webpack_exports__, __webpack_require__) {
```

That happened because its id [changed][1]. Chunks are ordered according to several parameters. The first parameter that is different for two chunks wins. Chunks with bigger values come first:

```
-- null
   entryOccurs: 1
   occurs: 1
   modules.length: 1
   modules:
      /.../src/am2.js   <--
-- null
   entryOccurs: 1
   occurs: 1
   modules.length: 1
   modules:
      /.../src/am1.js   <--
```

`NamedChunksPlugin` didn't help since async chunks [don't][2] [have][3] [names][4].

[1]: https://github.com/webpack/webpack/blob/v2.7.0/lib/optimize/OccurrenceOrderPlugin.js#L91-L105
[2]: https://github.com/webpack/webpack/blob/v2.7.0/lib/NamedChunksPlugin.js#L14
[3]: https://github.com/webpack/webpack/blob/v2.7.0/lib/NamedChunksPlugin.js#L22
[4]: https://github.com/webpack/webpack/blob/v2.7.0/lib/NamedChunksPlugin.js#L10
