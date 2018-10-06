### Name all modules

```diff
diff --git a/src/e1.js b/src/e1.js
index 659b337..d5af6dc 100644
--- a/src/e1.js
+++ b/src/e1.js
@@ -2,5 +2,4 @@ import negativeZero from 'negative-zero';
 import m1 from './m1';
 import('./am1').then(a => console.log(a));
 import('./am2').then(a => console.log(a));
-import 'jquery';
 console.log('e1');
```

```diff
diff --git a/webpack.config.js b/webpack.config.js
index 041b6cd..d1854ed 100644
--- a/webpack.config.js
+++ b/webpack.config.js
@@ -23,6 +23,20 @@ module.exports = {
             return chunk.modules.map(m => path.relative(m.context, m.request)).join("_");
         }),
         new webpack.NamedModulesPlugin,
+        {
+            apply(compiler) {
+                compiler.plugin('compilation', (compilation) => {
+                    compilation.plugin('before-module-ids', (modules) => {
+                        modules.forEach((module) => {
+                            if (module.id !== null) {
+                                return;
+                            }
+                            module.id = module.identifier();
+                        });
+                    });
+                });
+            }
+        }
     ],
     externals: {
         jquery: 'jQuery',
```

    $ rm -rf dist; node_modules/.bin/webpack
    Hash: 9579b727ea99485384c6
    Version: webpack 2.7.0
    Time: 71ms
                              Asset       Size   Chunks             Chunk Names
     am1.js.c7916324ca428f14ac06.js  293 bytes   am1.js  [emitted]  
     am2.js.7d7677b31595dc0aebab.js  293 bytes   am2.js  [emitted]  
         e1.cb8e57bfd81dcd728c40.js     1.1 kB       e1  [emitted]  e1
    runtime.9c020682f08a2ce0dd3c.js    6.09 kB  runtime  [emitted]  runtime
     vendor.607f87886a613a461165.js  403 bytes   vendor  [emitted]  vendor
    [./node_modules/negative-zero/index.js] ./~/negative-zero/index.js 54 bytes {vendor} [built]
    [./src/am1.js] ./src/am1.js 22 bytes {am1.js} [built]
    [./src/am2.js] ./src/am2.js 22 bytes {am2.js} [built]
    [./src/e1.js] ./src/e1.js 170 bytes {e1} [built]
    [./src/m1.js] ./src/m1.js 22 bytes {e1} [built]
    [multi negative-zero] multi negative-zero 28 bytes {vendor} [built]
