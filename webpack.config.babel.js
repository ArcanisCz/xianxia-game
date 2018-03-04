import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from 'webpack';

const array = (...target) => target.filter((item) => item);

export default ({dev}) => ({
    entry: {
        "main": array(
            dev && 'react-hot-loader/patch',
            'babel-polyfill',
            'whatwg-fetch',
            "./src/index.js",
        )
    },
    target: 'web',
    devtool: dev ? 'eval-source-map' : 'source-map',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: dev ? '[name].js' : '[name].[chunkhash].js',
    },
    plugins: array(
        new HtmlWebpackPlugin({
            template: "./src/index.html",
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
    ),
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'babel-loader',
        }]
    },
    devServer: {
        hot: true,
        inline: true,
        port: 3000,
    },
    performance: {
        hints: dev ? false : 'warning',
    },
    resolve: {
        modules: ['src', 'node_modules'],
    },
});