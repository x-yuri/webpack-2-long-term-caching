[`index.js`][index.js]:

[index.js]: src/index.js

```js
import './1.css';
```

[`1.css`][1.css]:

[1.css]: src/1.css

```css
body {
    margin: 0;
}
```

[`webpack.config.js`][webpack.config.js]:

[webpack.config.js]: webpack.config.js

```js
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    output: {
        filename: '[name].[chunkhash].js',
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
            ],
        }],
    },
    optimization: {
        minimize: false,
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name].[chunkhash].css'}),
    ],
};
```


```
$ ../../node_modules/.bin/webpack --mode production
                        Asset      Size  Chunks             Chunk Names
main.3b90845ca2260f805261.css  25 bytes       0  [emitted]  main
 main.3b90845ca2260f805261.js     4 KiB       0  [emitted]  main
```

Both assets have the same id, so if anything changes in any of them, they both would be invalidated.


Let's switch to `contenthash`:

```diff
--- webpack.config.js	2018-10-14 22:26:09.545205570 +0300
+++ webpack.config.js	2018-10-14 22:26:44.181873005 +0300
@@ -2,7 +2,7 @@
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 module.exports = {
     output: {
-        filename: '[name].[chunkhash].js',
+        filename: '[name].[contenthash].js',
     },
     module: {
         rules: [{
@@ -17,6 +17,6 @@
         minimize: false,
     },
     plugins: [
-        new MiniCssExtractPlugin({filename: '[name].[chunkhash].css'}),
+        new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),
     ],
 };
```

```
$ ../../node_modules/.bin/webpack --mode production
                        Asset      Size  Chunks             Chunk Names
main.799142d7000e815f3c8e.css  25 bytes       0  [emitted]  main
 main.f204ce6621f8e96fbb4d.js     4 KiB       0  [emitted]  main
```

Change color:

```diff
--- src/1.css	2018-10-14 22:27:17.231873746 +0300
+++ src/1.css	2018-10-14 22:27:26.408540619 +0300
@@ -1,3 +1,4 @@
 body {
     margin: 0;
+    color: #333;
 }
```

```
$ ../../node_modules/.bin/webpack --mode production
                        Asset      Size  Chunks             Chunk Names
main.b51101f1ce3ae858f399.css  42 bytes       0  [emitted]  main
 main.f204ce6621f8e96fbb4d.js     4 KiB       0  [emitted]  main
```

Javascript asset wasn't affected.

Revert the change, and change `index.js`:

```diff
--- src/index.js	2018-10-14 22:28:08.748541561 +0300
+++ src/index.js	2018-10-14 22:28:13.115208326 +0300
@@ -1 +1,2 @@
 import './1.css';
+console.log('index.js');
```

```
$ ../../node_modules/.bin/webpack --mode production
                        Asset      Size  Chunks             Chunk Names
main.799142d7000e815f3c8e.css  25 bytes       0  [emitted]  main
 main.d3b69c411fdfbbb8a134.js  4.03 KiB       0  [emitted]  main
```

CSS asset wasn't affected.


With `conenthash` changing `1.css` doesn't affect `index.js`, and vice versa. Because not all modules that make up the chunk are taken when calculating the content hashes:

Compilation: createHash: [`this.hooks.contentHash.call(...)`][a1]<br>
JavascriptModulesPlugin: hooks.contentHash: [`if (typeof m.source == 'function') ...`][a2]<br>
JavascriptModulesPlugin: hooks.contentHash: [`chunk.contentHash.javascript = ...`][a3]<br>
MiniCssExtractPlugin: hooks.contentHash: [`if (m.type == MODULE_TYPE) ...`][a4] (css/mini-extract)<br>
MiniCssExtractPlugin: hooks.contentHash: [`chunk.contentHash[MODULE_TYPE] = ...`][a5]<br>

Compilation: createChunkAssets: [`template.getRenderManifest(...)`][a6]<br>
MainTemplate: getRenderManifest: [`this.hooks.renderManifest.call(...)`][a7]<br>
JavascriptModulesPlugin: hooks.renderManifest: [`result.push({..., contentHashType: 'javascript', ...})`][a8]<br>
MiniCssExtractPlugin: hooks.renderManifest: [`result.push({..., contentHashType: MODULE_TYPE, ...})`][a9]<br>

Compilation: createChunkAssets: [`file = this.getPath(...)`][aa]<br>
Compilation: getPath: return [`this.mainTemplate.getAssetPath(...)`][ab]<br>
MainTemplate: getAssetPath: [`this.hooks.assetPath.call(...)`][ac]<br>
TemplatedPathPlugin: hooks.assetPath: [`contentHash = chunk.contentHash[contentHashType]`][ad]<br>

As opposed to chunk hashes:

Compilation: createHash: [`chunk.updateHash()`][ae]<br>
Chunk: updateHash: [`for (const m of this._modules) hash.update(m.hash)`][af]<br>
Compilation: createHash: [`chunk.hash = ...`][ag]<br>

TemplatedPathPlugin: hooks.assetPath: [`chunkHash = chunk.hash`][ah]<br>

[a1]: https://github.com/webpack/webpack/blob/v4.20.2/lib/Compilation.js#L2275
[a2]: https://github.com/webpack/webpack/blob/v4.20.2/lib/JavascriptModulesPlugin.js#L147
[a3]: https://github.com/webpack/webpack/blob/v4.20.2/lib/JavascriptModulesPlugin.js#L151-L154
[a4]: https://github.com/webpack-contrib/mini-css-extract-plugin/blob/v0.4.4/src/index.js#L243
[a5]: https://github.com/webpack-contrib/mini-css-extract-plugin/blob/v0.4.4/src/index.js#L247-L250
[a6]: https://github.com/webpack/webpack/blob/v4.20.2/lib/Compilation.js#L2328-L2335
[a7]: https://github.com/webpack/webpack/blob/v4.20.2/lib/MainTemplate.js#L358
[a8]: https://github.com/webpack/webpack/blob/v4.20.2/lib/JavascriptModulesPlugin.js#L74
[a9]: https://github.com/webpack-contrib/mini-css-extract-plugin/blob/v0.4.4/src/index.js#L185
[aa]: https://github.com/webpack/webpack/blob/v4.20.2/lib/Compilation.js#L2340
[ab]: https://github.com/webpack/webpack/blob/v4.20.2/lib/Compilation.js#L2418
[ac]: https://github.com/webpack/webpack/blob/v4.20.2/lib/MainTemplate.js#L495
[ad]: https://github.com/webpack/webpack/blob/v4.20.2/lib/TemplatedPathPlugin.js#L62-L64
[ae]: https://github.com/webpack/webpack/blob/v4.20.2/lib/Compilation.js#L2261
[af]: https://github.com/webpack/webpack/blob/v4.20.2/lib/Chunk.js#L432-L434
[ag]: https://github.com/webpack/webpack/blob/v4.20.2/lib/Compilation.js#L2272
[ah]: https://github.com/webpack/webpack/blob/v4.20.2/lib/TemplatedPathPlugin.js#L59


In this particular case there are three modules that make up the only chunk. Two of content hash type `javascript`:

`./src/index.js` (`NormalModule`):

```js
import './1.css';
```

`./src/1.css` (`NormalModule`):

```js
// extracted by mini-css-extract-plugin
```

And one of content hash type `css/mini-extract`:

`./src/1.css` (`CssModule`):

```css
body {
    margin: 0;
}
```

So, content hashes are needed for cases where there are assets of more than one content hash type. Like, `js` + `css`.
