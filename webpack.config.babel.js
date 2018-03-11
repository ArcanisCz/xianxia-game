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
    devtool: dev ? 'eval-source-map' : 'source-map',
    output: {
        path: path.resolve(__dirname, 'docs'),
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
        // Dont use EnviromentPlugin, redux-dev-tools will stop work
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production'),
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
