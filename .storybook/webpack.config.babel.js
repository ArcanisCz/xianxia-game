const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const {createCssLoader} = require("../webpack.config.babel");

module.exports = ({config, mode}) => {
    const dev = mode === "DEVELOPMENT";

    if(!dev) {
        config.plugins.push(new MiniCssExtractPlugin());
    }
    config.resolve.alias.story = path.resolve(__dirname, '../src/story');
    config.module.rules.push(createCssLoader(dev));

    return config;
};

