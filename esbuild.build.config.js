const esbuild = require('esbuild');
const options = require("./esbuild.base.config");

return esbuild.build({
  ...options,
  minify: true,
});
