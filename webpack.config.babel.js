const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const PROFILE = false;
const BUNDLE = false;

const gitRevisionPlugin = new GitRevisionPlugin();
const smp = new SpeedMeasurePlugin({disable: !PROFILE});

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
    stats: 'minimal',
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
            }),
            new OptimizeCssAssetsPlugin({}),
        ],
    },
    plugins: array(
        new HtmlWebpackPlugin({
            template: dev ? "./src/index.dev.html" : "prerender-loader?string!./src/index.prod.html",
            filename: 'index.html',
            publicPath: path.resolve(__dirname, "public"),
        }),
        new ResourceHintWebpackPlugin(),
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
        new MiniCssExtractPlugin({
            filename: "[name]-[contenthash].css",
            ignoreOrder: true,
        }),
        new CopyPlugin({
            patterns: ["./static"],
        }),
        BUNDLE && new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
    ),
    module: {
        rules: [
            createJsLoader(dev),
            createYamlLoader(dev),
            {
                test: [/\.css$/],
                oneOf: [{
                    test: /\.module\.css$/,
                    use: createCssModuleLoader(dev, true),
                }, {
                    use: createCssModuleLoader(dev, false),
                }],
            },
        ],
    },
    resolve: {
        modules: ["src", "node_modules"],
        alias: {
            react: "preact/compat",
            "react-dom": "preact/compat",
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
    include: path.resolve(__dirname, 'src'),
    loader: ['json-loader', 'yaml-loader'],
});

const createCssModuleLoader = (dev, isModule = false) => ([
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: dev,
        },
    }, {
        loader: 'css-loader',
        options: {
            modules: isModule ? {
                localIdentName: '[name]__[local]--[hash:base64:5]',
            } : undefined,
            sourceMap: dev,
            importLoaders: 2,
        },
    }, {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
            plugins: () => [postcssPresetEnv()],
        },
    },
]);

module.exports.createCssModuleLoader = createCssModuleLoader;
