const path = require('path');
const webpack = require('webpack');
const sass = require('sass');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
        ...(dev ? {} : {message: "./src/index.message.js"}),
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
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
            }),
            new OptimizeCssAssetsPlugin({}),
        ],
    },
    plugins: array(
        new HtmlWebpackPlugin({
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
        !dev && new MiniCssExtractPlugin({
            filename: "[contenthash].css",
        }),
        BUNDLE && new BundleAnalyzerPlugin(),
    ),
    module: {
        rules: [
            createJsLoader(dev),
            createYamlLoader(dev),
            createCssLoader(dev),
        ],
    },
    resolve: {
        alias: {
            core: path.resolve(__dirname, 'src/core'),
            game: path.resolve(__dirname, 'src/game'),
            components: path.resolve(__dirname, 'src/components'),
        },
    },
    devServer: {
        inline: true,
        port: 3000,
    },
});

const createJsLoader = () => ({
    test: /\.js$/,
    include: path.resolve(__dirname, 'src'),
    sideEffects: false,
    use: {
        loader: "babel-loader",
        options: {
            cacheDirectory: true,
        },
    },
});

const createYamlLoader = () => ({
    test: /\.yml/,
    include: path.resolve(__dirname, 'data'),
    loader: ['json-loader', 'yaml-loader'],
});

const createCssLoader = (dev) => ({
    test: /\.scss$/,
    include: path.resolve(__dirname, 'src'),
    use: [
        !dev ? MiniCssExtractPlugin.loader : {
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
                localIdentName: dev ? '[name]__[local]--[hash:base64:5]' : undefined,
            },
        }, {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
                plugins: () => array(
                    require('autoprefixer'),
                    require('postcss-flexbugs-fixes'),
                ),
            },
        }, {
            loader: 'sass-loader',
            options: {
                sourceMap: true,
                implementation: sass,
            },
        },
    ],
});

module.exports.createCssLoader = createCssLoader;
