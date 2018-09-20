// jshint esversion: 6
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ContextReplacementPlugin } = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.ts'
    },
    output: {
        path: path.join(__dirname, "../dist/"),
        filename: "[name].bundle.js",
    },
    resolve: {
        extensions: ['.js', '.ts', '.html']
    },
    devServer: {
        contentBase: path.join(__dirname, "../dist/"),
        port: 9000
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            { test: /.ts$/, use: ['awesome-typescript-loader', 'angular2-template-loader'] },
            { test: /.html$/, use: 'raw-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader']},
            { test: /\.(woff|woff2|eot|ttf|otf|svg)$/, use: 'file-loader'}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/pages/index.html",
            path: path.join(__dirname, "../public/pages/"),
            filename: 'index.html',
            showErrors: true,
            title: "Webpack App",
            hash: false
        }),
        new ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, '../src')
        )
    ]
    
}
