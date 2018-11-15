const path = require('path');
const webpack = require('webpack');
const sass = require('sass');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

const PROFILE = false;
const BUNDLE = false;

const gitRevisionPlugin = new GitRevisionPlugin();
const smp = PROFILE ? new SpeedMeasurePlugin() : {wrap: (x) => x};

const array = (...target) => target.filter(Boolean);
module.exports.default = ({dev}) => smp.wrap({
    entry: {
        main: "./src/index.js",
        message: "./src/index.message.js",
    },
    devtool: dev ? "cheap-module-source-map " : false,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: dev ? '[name].js' : '[name].[chunkhash].js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        minimizer: [new UglifyJSPlugin({
            exclude: /\/node_modules/,
            cache: true,
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
                mangle: true,
                compress: true,
                output: {
                    comments: false,
                },
            },
        })],
    },
    plugins: array(
        new HtmlWebpackPlugin({
            title: "Xianxia Game",
            template: dev ? "./src/index.dev.ejs" : "./src/index.prod.ejs",
            filename: 'index.html',
            publicPath: path.resolve(__dirname, "public"),
            inject: true,
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
        !dev && new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[contenthash].css",
        }),
        BUNDLE && new BundleAnalyzerPlugin(),
    ),
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: {
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                },
            },
        }, {
            test: /\.yml/,
            include: path.resolve(__dirname, 'data'),
            loader: ['json-loader', 'yaml-loader'],
        }, {
            test: /\.scss$/,
            include: path.resolve(__dirname, 'src'),
            use: [
                dev ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    },
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: ["src"],
                        implementation: sass,
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
        inline: true,
        port: 3000,
    },
});
