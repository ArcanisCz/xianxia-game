import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
// import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";

import pckg from "./package.json";

const array = (...target) => target.filter((item) => item);

export default ({dev}) => ({
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
        splitChunks: dev ? {
            chunks: "all",
        } : false,
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
    resolve: {
        modules: ['src', 'node_modules'],
    },
});
