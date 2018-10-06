### Import external module

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

```diff
diff --git a/webpack.config.js b/webpack.config.js
index 1495775..041b6cd 100644
--- a/webpack.config.js
+++ b/webpack.config.js
@@ -24,4 +24,7 @@ module.exports = {
         }),
         new webpack.NamedModulesPlugin,
     ],
+    externals: {
+        jquery: 'jQuery',
+    },
 };
```

    $ rm -rf dist; node_modules/.bin/webpack
    Hash: 6b2f57f982de2bd7ba07
    Version: webpack 2.7.0
    Time: 71ms
                              Asset       Size   Chunks             Chunk Names
     am1.js.c7916324ca428f14ac06.js  293 bytes   am1.js  [emitted]  
     am2.js.7d7677b31595dc0aebab.js  293 bytes   am2.js  [emitted]  
         e1.5eef75839730c97a31b8.js    1.41 kB       e1  [emitted]  e1
    runtime.34fbbaef27371d416b21.js    6.09 kB  runtime  [emitted]  runtime
     vendor.282384c213f03a9cd88a.js  363 bytes   vendor  [emitted]  vendor
    [./node_modules/negative-zero/index.js] ./~/negative-zero/index.js 54 bytes {vendor} [built]
    [./src/am1.js] ./src/am1.js 22 bytes {am1.js} [built]
    [./src/am2.js] ./src/am2.js 22 bytes {am2.js} [built]
       [1] multi negative-zero 28 bytes {vendor} [built]
    [./src/e1.js] ./src/e1.js 187 bytes {e1} [built]
    [./src/m1.js] ./src/m1.js 22 bytes {e1} [built]
        + 1 hidden modules

Importing `jquery` has invalidated `vendor` chunk:

```diff
                               Asset       Size   Chunks             Chunk Names
      am1.js.c7916324ca428f14ac06.js  293 bytes   am1.js  [emitted]  
      am2.js.7d7677b31595dc0aebab.js  293 bytes   am2.js  [emitted]  
-         e1.cb8e57bfd81dcd728c40.js     1.1 kB       e1  [emitted]  e1
-    runtime.a949e1a5abaa96cac311.js    6.09 kB  runtime  [emitted]  runtime
-     vendor.502283099bd98427cd26.js  363 bytes   vendor  [emitted]  vendor
+         e1.5eef75839730c97a31b8.js    1.41 kB       e1  [emitted]  e1
+    runtime.34fbbaef27371d416b21.js    6.09 kB  runtime  [emitted]  runtime
+     vendor.282384c213f03a9cd88a.js  363 bytes   vendor  [emitted]  vendor
```

```diff
diff --git a/dist/vendor.502283099bd98427cd26.js b/dist/vendor.282384c213f03a9cd88a.js
similarity index 95%
rename from dist/vendor.502283099bd98427cd26.js
rename to dist/vendor.282384c213f03a9cd88a.js
index 3597416..7a8a4d8 100644
--- a/dist/vendor.502283099bd98427cd26.js
+++ b/dist/vendor.282384c213f03a9cd88a.js
@@ -10,7 +10,7 @@ module.exports = x => Object.is(x, -0);
 
 /***/ }),
 
-/***/ 0:
+/***/ 1:
 /***/ (function(module, exports, __webpack_require__) {
 
 module.exports = __webpack_require__("./node_modules/negative-zero/index.js");
@@ -18,4 +18,4 @@ module.exports = __webpack_require__("./node_modules/negative-zero/index.js");
 
 /***/ })
 
-},[0]);
\ No newline at end of file
+},[1]);
\ No newline at end of file
```

That happened because id of its module [changed][1]. `NamedModulesPlugin` assigns ids [only][2] to [normal][3] [modules][4]. Not to [external][5] or [multi ones][6]. The rest get their [numeric][7] [ids][8].

Modules are ordered according to several parameters. The first parameter that is different for two modules wins. Modules with bigger values come first, except for the last parameter:

```
preferEntry: true
-- ExternalModule
   entryOccurs: 3   <-- (module imported by entry point)
   occurs: 2
   identifier: external "jQuery"
-- MultiModule
   entryOccurs: 2   <-- (entry point)
   occurs: 2
   identifier: multi negative-zero
```

[1]: https://github.com/webpack/webpack/blob/v2.7.0/lib/optimize/OccurrenceOrderPlugin.js#L51-L63
[2]: https://github.com/webpack/webpack/blob/v2.7.0/lib/Compilation.js#L591
[3]: https://github.com/webpack/webpack/blob/v2.7.0/lib/NamedModulesPlugin.js#L16
[4]: https://github.com/webpack/webpack/blob/v2.7.0/lib/NormalModule.js#L88
[5]: https://github.com/webpack/webpack/blob/v2.7.0/lib/ExternalModule.js
[6]: https://github.com/webpack/webpack/blob/v2.7.0/lib/MultiModule.js
[7]: https://github.com/webpack/webpack/blob/v2.7.0/lib/Compilation.js#L593
[8]: https://github.com/webpack/webpack/blob/v2.7.0/lib/Compilation.js#L963
