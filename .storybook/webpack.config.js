const path = require("path");
const sass = require("sass");

module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            sourceMap: true,
                        },
                    }, {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 2,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                        },
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: () => [
                                require('autoprefixer'),
                                require('postcss-flexbugs-fixes'),
                            ],
                        },
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            implementation: sass,
                        },
                    },
                ],
            }
        ]
    }
};
