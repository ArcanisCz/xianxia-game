const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const {createCssLoader} = require("../webpack.config.babel");

module.exports = (baseConfig, env) => {
    const dev = env === "DEVELOPMENT";

    if(!dev) {
        baseConfig.plugins.push(new MiniCssExtractPlugin());
    }
    baseConfig.resolve.alias.story = path.resolve(__dirname, '../src/story');
    baseConfig.module.rules.push(createCssLoader(dev));

    return baseConfig;
};

