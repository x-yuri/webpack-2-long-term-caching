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
const path = require('path');
module.exports = {
    output: {
        filename: '[name].[chunkhash].js',
    },
    optimization: {
        minimize: false,
    },
};
```


Manifest can be seen where there are async chunks. Granted that you tell `webpack` to use hashes in the filenames:

JsonpMainTemplatePlugin: MainTemplate.hooks.localVars: [if (needChunkOnDemandLoadingCode(chunk)) ...][a1]<br>
JsonpMainTemplatePlugin: needChunkOnDemandLoadingCode: [if (chunkGroup.getNumberOfChildren() > 0) ...][a2]<br>
JsonpMainTemplatePlugin: MainTemplate.hooks.localVars: [return ... getScriptSrcPath(...)][a3]<br>
JsonpMainTemplatePlugin: getScriptSrcPath: [return ... chunkMaps.hash][a4]<br>

[a1]: https://github.com/webpack/webpack/blob/v4.20.2/lib/web/JsonpMainTemplatePlugin.js#L121
[a2]: https://github.com/webpack/webpack/blob/v4.20.2/lib/web/JsonpMainTemplatePlugin.js#L14
[a3]: https://github.com/webpack/webpack/blob/v4.20.2/lib/web/JsonpMainTemplatePlugin.js#L127-L131
[a4]: https://github.com/webpack/webpack/blob/v4.20.2/lib/web/JsonpMainTemplatePlugin.js#L57

It's this part of the runtime, that allows to determine chunk hash by its id.

```
$ ../../node_modules/.bin/webpack --mode production
                       Asset       Size  Chunks             Chunk Names
main.4a2b1c6b8f54332a5d51.js   8.12 KiB       0  [emitted]  main
   1.41f7fd3f3625ebc8d6bc.js  300 bytes       1  [emitted]  
```

Let's change the async chunk:

```diff
--- src/am.js	2018-10-14 14:02:38.208112762 +0300
+++ src/am.js	2018-10-14 14:02:38.208112762 +0300
@@ -1 +1 @@
-export default 'am.js';
+export default 'am-new.js';
```

```
$ ../../node_modules/.bin/webpack --mode production
                       Asset       Size  Chunks             Chunk Names
main.1e347632511f8eda9f2b.js   8.12 KiB       0  [emitted]  main
   1.9fd35a9650730667a8a0.js  304 bytes       1  [emitted]  
```

`main` chunk has changed because of the manifest:

```diff
--- dist/main.4a2b1c6b8f54332a5d51.js	2018-10-14 22:46:18.911899294 +0300
+++ dist/main.1e347632511f8eda9f2b.js	2018-10-14 22:46:26.995232809 +0300
@@ -43,7 +43,7 @@
 /******/
 /******/ 	// script path function
 /******/ 	function jsonpScriptSrc(chunkId) {
-/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "." + {"1":"41f7fd3f3625ebc8d6bc"}[chunkId] + ".js"
+/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "." + {"1":"9fd35a9650730667a8a0"}[chunkId] + ".js"
 /******/ 	}
 /******/
 /******/ 	// The require function
```


To avoid that one can move runtime with the manifest into separate chunk:

```diff
--- webpack.config.js	2018-10-14 21:39:01.041809212 +0300
+++ webpack.config.js	2018-10-14 22:50:18.361904651 +0300
@@ -5,5 +5,6 @@
     },
     optimization: {
         minimize: false,
+        runtimeChunk: 'single',
     },
 };
```

```
$ ../../node_modules/.bin/webpack --mode production
                          Asset       Size  Chunks             Chunk Names
   main.2dd7ac421b251caeebe0.js  276 bytes       0  [emitted]  main
      1.41f7fd3f3625ebc8d6bc.js  300 bytes       1  [emitted]  
runtime.7661f7f31bdf5dd7e524.js    8.8 KiB       2  [emitted]  runtime
```

Change the async chunk:

```
$ ../../node_modules/.bin/webpack --mode production
                          Asset       Size  Chunks             Chunk Names
   main.2dd7ac421b251caeebe0.js  276 bytes       0  [emitted]  main
      1.9fd35a9650730667a8a0.js  304 bytes       1  [emitted]  
runtime.e05d0c7bffad1a896d54.js    8.8 KiB       2  [emitted]  runtime
```

This time `main` chunk wasn't affected.
