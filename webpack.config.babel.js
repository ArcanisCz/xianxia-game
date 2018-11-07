const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require('happypack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

const PROFILE = false;
const BUNDLE = false;

const gitRevisionPlugin = new GitRevisionPlugin();
const smp = PROFILE ? new SpeedMeasurePlugin() : {wrap: (x) => x};
const pckg = require("./package");


const array = (...target) => target.filter(Boolean);
module.exports.default = ({dev}) => smp.wrap({
    entry: {
        main: "./src/index.js",
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
        dev && new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
        }),
        new HappyPack({
            loaders: ['babel-loader'],
        }),
        !dev && new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[contenthash].css",
        }),
        // for faster dev
        dev && new AutoDllPlugin({
            inject: true,
            debug: true,
            filename: '[name].js',
            entry: {
                vendor: Object.keys(pckg.dependencies),
            },
        }),
        dev && new webpack.HotModuleReplacementPlugin(), // https://webpack.js.org/configuration/dev-server/#devserver-hot
        !dev && new CompressionPlugin(),
        BUNDLE && new BundleAnalyzerPlugin(),
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
                    loader: "fast-sass-loader",
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
