### Name async chunks

```diff
diff --git a/src/e1.js b/src/e1.js
index d5af6dc..4101863 100644
--- a/src/e1.js
+++ b/src/e1.js
@@ -1,5 +1,3 @@
 import negativeZero from 'negative-zero';
 import m1 from './m1';
-import('./am1').then(a => console.log(a));
-import('./am2').then(a => console.log(a));
 console.log('e1');
```

```diff
diff --git a/webpack.config.js b/webpack.config.js
index 2732c11..1495775 100644
--- a/webpack.config.js
+++ b/webpack.config.js
@@ -16,7 +16,12 @@ module.exports = {
         new webpack.optimize.CommonsChunkPlugin({
             name: 'runtime',
         }),
-        new webpack.NamedChunksPlugin,
+        new webpack.NamedChunksPlugin(chunk => {
+            if (chunk.name) {
+                return chunk.name;
+            }
+            return chunk.modules.map(m => path.relative(m.context, m.request)).join("_");
+        }),
         new webpack.NamedModulesPlugin,
     ],
 };
```

    $ rm -rf dist; node_modules/.bin/webpack
    Hash: e94c6f08467889111c0d
    Version: webpack 2.7.0
    Time: 72ms
                              Asset       Size   Chunks             Chunk Names
         e1.5901c1f85447b05ec932.js  850 bytes       e1  [emitted]  e1
    runtime.69164cfcc16de8ee094d.js    6.02 kB  runtime  [emitted]  runtime
     vendor.502283099bd98427cd26.js  363 bytes   vendor  [emitted]  vendor
    [./node_modules/negative-zero/index.js] ./~/negative-zero/index.js 54 bytes {vendor} [built]
       [0] multi negative-zero 28 bytes {vendor} [built]
    [./src/e1.js] ./src/e1.js 84 bytes {e1} [built]
    [./src/m1.js] ./src/m1.js 22 bytes {e1} [built]

`NamedChunksPlugin` allows to specify a custom name [resolver][1].

[1]: https://github.com/webpack/webpack/blob/v2.7.0/lib/NamedChunksPlugin.js#L14
