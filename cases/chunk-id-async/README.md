[`src/index.js`][index.js]:

[index.js]: src/index.js

```js
import('./am1').then(({default: v}) => console.log(v));
import('./am2').then(({default: v}) => console.log(v));
```

[`src/am1.js`][am1.js]:

[am1.js]: src/am1.js

```js
export default 'am1.js';
```

[`src/am2.js`][am2.js]:

[am2.js]: src/am2.js

```js
export default 'am2.js';
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
    plugins: [
        new webpack.HashedModuleIdsPlugin,
    ],
};
```


```
$ ../../node_modules/.bin/webpack --mode production
                       Asset       Size  Chunks             Chunk Names
main.7f2b653914e2bcea4539.js   8.29 KiB       0  [emitted]  main
   1.319f298f5ca8b328e431.js  300 bytes       1  [emitted]  
   2.3397626e8c97f4e71279.js  300 bytes       2  [emitted]  
```

Reorder the imports:

```diff
--- src/index.js	2018-10-14 21:30:35.925131325 +0300
+++ src/index.js	2018-10-14 14:02:38.204779429 +0300
@@ -1,2 +1,2 @@
-import('./am1').then(({default: v}) => console.log(v));
 import('./am2').then(({default: v}) => console.log(v));
+import('./am1').then(({default: v}) => console.log(v));
```

```
$ ../../node_modules/.bin/webpack --mode production
                       Asset       Size  Chunks             Chunk Names
main.68f79fded816b4ba8fc8.js   8.29 KiB       0  [emitted]  main
   1.41fdc9a3b0255acb4a67.js  300 bytes       1  [emitted]  
   2.4ddb2eb21c9e73af6908.js  300 bytes       2  [emitted]  
```


Async chunks have changed because of their ids:

```diff
--- dist/1.319f298f5ca8b328e431.js	2018-10-14 21:54:36.318496658 +0300
+++ dist/2.4ddb2eb21c9e73af6908.js	2018-10-14 21:55:27.398497788 +0300
@@ -1,4 +1,4 @@
-(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{
+(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{
 
 /***/ "GFq9":
 /***/ (function(module, __webpack_exports__, __webpack_require__) {
```

```diff
--- dist/2.3397626e8c97f4e71279.js	2018-10-14 21:54:36.318496658 +0300
+++ dist/1.41fdc9a3b0255acb4a67.js	2018-10-14 21:55:27.398497788 +0300
@@ -1,4 +1,4 @@
-(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{
+(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{
 
 /***/ "9Mkn":
 /***/ (function(module, __webpack_exports__, __webpack_require__) {
```

That happened because async chunks are added in the order they are imported:

Compilation: seal: [this.processDependenciesBlocksForChunkGroups(entrypointChunks)][a1]<br>
Compilation: processDependenciesBlocksForChunkGroups: [blockInfo.blocks = module.blocks][a2]<br>
Compilation: processDependenciesBlocksForChunkGroups: [blockInfo.blocks.forEach(iteratorBlock)][a3]<br>
Compilation: iteratorBlock: [this.addChunkInGroup(...)][a4]<br>
Compilation: addChunkInGroup: [this.addChunk(...)][a5]<br>

[a1]: https://github.com/webpack/webpack/blob/v4.20.2/lib/Compilation.js#L1191
[a2]: https://github.com/webpack/webpack/blob/v4.20.2/lib/Compilation.js#L1567
[a3]: https://github.com/webpack/webpack/blob/v4.20.2/lib/Compilation.js#L1748
[a4]: https://github.com/webpack/webpack/blob/v4.20.2/lib/Compilation.js#L1646-L1651
[a5]: https://github.com/webpack/webpack/blob/v4.20.2/lib/Compilation.js#L1375

They might later get reordered, but not in this case.


Let's add `NamedChunksPlugin`:

```diff
--- webpack.config.js	2018-10-14 21:37:57.251807795 +0300
+++ webpack.config.js	2018-10-14 21:38:06.135141329 +0300
@@ -8,5 +8,6 @@
     },
     plugins: [
         new webpack.HashedModuleIdsPlugin,
+        new webpack.NamedChunksPlugin,
     ],
 };
```

```
$ ../../node_modules/.bin/webpack --mode production
                       Asset       Size  Chunks             Chunk Names
main.4e56fe351d5faa4d8273.js   8.29 KiB    main  [emitted]  main
   0.6b6f969cdfe0a9029dde.js  300 bytes       0  [emitted]  
   1.41fdc9a3b0255acb4a67.js  300 bytes       1  [emitted]  
```

Reorder the imports:

```
$ ../../node_modules/.bin/webpack --mode production
                       Asset       Size  Chunks             Chunk Names
main.e69499ad520f2098206a.js   8.29 KiB    main  [emitted]  main
   0.9d50d6a629055e91437f.js  300 bytes       0  [emitted]  
   1.319f298f5ca8b328e431.js  300 bytes       1  [emitted]  
```


