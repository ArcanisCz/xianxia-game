const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin =require( "webpack-bundle-analyzer").BundleAnalyzerPlugin;

const pckg = require("./package.json");

const array = (...target) => target.filter((item) => item);

module.exports.default = ({dev}) => ({
    entry: {
        main: array(
            'babel-polyfill',
            "./src/index.js",
        ),
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: dev ? '[name].js' : '[name].[chunkhash].js',
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: array(
        new HtmlWebpackPlugin({
            title: pckg.version,
            template: "./src/index.ejs",
            filename: 'index.html',
        }),
        dev && new webpack.NamedModulesPlugin(),
        // https://webpack.js.org/configuration/dev-server/#devserver-hot
        dev && new webpack.HotModuleReplacementPlugin(),
        !dev && new webpack.NoEmitOnErrorsPlugin(),
        // new BundleAnalyzerPlugin(),
    ),
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [["env", {
                        targets: {
                            browsers: ["last 2 versions", "IE 9"],
                        },
                        modules: false,
                    }], "react"],
                    plugins: [
                        array(
                            "transform-object-rest-spread",
                            // "transform-react-constant-elements", // TODO doesnt work?
                            // "transform-react-inline-elements", // TODO doesnt work?
                            // "transform-react-remove-prop-types", // TODO doesnt work?
                            dev && "react-hot-loader/babel",
                        ),
                    ],
                },
            },
        }, {
            test: /\.yml/,
            include: path.resolve(__dirname, 'data'),
            loader: ['json-loader', 'yaml-loader'],
        }],
    },
    devServer: {
        hot: true,
        inline: true,
        port: 3000,
    },
    resolve: {
        modules: ['src', 'node_modules'],
    },
});
