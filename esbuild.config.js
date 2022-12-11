const esbuild = require('esbuild');
const {htmlPlugin} = require('@craftamap/esbuild-plugin-html');
const devServer = require('esbuild-plugin-dev-server');

const options = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  metafile: true,
  incremental: true,
  target: ["es6"],
  minify: true,
  format: 'cjs',
  sourcemap: true,
  outdir: 'dist/',
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
    devServer({public: './dist', port: 3000})
  ],
}

esbuild.build(options).then(() => {
  // return process.exit(0);
},() => process.exit(1))

