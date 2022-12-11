const {htmlPlugin} = require('@craftamap/esbuild-plugin-html');

module.exports = {
  entryPoints: ['src/index.tsx'],
  metafile: true,
  target: [
    'es2020',
    'chrome58',
    'edge16',
    'firefox57',
    'node12',
    'safari11',
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
  ],
}

