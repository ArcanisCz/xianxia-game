const path = require("path");

const {createCssLoader} = require("../webpack.config.babel");

module.exports = (baseConfig) => {
    baseConfig.resolve.alias.story = path.resolve(__dirname, '../src/story');
    baseConfig.module.rules.push(createCssLoader(true));
    return baseConfig;
};

