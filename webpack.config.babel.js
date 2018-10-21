const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require('happypack');
const AutoDllPlugin = require('autodll-webpack-plugin');
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const pckg = require("./package");

const gitRevisionPlugin = new GitRevisionPlugin();
// const smp = new SpeedMeasurePlugin();

const array = (...target) => target.filter(Boolean);

// module.exports.default = ({dev}) => smp.wrap({
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
        splitChunks: false,
    },
    plugins: array(
        new HtmlWebpackPlugin({
            inject: true,
            title: "Xianxia Game",
            template: dev ? "./src/index.dev.ejs" : "./src/index.prod.ejs",
            filename: 'index.html',
            publicPath: path.resolve(__dirname, "public"),
        }),
        new webpack.DefinePlugin({
            VERSION: {
                VERSION: JSON.stringify(gitRevisionPlugin.version()),
                HASH: JSON.stringify(gitRevisionPlugin.commithash()),
                DATE: new Date().getTime(),
            },
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
        }),
        new HappyPack({
            loaders: ['babel-loader'],
        }),
        new AutoDllPlugin({
            inject: true,
            debug: true,
            filename: '[name]_[hash].js',
            path: './dll',
            entry: {
                vendor: [
                    'core-js',
                    ...Object.keys(pckg.dependencies),
                ],
            },
        }),
        !dev && new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[contenthash].css",
        }),
        dev && new webpack.NamedModulesPlugin(),
        dev && new webpack.HotModuleReplacementPlugin(), // https://webpack.js.org/configuration/dev-server/#devserver-hot
        // new BundleAnalyzerPlugin(),
    ),
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: 'happypack/loader',
        }, {
            test: /\.yml/,
            include: path.resolve(__dirname, 'data'),
            loader: ['json-loader', 'yaml-loader'],
        }, {
            test: /\.scss$/,
            use: [
                dev ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                    },
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: ["src"],
                    },
                },
            ],
        }],
    },
    resolve: {
        alias: {
            core: path.resolve(__dirname, 'src/core'),
            game: path.resolve(__dirname, 'src/game'),
        },
    },
    devServer: {
        hot: true,
        inline: true,
        port: 3000,
    },
});
