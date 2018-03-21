const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin")
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const pckg = require("./package.json");

const array = (...target) => target.filter((item) => item);

module.exports.default = ({dev}) => ({
    entry: {
        main: array(
            // 'babel-polyfill',
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
        !dev && new CompressionPlugin({
            test: /\.js/,
            // deleteOriginalAssets: true, // TODO
        }),
        // new BundleAnalyzerPlugin(),
    ),
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test: /\.yml/,
            include: path.resolve(__dirname, 'data'),
            exclude: /node_modules/,
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
