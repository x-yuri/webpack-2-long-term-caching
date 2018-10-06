[`src/index.js`][index.js]:

[index.js]: src/index.js

```js
import('./am').then(({default: v}) => console.log(v));
```

[`src/am.js`][am.js]:

[am.js]: src/am.js

```js
export default 'am.js';
```

[`webpack.config.js`][webpack.config.js]:

[webpack.config.js]: webpack.config.js

```js
const webpack = require('webpack');
module.exports = {
    output: {
        filename: '[name].[chunkhash].js',
    },
    optimization: {
        minimize: false,
    },
    externals: {
        jquery: 'jQuery',
    },
};
```


```
$ ../../node_modules/.bin/webpack --mode production
                       Asset       Size  Chunks             Chunk Names
main.4a2b1c6b8f54332a5d51.js   8.12 KiB       0  [emitted]  main
   1.41f7fd3f3625ebc8d6bc.js  300 bytes       1  [emitted]  
Entrypoint main = main.4a2b1c6b8f54332a5d51.js
[0] ./src/index.js 55 bytes {0} [built]
[1] ./src/am.js 24 bytes {1} [built]
```

Import `jquery`:

```diff
--- src/index.js	2018-10-14 14:02:38.208112762 +0300
+++ src/index.js	2018-10-14 14:02:38.208112762 +0300
@@ -1 +1,2 @@
 import('./am').then(({default: v}) => console.log(v));
+import 'jquery';
```

```
$ ../../node_modules/.bin/webpack --mode production
                       Asset       Size  Chunks             Chunk Names
main.164e2c0f595af4c2ed78.js   8.49 KiB       0  [emitted]  main
   1.a7278e299dcaa5d71497.js  294 bytes       1  [emitted]  
Entrypoint main = main.164e2c0f595af4c2ed78.js
[0] ./src/index.js 72 bytes {0} [built]
[1] external "jQuery" 42 bytes {0} [built]
[2] ./src/am.js 24 bytes {1} [built]
```


Async chunk has changed because of id of its module:

```diff
--- dist/1.41f7fd3f3625ebc8d6bc.js	2018-10-14 22:56:14.698579283 +0300
+++ dist/1.a7278e299dcaa5d71497.js	2018-10-14 22:56:47.025246675 +0300
@@ -1,6 +1,6 @@
-(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],[
-/* 0 */,
-/* 1 */
+(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{
+
+/***/ 2:
 /***/ (function(module, __webpack_exports__, __webpack_require__) {
 
 "use strict";
@@ -9,4 +9,5 @@
 
 
 /***/ })
-]]);
\ No newline at end of file
+
+}]);
\ No newline at end of file
```

Modules are ordered according to [several parameters][a1]. The first parameter that is different for two modules wins. Modules with bigger values come first, except for the last parameter (original order):

[a1]: https://github.com/webpack/webpack/blob/v4.20.2/lib/optimize/OccurrenceModuleOrderPlugin.js#L87-L99

```
prioritiseInitial: true
-- ExternalModule
   entryOccurs: 2   <--
   occurs: 2
   originalOrder: 1
-- /home/yuri/_/4/cases/module-id/src/am.js
   entryOccurs: 1   <--
   occurs: 2
   originalOrder: 2
```

Let's add `HashedModuleIdsPlugin`:

```diff
--- webpack.config.js	2018-10-14 21:39:09.941809410 +0300
+++ webpack.config.js	2018-10-14 21:39:05.778475984 +0300
@@ -9,4 +9,7 @@
     externals: {
         jquery: 'jQuery',
     },
+    plugins: [
+        new webpack.HashedModuleIdsPlugin,
+    ],
 };
```

```
$ ../../node_modules/.bin/webpack --mode production
                       Asset       Size  Chunks             Chunk Names
main.964c65b1d521cacf78af.js   8.14 KiB       0  [emitted]  main
   1.197ac2f5a2007f9957f3.js  299 bytes       1  [emitted]  
Entrypoint main = main.964c65b1d521cacf78af.js
[XOo0] ./src/am.js 24 bytes {1} [built]
[tjUo] ./src/index.js 55 bytes {0} [built]
```

Import `jquery`:

```
$ ../../node_modules/.bin/webpack --mode production
                       Asset       Size  Chunks             Chunk Names
main.b694c4c52dac4c1e8668.js   8.52 KiB       0  [emitted]  main
   1.197ac2f5a2007f9957f3.js  299 bytes       1  [emitted]  
Entrypoint main = main.b694c4c52dac4c1e8668.js
[XOo0] ./src/am.js 24 bytes {1} [built]
[tjUo] ./src/index.js 72 bytes {0} [built]
[xeH2] external "jQuery" 42 bytes {0} [built]
```

This time async chunk wasn't affected.
