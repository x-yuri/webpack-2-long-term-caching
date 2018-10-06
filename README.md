### Change e1

```diff
diff --git a/src/e1.js b/src/e1.js
index 8db95f3..7f44afb 100644
--- a/src/e1.js
+++ b/src/e1.js
@@ -1 +1,2 @@
 import negativeZero from 'negative-zero';
+console.log('e1');
```

    $ rm -rf dist; node_modules/.bin/webpack
    Hash: 91b74316248da72c4bfc
    Version: webpack 2.7.0
    Time: 60ms
                             Asset       Size  Chunks             Chunk Names
        e1.cd507058567f9af748af.js  474 bytes       0  [emitted]  e1
    vendor.b255256afacd96d01b79.js    6.38 kB       1  [emitted]  vendor
       [0] ./~/negative-zero/index.js 54 bytes {1} [built]
       [1] ./src/e1.js 61 bytes {0} [built]
       [2] multi negative-zero 28 bytes {1} [built]

Changes in chunk `e1` has invalidated `vendor` chunk:

```diff
                              Asset       Size  Chunks             Chunk Names
-        e1.1f965e96896cca677617.js  455 bytes       0  [emitted]  e1
-    vendor.1e11f0c1ebfa5e58688d.js    6.38 kB       1  [emitted]  vendor
+        e1.cd507058567f9af748af.js  474 bytes       0  [emitted]  e1
+    vendor.b255256afacd96d01b79.js    6.38 kB       1  [emitted]  vendor
```

```diff
diff --git a/dist/vendor.1e11f0c1ebfa5e58688d.js b/dist/vendor.b255256afacd96d01b79.js
similarity index 98%
rename from dist/vendor.1e11f0c1ebfa5e58688d.js
rename to dist/vendor.b255256afacd96d01b79.js
index 4dff923..2a1db2f 100644
--- a/dist/vendor.1e11f0c1ebfa5e58688d.js
+++ b/dist/vendor.b255256afacd96d01b79.js
@@ -91,7 +91,7 @@
 /******/ 		if (__webpack_require__.nc) {
 /******/ 			script.setAttribute("nonce", __webpack_require__.nc);
 /******/ 		}
-/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + {"0":"1f965e96896cca677617"}[chunkId] + ".js";
+/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + {"0":"cd507058567f9af748af"}[chunkId] + ".js";
 /******/ 		var timeout = setTimeout(onScriptComplete, 120000);
 /******/ 		script.onerror = script.onload = onScriptComplete;
 /******/ 		function onScriptComplete() {
```

That happened because `vendor` chunk now contains runtime and manifest. Runtime allows modules to interact (import each other). Manifest is a part of runtime that contains hashes of other chunks.
