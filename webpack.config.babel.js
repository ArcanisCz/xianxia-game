const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const pckg = require("./package.json");

const array = (...target) => target.filter((item) => item);

module.exports.default = ({dev}) => ({
    entry: {
        main: "./src/index.js",
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
            template: "./public/index.ejs",
            filename: 'index.html',
        }),
        dev && new webpack.NamedModulesPlugin(),
        dev && new webpack.HotModuleReplacementPlugin(), // https://webpack.js.org/configuration/dev-server/#devserver-hot
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
    devServer: dev ? {
        hot: true,
        inline: true,
        port: 3000,
    } : undefined,
    resolve: {
        modules: ['src', 'node_modules'],
    },
});