Async chunks have changed nevertheless:

```diff
--- dist/0.6b6f969cdfe0a9029dde.js	2018-10-14 21:57:09.598500061 +0300
+++ dist/1.319f298f5ca8b328e431.js	2018-10-14 21:57:32.458500572 +0300
@@ -1,4 +1,4 @@
-(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{
+(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{
 
 /***/ "GFq9":
 /***/ (function(module, __webpack_exports__, __webpack_require__) {
```

```diff
--- dist/1.41fdc9a3b0255acb4a67.js	2018-10-14 21:57:09.598500061 +0300
+++ dist/0.9d50d6a629055e91437f.js	2018-10-14 21:57:32.458500572 +0300
@@ -1,4 +1,4 @@
-(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{
+(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{
 
 /***/ "9Mkn":
 /***/ (function(module, __webpack_exports__, __webpack_require__) {
```

That happened because `NamedChunksPlugin` didn't give names to async chunks. Since they [don't][b1] [have][b2] [ones][b3].

[b1]: https://github.com/webpack/webpack/blob/v4.20.2/lib/NamedChunksPlugin.js#L13
[b2]: https://github.com/webpack/webpack/blob/v4.20.2/lib/NamedChunksPlugin.js#L21
[b3]: https://github.com/webpack/webpack/blob/v4.20.2/lib/NamedChunksPlugin.js#L9


One way to handle this is to name the chunks in the code:

```diff
--- src/index.js	2018-10-14 21:30:35.925131325 +0300
+++ src/index.js	2018-10-14 14:02:38.204779429 +0300
@@ -1,2 +1,2 @@
-import('./am1').then(({default: v}) => console.log(v));
-import('./am2').then(({default: v}) => console.log(v));
+import(/* webpackChunkName: 'am1' */ './am1').then(({default: v}) => console.log(v));
+import(/* webpackChunkName: 'am2' */ './am2').then(({default: v}) => console.log(v));
```

```
$ ../../node_modules/.bin/webpack --mode production
                       Asset       Size  Chunks             Chunk Names
 am1.0586acc0c51464a01890.js  304 bytes     am1  [emitted]  am1
 am2.bfd2655baa5ca3e57554.js  304 bytes     am2  [emitted]  am2
main.f50c54fef970094ca59b.js   8.34 KiB    main  [emitted]  main
```

Reorder the imports:

```
$ ../../node_modules/.bin/webpack --mode production
                       Asset       Size  Chunks             Chunk Names
 am1.0586acc0c51464a01890.js  304 bytes     am1  [emitted]  am1
 am2.bfd2655baa5ca3e57554.js  304 bytes     am2  [emitted]  am2
main.86e30a457f96113f9a85.js   8.34 KiB    main  [emitted]  main
```

Async chunks weren't affected.


The other way is to name them [automatically][c1]:

[c1]: https://github.com/webpack/webpack/issues/1315#issuecomment-386267369

```diff
--- webpack.config.js	2018-10-14 21:38:06.135141329 +0300
+++ webpack.config.js	2018-10-14 21:38:02.338474577 +0300
@@ -1,3 +1,4 @@
+const path = require('path');
 const webpack = require('webpack');
 module.exports = {
     output: {
@@ -8,6 +9,18 @@
     },
     plugins: [
         new webpack.HashedModuleIdsPlugin,
-        new webpack.NamedChunksPlugin,
+        new webpack.NamedChunksPlugin(chunk => {
+            if (chunk.name) {
+                return chunk.name;
+            }
+            return [...chunk._modules]
+                .map(m =>
+                    path.relative(
+                        m.context,
+                        m.userRequest.substring(0, m.userRequest.lastIndexOf('.'))
+                    )
+                )
+                .join('_');
+        }),
     ],
 };
```

```
$ ../../node_modules/.bin/webpack --mode production
                       Asset       Size  Chunks             Chunk Names
 am1.83588f0ba4a841058042.js  304 bytes     am1  [emitted]  
 am2.812bb57df2cd9393e489.js  304 bytes     am2  [emitted]  
main.9537e70d560c6c7e899b.js    8.3 KiB    main  [emitted]  main
```

Reorder the imports:

```
$ ../../node_modules/.bin/webpack --mode production
                       Asset       Size  Chunks             Chunk Names
 am1.83588f0ba4a841058042.js  304 bytes     am1  [emitted]  
 am2.812bb57df2cd9393e489.js  304 bytes     am2  [emitted]  
main.215cbf42566f34a4234f.js    8.3 KiB    main  [emitted]  main
```

Async chunks weren't affected.


I have little to no experience with async chunks, but having a name that is a concatenation of chunk's module names doesn't seem like a good idea.
