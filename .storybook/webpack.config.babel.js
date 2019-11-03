const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const {createCssModuleLoader} = require("../webpack.config.babel");

module.exports = ({config, mode}) => {
    const dev = mode === "DEVELOPMENT";
    const cssLoaderIndex = config.module.rules.findIndex(({test}) => test.toString().includes('css'));
    config.module.rules.splice(cssLoaderIndex, 1);

    config.plugins.push(new MiniCssExtractPlugin());
    config.resolve.alias.story = path.resolve(__dirname, '../src/story');

    config.module.rules.push({
        test: [/\.css$/],
        oneOf: [{
            test: /\.module\.css$/,
            use: createCssModuleLoader(dev, true),
        }, {
            use: createCssModuleLoader(dev, false),
        }],
    });

    return config;
};

