const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const GitRevisionPlugin = require('git-revision-webpack-plugin');
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const gitRevisionPlugin = new GitRevisionPlugin();

const array = (...target) => target.filter(Boolean);

module.exports.default = ({dev}) => ({
    entry: {
        main: "./src/index.js",
    },
    target: 'web',
    devtool: dev ? "cheap-module-source-map " : false,
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
            title: "Xianxia Game",
            template: dev ? "./src/index.dev.ejs" : "./src/index.prod.ejs",
            filename: 'index.html',
            publicPath: path.resolve(__dirname, "public"),
        }),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(gitRevisionPlugin.version()),
        }),
        dev && new webpack.NamedModulesPlugin(),
        // new BundleAnalyzerPlugin(),
    ),
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'babel-loader',
        }, {
            test: /\.yml/,
            include: path.resolve(__dirname, 'data'),
            loader: ['json-loader', 'yaml-loader'],
        }],
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components'),
            containers: path.resolve(__dirname, 'src/containers'),
            core: path.resolve(__dirname, 'src/core'),
            game: path.resolve(__dirname, 'src/game'),
            definitions: path.resolve(__dirname, 'src/definitions'),
        },
    },
    devServer: {
        inline: true,
        port: 3000,
    },
});
