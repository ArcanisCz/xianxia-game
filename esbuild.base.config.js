const {htmlPlugin} = require('@craftamap/esbuild-plugin-html');
const cssModulesPlugin = require('esbuild-css-modules-plugin');

module.exports = {
  entryPoints: ['src/index.tsx'],
  metafile: true,
  target: [
    'es2020',
    'chrome90',
  ],
  bundle: true,
  format: 'cjs',
  sourcemap: true,
  outdir: 'dist/',
  jsx: "automatic",
  entryNames: "js/[name]-[hash]",
  assetNames: "asset/[name]-[hash]",
  plugins: [
    htmlPlugin({
      files: [
        {
          entryPoints: [
            'src/index.tsx',
          ],
          filename: 'index.html',
          htmlTemplate: "./src/index.html"
        }
      ]
    }),
    cssModulesPlugin({
      inject: true,
      v2: true,
    }),
  ],
}

