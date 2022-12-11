const esbuild = require('esbuild');
const devServer = require('esbuild-plugin-dev-server');
const options = require("./esbuild.base.config");

return esbuild.build({
  ...options,
  plugins: [
    ...options.plugins,
    devServer({public: './dist', port: 3000})
  ],
  incremental: true,
}).then(() => {
  console.log("running server at http://localhost:3000");
})

