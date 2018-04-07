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
    devtool: dev ? "source-map" : false,
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
        dev && new webpack.HotModuleReplacementPlugin(), // https://webpack.js.org/configuration/dev-server/#devserver-hot
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
    devServer: {
        hot: true,
        inline: true,
        port: 3000,
    },
});
